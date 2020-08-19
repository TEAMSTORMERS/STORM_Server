const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const ProjectDao = require('../dao/project');
const RoundDao = require('../dao/round');

module.exports = {

  //라운드 카운트 정보 반환(count보다 +1한 수를 반환해야 함)
  roundCount: async (req, res) => {

    const project_idx = req.params.project_idx;
    if (!project_idx) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.ROUND_COUNT_FAIL));
    }

    const count = await RoundDao.countInfo(project_idx);
    if (count === -1) {
      return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.ROUND_COUNT_FAIL));
    }

    return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.ROUND_COUNT_SUCCESS, count));
  },

  //라운드 정보 새로 추가
  roundSetting: async (req, res) => {

    const { user_idx, project_idx, round_purpose, round_time } = req.body;
    if (!user_idx || !project_idx || !round_purpose || !round_time) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.ROUND_SETTING_FAIL));
    }

    const result = await RoundDao.roundSetting(project_idx, round_purpose, round_time);

    //라운드 추가시 해당 라운드에 자동으로 참여하도록
    await RoundDao.roundEnter(user_idx, result);

    return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.ROUND_SETTING_SUCCESS, result));
  },

  //라운드 정보 출력
  roundInfo: async (req, res) => {
    const round_idx = req.params.round_idx;

    if (!round_idx) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.ROUND_INFO_FAIL));
    }

    const result = await RoundDao.roundInfo(round_idx);
    return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.ROUND_INFO_SUCCESS, {
      "round_number": result[0].round_number,
      "round_purpose": result[0].round_purpose,
      "round_time": result[0].round_time
    }));
  },

  //라운드 참여 - round_participant에 user 정보 추가
  nextRoundEnter: async (req, res) => {
    const { user_idx, project_idx } = req.body;

    if (!user_idx || !project_idx) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.ROUND_ENTER_FAIL));
    }

    //project_idx로 가장 최근의 round_idx 뽑아오기
    const round_idx = await RoundDao.checkRoundIdx(project_idx);
    if (round_idx === -1) {
      return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
    }

    //이미 참여된 참가자는 거절
    const check_overlap_participant = await RoundDao.testErrRound(user_idx, round_idx);
    if(check_overlap_participant[0]["COUNT(*)"] >= 1){
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.TEST_ERROR));
    }

    //라운드 참여자 목록에 추가
    await RoundDao.roundEnter(user_idx, round_idx);

    return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.ROUND_ENTER_SUCCESS, {
      "round_idx" : round_idx
    }));
  },

  
  //라운드 나가기 - round_participant에서 user 정보 삭제
  roundLeave: async (req, res) => {
    const user_idx = req.params.user_idx;
    const project_idx = req.params.project_idx;
    const round_idx = req.params.round_idx;

    //두 값을 제대로 받아왔는지 확인
    if (!user_idx || !round_idx || !project_idx) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.ROUND_LEAVE_FAIL));
    }

    //호스트인지 확인
    const ifHost = await ProjectDao.checkHost(user_idx, project_idx);
    if(ifHost === 1) {
      //호스트일 경우
      console.log("호스트입니다.");

      //현재 라운드에 다른 멤버들이 존재하는지 확인
      const checkMemberNum = await RoundDao.checkMemberNum(round_idx);
      
      if(checkMemberNum === 1){
        //호스트 혼자 있을 경우
        console.log("호스트만 프로젝트에 존재합니다.");
        
        //프로젝트 종료
        const finishProject = await ProjectDao.finishProject(project_idx);
        if(finishProject === -1){
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
        console.log("프로젝트를 종료합니다. 코드 삭제.");

        //현재 1라운드 시작 전인지 확인(project_status가 1인지 확인)
        const checkProjectStatus = await ProjectDao.checkProjectStatusByIdx(project_idx);
        if(checkProjectStatus === -1){
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));

        }else if(checkProjectStatus === 0){
          //1라운드 시작 전이므로 프로젝트 참여자 목록에서도 삭제
          const fin = await ProjectDao.deleteProjectparticipant(project_idx, user_idx);
          if(fin === -1){
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
          }
          console.log("1라운드 시작 전입니다. 프로젝트 참여자 목록에서도 나갑니다.");
        }

      }else if(checkMemberNum === -1){
        //DB 에러
        return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
      
      }else if(checkMemberNum > 1){
        //멤버가 존재할 경우 - 호스트 넘겨줘야 함
        console.log("호스트 제외 다른 멤버가 존재합니다.");

        //1.호스트 다음으로 들어온 사람의 user_idx를 찾아서 -> project_participant_host 테이블에 넣기
        const changeHost = await RoundDao.changeHost(round_idx, project_idx);
        if(changeHost === -1){
          return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
        console.log("호스트 변경했습니다.");

        //2.이 유저의 호스트 정보를 DB에서 삭제하기
        const deleteHost = await RoundDao.deleteHost(user_idx, project_idx);
        if(deleteHost === -1){
          return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
        console.log("호스트 삭제합니다.");

        //현재 1라운드 시작 전인지 확인(project_status가 1인지 확인)
        const checkProjectStatus = await ProjectDao.checkProjectStatus(project_idx);
        if(checkProjectStatus === -1){
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }else if(checkProjectStatus === 0){
          //1라운드 시작 전이므로 프로젝트 참여자 목록에서도 삭제
          const fin = await ProjectDao.deleteProjectparticipant(project_idx, user_idx);
          if(fin === -1){
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
          }
          console.log("1라운드 시작 전입니다. 프로젝트 참여자 목록에서도 나갑니다.");
        }
      }

    }else if(ifHost === 0){
      //호스트가 아닐 경우
      console.log("멤버입니다.");
      
      //현재 1라운드 시작 전인지 확인
      const checkProjectStatus = await ProjectDao.checkProjectStatus(project_idx);
        if(checkProjectStatus === -1){
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }else if(checkProjectStatus === 0){
          //1라운드 시작 전이므로 프로젝트 참여자 목록에서도 삭제
          const fin = await ProjectDao.deleteProjectparticipant(project_idx, user_idx);
          if(fin === -1){
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
          }
          console.log("1라운드 시작 전입니다. 프로젝트 참여자 목록에서도 나갑니다.");
        }

    }else if(ifHost === -1){  //DB에러
        return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
    }

    //라운드 참여자 목록에서 이 유저의 정보를 삭제하기
    const result = await RoundDao.roundLeave(user_idx, round_idx);
    if(result === -1){
      return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
    }
    console.log("이 라운드에서 나갑니다.");

    return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.ROUND_LEAVE_SUCCESS));
  },
  

  //라운드 참여자 목록 조회 - round_participant 정보 출력
  roundParticipant: async (req, res) => {
    const project_idx = req.params.project_idx;
    const round_idx = req.params.round_idx;

    if (!round_idx || !project_idx) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.ROUND_MEMBERLIST_FAIL));
    }

    const result = await RoundDao.roundMemberList(project_idx, round_idx);
    console.log(result)
    return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.ROUND_MEMBERLIST_SUCCESS, result));
  },

  //라운드 카드 리스트 - 해당 라운드의 카드 전체 출력
  roundCardList: async (req, res) => {
    const project_idx = req.params.project_idx;
    const round_idx = req.params.round_idx;
    const user_idx = req.params.user_idx;

    if (!project_idx || !round_idx || !user_idx) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.GET_ROUND_CARD_LIST_FAIL));
    }
    const result = await RoundDao.roundCardList(project_idx, round_idx, user_idx);
    return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.GET_ROUND_CARD_LIST_SUCCESS, result));
  },

  //전체(참여한) 라운드 정보 출력
  roundFinalInfo: async (req, res) => {
    const user_idx = req.params.user_idx;
    const project_idx = req.params.project_idx;

    if(!project_idx || !user_idx){
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.ROUND_FINALINFO_FAIL));
    }

    const result = await RoundDao.roundFinalInfo(user_idx, project_idx);

    return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.ROUND_FINALINFO_SUCCESS, result));
  }
}