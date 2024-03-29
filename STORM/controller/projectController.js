const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const ProjectDao = require('../dao/project');

module.exports = {

    /*  프로젝트 진행    */

    //host가 새로운 프로젝트를 생성 - 해당 user 정보를 project_participant 테이블과 project_participant_host 테이블에도 추가
    createProject: async (req, res) => {
        const { project_name, project_comment, user_idx } = req.body;

        //예외처리1 : project_name이나 user_idx가 null일 경우
        if(!project_name || !user_idx){
          res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
          return;
        }
        
        //랜덤 프로젝트 코드 생성 과정
        let possibleAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let possibleNumber = "1234567890";
        let project_code="";

        let flag = 0;   //코드 중복 확인할 변수

        do{
        let array = [];

        //알파벳 대문자 3자, 숫자 3자의 조합이어야 함
        for(let i = 0; i < 3; i++){
            array.push(possibleAlphabet.charAt(Math.floor(Math.random() * possibleAlphabet.length)));
            array.push(possibleNumber.charAt(Math.floor(Math.random() * possibleNumber.length)));
        }

        //해당 배열을 랜덤으로 섞을 함수
        function shuffle(array) {
            array.sort(() => Math.random() - 0.5);
        }

        shuffle(array);
        project_code = array.join("");  //배열을 문자열로 변경

        //생성된 코드가 이미 DB에 존재하는지 확인(이미 존재하면 랜덤코드 생성 과정 반복)
        flag = await ProjectDao.checkAlreadyProjectCode(project_code);
        }while(flag === 1);


        //오늘 날짜 데이터 생성
        var date = new Date();
        var year = date.getFullYear();
        var month = new String(date.getMonth() + 1);
        var day = new String(date.getDate());
        if (month.length == 1) {
            month = "0" + month;
        }
        if (day.length == 1) {
            day = "0" + day;
        }
        const project_date = year+"."+month+"."+day;


        //예외처리2 : project_idx가 제대로 생성되었는지 확인
        const projectIdx = await ProjectDao.createProject(project_name, project_comment, project_code, project_date);
        if(projectIdx === -1) {
          return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }

        //아래는 프로젝트가 잘 생성 되었을 경우 host 정보 등록 과정
        //project_participant table에 user 정보 추가
        const project_participant_idx = await ProjectDao.memberEnterProject(projectIdx, user_idx);
        if (project_participant_idx === -1) {
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }

        //프로젝트 생성자이기 때문에 project_participant_host table에 user 정보 추가
        const project_participant_host_idx = await ProjectDao.hostEnterProject(project_participant_idx, user_idx);
        if (project_participant_host_idx === -1) {
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }

        //프로젝트 생성 성공 - project_code, project_idx 출력
        res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.CREATED_PROJECT_SUCCESS, {
                "project_code": project_code,
                "project_idx": projectIdx
            }));
    },

    //프로젝트 코드를 입력할 경우 해당하는 프로젝트 정보를 반환(팝업)
    getProjectInfoPopUp: async (req, res) => {
        const project_code = req.params.project_code;

        //값이 제대로 들어오지 않았을 경우
        if (!project_code) {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_ERROR));
            return;
        }

        //존재하지 않는 project_code일 경우
        const checkProjectCode = await ProjectDao.checkProjectCode(project_code);
        if (checkProjectCode === 0) {
            return res.status(statusCode.CANNOT_JOIN).send(util.fail(statusCode.BAD_REQUEST, resMessage.WRONG_CODE));
        }else if(checkProjectCode === -1){
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }

        //project가 진행중일 경우 참여할 수 없음
        const project_status = await ProjectDao.checkProjectStatus(project_code);
        if (project_status === 1) {
            return res.status(statusCode.CANNOT_JOIN).send(util.fail(statusCode.CANNOT_JOIN, resMessage.CANNOT_JOIN));
        }else if(project_status === -1){
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }

        //HOST가 아직 1라운드를 세팅하지 않았을 경우 참여할 수 없음
        const checkRoundSetting = await ProjectDao.checkRoundSetting(project_code);
        if (checkRoundSetting === 0) {
            return res.status(statusCode.CANNOT_JOIN).send(util.fail(statusCode.NOT_PREPARED, resMessage.ROUND_NOT_PREPARED));
        }else if(checkRoundSetting === -1){
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }

        //프로젝트 참여가 가능할 경우 프로젝트 정보 띄우기
        const result = await ProjectDao.getProjectInfoPopUp(project_code);
        if(result === -1){
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }

        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.READ_PROJECT_INFO, {
                "project_idx" : result[0].project_idx,
                "project_name": result[0].project_name,
                "project_comment": result[0].project_comment
            }
        ));
    },

    //프로젝트 정보 팝업에서 확인 버튼을 누를 경우 프로젝트와 동시에 1라운드에 참여
    memberEnterProject: async (req, res) => {
        const { user_idx, project_idx } = req.body;

        //예외처리 : user_idx나 project_code가 null일 경우
        if (!user_idx || !project_idx) {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }

        // 이미 참여된 참가자는 거절(임시 에러 핸들링)
        const check_overlap_participants = await ProjectDao.testErrProject(user_idx, project_idx);
        if(check_overlap_participants[0]["COUNT(*)"] >= 1){
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.TEST_ERROR));
        }

        //프로젝트 참여자 목록에 해당 유저의 정보를 추가
        const projectParticipantIdx = await ProjectDao.memberEnterProject(project_idx, user_idx);
        if (projectParticipantIdx === -1) {
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }

        //project_idx로 1라운드의 round_idx 가져오기
        const round_idx = await ProjectDao.checkRoundIdx(project_idx);
        if (round_idx === -1) {
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }

        //1라운드 참여자 목록에 해당 유저의 정보를 추가
        const roundEnter = await ProjectDao.firstRoundEnter(round_idx, user_idx);
        if (roundEnter === -1) {
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }

        //프로젝트 및 1라운드 참여 성공
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.JOIN_PROJECT_SUCCESS, round_idx));
    },

    
    //프로젝트의 참여자 목록 반환
    getProjectparticipant: async (req, res) => {
        const project_idx = req.params.project_idx;

        if (!project_idx) {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }

        const result = await ProjectDao.getProjectparticipant(project_idx);
        if(result === -1){
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }

        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.SHOW_PROJECT_PARTICIPANT_LIST_SUCCESS, result));
    },

    //프로젝트 정보 반환
    getProjectInfo: async (req, res) => {
        const project_idx = req.params.project_idx;

        if(!project_idx){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        }

        const result = await ProjectDao.getProjectInfo(project_idx);
        if(result === -1){
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }

        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.READ_PROJECT_INFO, {
                "project_name": result[0].project_name,
                "project_comment": result[0].project_comment,
                "project_code": result[0].project_code,
            }
        ));
    },

    //프로젝트 나가기 - project_participant에서 해당 user 정보 삭제
    deleteProject: async (req, res) => {
        const project_idx = req.params.project_idx;

        //값이 제대로 들어오지 않았을 경우
        if (!project_idx) {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }

        //프로젝트 삭제
        const result = await ProjectDao.deleteProject(project_idx);
        if(result === -1){
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }

        //삭제 성공
        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.DELETE_PROJECT_PARTICIPANT_SUCCESS));
    },

    //프로젝트 시작할 경우 project_status를 1로 변경해서 중간 입장 불가능하도록
    setProjectStatus: async (req, res) => {
        const project_idx = req.params.project_idx;
        if (!project_idx) {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }

        const result = await ProjectDao.setProjectStatus(project_idx);
        if(result === -1){
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
        
        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.UPDATE_PROJECT_STATUS_SUCCESS));
    },

    //프로젝트 종료 버튼 클릭 시 DB에서 project_code 삭제
    finishProject: async (req, res) => {
        const project_idx = req.params.project_idx;
        
        if (!project_idx) {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }

        const result = await ProjectDao.finishProject(project_idx);
        if(result === -1){
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
        
        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.DELETE_PROJECT_CODE_SUCCESS));
    },


    /*  최종정리    */

    //참여한 프로젝트 이름과 카드 반환
    showAllProject: async (req, res) => {
        const user_idx = req.params.user_idx;
        if (!user_idx) {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }

        const result_enterProject = await ProjectDao.getProjectIdxName(user_idx);
        if(result_enterProject === -1){
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }

        var array = [];
        for (i = result_enterProject.length-1 ; i >= 0 ; i--) {
            var data1 = new Object();
            data1.project_idx = result_enterProject[i]["project_idx"];
            data1.project_name = result_enterProject[i]["project_name"];

            var card_list = [];
            card_list_result = await ProjectDao.getProjectCard(result_enterProject[i]["project_idx"]);
            if(card_list_result === -1){
                return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
            }

            for (var j = 0; j < card_list_result.length; j++) {
                var data2 = new Object();
                data2.card_img = card_list_result[j]["card_img"];
                data2.card_txt = card_list_result[j]["card_txt"];
                card_list.push(data2);
            }
            data1.card_list = card_list;
            array.push(data1);
        }

        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.GET_PROJECT_LIST_SUCCESS, array));
    },

    //최종 프로젝트 정보 반환
    finalInfo: async (req, res) => {
        const project_idx = req.params.project_idx;
        if (!project_idx) {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }

        const result = await ProjectDao.finalInfo(project_idx);
        if(result === -1){
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }

        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.GET_FINAL_INFO_SUCCESS, result));
    },

    //스크랩한 카드 모두 반환
    finalScrapList: async (req, res) => {
        const user_idx = req.params.user_idx;
        const project_idx = req.params.project_idx;
        if (!user_idx || !project_idx) {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }

        const result = await ProjectDao.finalScarpList(user_idx, project_idx);
        if(result === -1){
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }

        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.ROUND_FINALINFO_SUCCESS, result));
    }

}
