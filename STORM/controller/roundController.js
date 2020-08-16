const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
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
    const { project_idx, round_purpose, round_time } = req.body;

    if (!project_idx || !round_purpose || !round_time) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.ROUND_SETTING_FAIL));
    }
    const result = await RoundDao.roundSetting(project_idx, round_purpose, round_time);

    return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.ROUND_SETTING_SUCCESS, result));
  },

  //라운드 정보 출력
  roundInfo: async (req, res) => {
    const project_idx = req.params.project_idx;

    if (!project_idx) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.ROUND_INFO_FAIL));
    }

    const result = await RoundDao.roundInfo(project_idx);
    return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.ROUND_INFO_SUCCESS, {
      "round_idx": result[0].round_idx,
      "round_number": result[0].round_number,
      "round_purpose": result[0].round_purpose,
      "round_time": result[0].round_time
    }));
  },

  //라운드 참여 - round_participant에 user 정보 추가
  roundEnter: async (req, res) => {
    const { user_idx, round_idx } = req.body;

    if (!user_idx || !round_idx) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.ROUND_ENTER_FAIL));
    }

    // [test] 예외처리: 이미 디비에 참여된 참가자는 거절 ㅋ
    const check_overlap_participant = await RoundDao.testErrRound(user_idx, round_idx);
    console.log(check_overlap_participant[0]["COUNT(*)"]);
    if(check_overlap_participant[0]["COUNT(*)"] >= 1){
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.TEST_ERROR));
    }

    const result = await RoundDao.roundEnter(user_idx, round_idx);

    return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.ROUND_ENTER_SUCCESS));
  },

  
  //라운드 나가기 - round_participant에서 user 정보 삭제
  roundLeave: async (req, res) => {
  const user_idx = req.params.user_idx;
  const round_idx = req.params.round_idx;
  
  console.log(user_idx, round_idx);

  if (!user_idx || !round_idx) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.ROUND_LEAVE_FAIL));
  }
  const result = await RoundDao.roundLeave(user_idx, round_idx);

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
    return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.ROUND_MEMBERLIST_SUCCESS, result));
  },

  //라운드 카드 리스트 - 해당 라운드의 카드 전체 출력
  roundCardList: async (req, res) => {
    const project_idx = req.params.project_idx;
    const round_idx = req.params.round_idx;

    if (!project_idx || !round_idx) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.GET_ROUND_CARD_LIST_FAIL));
    }
    const result = await RoundDao.roundCardList(project_idx, round_idx);
    return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.GET_ROUND_CARD_LIST_SUCCESS, result));
  },

  //전체 라운드 정보 출력
  roundFinalInfo: async (req, res) => {
    const project_idx = req.params.project_idx;

    if(!project_idx){
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.ROUND_FINALINFO_FAIL));
    }
    const result = await RoundDao.roundFinalInfo(project_idx);

    return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.ROUND_FINALINFO_SUCCESS, result));
  }
}