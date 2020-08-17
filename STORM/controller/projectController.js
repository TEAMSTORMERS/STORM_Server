const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const ProjectDao = require('../dao/project');

module.exports = {

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

    //이미 생성된 프로젝트에 멤버가 참여
    memberEnterProject: async (req, res) => {
        const { user_idx, project_code } = req.body;

        //예외처리1 : user_idx나 project_code가 null일 경우
        if (!user_idx || !project_code) {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }

        //예외처리2 : project_idx를 제대로 받아왔는지 확인
        const result = await ProjectDao.checkProjectIdx(project_code);
        const project_idx = result[0].project_idx;
        if(project_idx === -1){
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }

        // [test] 예외처리: 이미 디비에 참여된 참가자는 거절 ㅋ
        const check_overlap_participants = await ProjectDao.testErrProject(user_idx, project_idx);
        if(check_overlap_participants[0]["COUNT(*)"] >= 1){
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.TEST_ERROR));
        }

        //예외처리3 : project가 진행중일 경우 참여할 수 없음
        const checkStatus = await ProjectDao.checkProjectStatus(project_idx);
        const project_status = checkStatus[0].project_status;
        if (project_status == 1) {
            return res.status(statusCode.CANNOT_JOIN).send(util.fail(statusCode.CANNOT_JOIN, resMessage.JOIN_PROJECT_FAIL));
        }else if(project_status === -1){
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }

        //예외처리4 : projectParticipantIdx가 제대로 존재하는지 확인
        const projectParticipantIdx = await ProjectDao.memberEnterProject(project_idx, user_idx);
        if (projectParticipantIdx === -1) {
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }

        //프로젝트 참여 성공
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.JOIN_PROJECT_SUCCESS, {
            "project_idx": project_idx
        }));
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
    deleteProjectparticipant: async (req, res) => {
        const user_idx = req.params.user_idx;
        const project_idx = req.params.project_idx;

        //값이 제대로 들어오지 않았을 경우
        if (!user_idx || !project_idx) {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }

        // project_participant_idx 뽑아내기
        const result = await ProjectDao.checkProjectParticipantIdx(user_idx, project_idx);
        if(result === -1){
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
        const project_participant_idx = result[0]["project_participant_idx"];
        if (project_participant_idx === undefined) {
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }

        //만약 호스트일 경우 체크
        const ifHost = await ProjectDao.checkHost(project_participant_idx);
        if(ifHost === 1) {
            //방 안에 사람들이 더 있을 때 - 다른 사람에게 호스트를 넘김
            //방 안에 사람들이 없을 때 - 방이 터짐..?
        }else if(ifHost === -1){
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
        
        //위의 조건들을 모두 체크 후 삭제하기
        const fin = await ProjectDao.deleteProjectparticipant(project_participant_idx);
        if(fin === -1){
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }

        //삭제 성공
        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.DELETE_PROJECT_PARTICIPANT_SUCCESS));
    },

    //프로젝트 코드를 입력할 경우 해당하는 프로젝트 정보를 반환(팝업)
    getProjectInfoPopUp: async (req, res) => {
        const project_code = req.params.project_code;

        //값이 제대로 들어오지 않았을 경우
        if (!project_code) {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }

        const result = await ProjectDao.getProjectInfoPopUp(project_code);
        if(result === -1){
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }

        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.READ_PROJECT_INFO, {
                "project_name": result[0].project_name,
                "project_comment": result[0].project_comment
            }
        ));
    },

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
        for (i = 0; i < result_enterProject.length; i++) {
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
        const project_idx = req.body.project_idx;
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
    }

}
