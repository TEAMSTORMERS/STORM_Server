const pool = require('../modules/pool');


module.exports = {

    //host가 새로운 프로젝트 생성
    createProject: async (project_name, project_comment, project_code, project_date) => {
        const fields = 'project_name, project_comment, project_code, project_status, project_date';
        const questions = `?, ?, ?, ?, ?`;
        const values = [project_name, project_comment, project_code, 0, project_date];
        const query = `INSERT INTO project (${fields}) VALUES (${questions})`;
        try {
            const result = await pool.queryParamArr(query, values);
            const insertId = result.insertId;
            return insertId;
        } catch (err) {
            console.log('createProject ERROR : ', err);
            return -1;
            //throw err;
        }
    },

    //host가 project에 참여했을 때 project_participant에 새로운 row 추가
    hostEnterProject: async (project_participant_idx, user_idx) => {
        const fields = 'project_participant_idx, user_idx';
        const questions = `?, ?`;
        const values = [project_participant_idx, user_idx];
        const query = `INSERT INTO project_participant_host (${fields}) VALUES (${questions})`;
        try {
            const result = await pool.queryParamArr(query, values);
            const insertId = result.insertId;
            return insertId;
        } catch (err) {
            console.log('hostEnterProject ERROR : ', err);
            return -1;
            //throw err;
        }
    },

    //프로젝트 참여 직전 프로젝트 정보 띄우는 팝업
    getProjectInfoPopUp: async (project_code) => {
        const query = `SELECT project_idx, project_name, project_comment FROM project WHERE project_code = "${project_code}"`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            console.log('getProjectInfoPopUp ERROR : ', err);
            return -1;
            //throw err;
        }
    },

    /*
    //project_code를 받았을 때 project_idx를 반환
    checkProjectIdx: async (project_code) => {
        const query = `SELECT project_idx FROM project WHERE project_code = "${project_code}"`;
        try {
            const result = await pool.queryParamArr(query);
            return result;
        } catch (err) {
            console.log('checkProjectIdx ERROR : ', err);
            return -1;
            //throw err;
        }
    },
    */

    //이미 존재하는 프로젝트 코드인지 확인
    checkAlreadyProjectCode : async (project_code) => {
        const query = `SELECT count(*) FROM project WHERE project_code = "${project_code}"`;
        try {
            const result = await pool.queryParamArr(query);
            return result;
        } catch (err) {
            console.log('checkProjectStatus ERROR : ', err);
            return -1;
            //throw err;
        }
    },

    //project_code를 받았을 때 존재하는 프로젝트 코드인지 반환
    checkProjectCode: async (project_code) => {
        const query = `SELECT COUNT(*) FROM project WHERE project_code = "${project_code}"`;
        try {
            const result = await pool.queryParamArr(query);
            const projectCode = result[0]["COUNT(*)"];
            return projectCode;
        } catch (err) {
            console.log('checkProjectStatus ERROR : ', err);
            return -1;
            //throw err;
        }
    },

    //project_code를 받았을 때 project_status를 반환
    checkProjectStatus: async (project_code) => {
        const query = `SELECT project_status FROM project WHERE project_idx in
                        (SELECT project_idx FROM project WHERE project_code = "${project_code}")`;
        try {
            const result = await pool.queryParamArr(query);
            return result;
        } catch (err) {
            console.log('checkProjectStatus ERROR : ', err);
            return -1;
            //throw err;
        }
    },

    //project_code를 받았을 때 해당 프로젝트의 round 유무를 반환
    checkRoundSetting: async (project_code) => {
        const query = `SELECT COUNT(*) FROM round WHERE project_idx in
                        (SELECT project_idx FROM project WHERE project_code = "${project_code}")`;
        try {
            const result = await pool.queryParamArr(query);
            const roundCount = result[0]["COUNT(*)"];
            return roundCount;
        } catch (err) {
            console.log('checkProjectStatus ERROR : ', err);
            return -1;
            //throw err;
        }
    },

    //member가 project에 참여했을 때 project_participant에 새로운 row 추가
    memberEnterProject: async (project_idx, user_idx) => {
        const fields = 'project_idx, user_idx';
        const questions = `?, ?`;
        const values = [project_idx, user_idx];
        const query = `INSERT INTO project_participant (${fields}) VALUES (${questions})`;
        try {
            const result = await pool.queryParamArr(query, values);
            const insertId = result.insertId;
            return insertId;
        } catch (err) {
            console.log('memberEnterProject ERROR : ', err);
            return -1;
            //throw err;
        }
    },

    //해당 프로젝트의 1라운드의 round_idx 뽑기
    checkRoundIdx: async (project_idx) => {
        const query = `SELECT round_idx FROM round WHERE project_idx = "${project_idx}"`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('checkRoundIdx ERROR : ', err);
            return -1;
            //throw err;
        }
    },

    //프로젝트 참여시 자동으로 1라운드 참여자 목록에 추가하기
    firstRoundEnter: async (round_idx, user_idx) => {
        const fields = 'round_idx, user_idx';
        const questions = `?, ?`;
        const values = [round_idx, user_idx];
        const query = `INSERT INTO round_participant (${fields}) VALUES (${questions})`;
        try {
            const result = await pool.queryParamArr(query, values);
            const insertId = result.insertId;
            return insertId;
        } catch (err) {
            console.log('firstRoundEnter ERROR : ', err);
            return -1;
            //throw err;
        }
    },

    //project_idx를 받았을 때 project_name, project_comment, promect_code를 반환
    getProjectInfo: async (project_idx) => {
        const query = `SELECT project_name, project_comment, project_code FROM project WHERE project_idx = "${project_idx}"`;
        try {
            const result = await pool.queryParamArr(query);
            return result;
        } catch (err) {
            console.log('getProjectInfo ERROR : ', err);
            return -1;
            //throw err;
        }
    },

    //project_idx를 받았을 때 user_idx, user_name, user_img를 반환
    getProjectparticipant: async (project_idx) => {
        const query1 = `SELECT user_idx FROM project_participant WHERE project_idx = ${project_idx}`;
        const query2 = `SELECT user_name, user_img FROM user WHERE user_idx in (${query1})`;

        try {
            const result = await pool.queryParamArr(query2);
            return result;
        } catch (err) {
            console.log('getProjectparticipant ERROR : ', err);
            return -1;
            //throw err;
        }
    },

    //user_idx, project_idx를 받았을 때 project_participant_idx를 반환
    checkProjectParticipantIdx: async (user_idx, project_idx) => {
        const query = `SELECT project_participant_idx FROM project_participant WHERE user_idx = ${user_idx} and project_idx = ${project_idx};`;

        try {
            const result = await pool.queryParamArr(query);
            console.log(result);
            return result;
        } catch (err) {
            console.log('checkProjectParticipantIdx ERROR : ', err);
            return -1;
            //throw err;
        }
    },

    //project_participant_idx를 받았을 때 해당하는 project_participant_idx를 삭제
    deleteProjectparticipant: async (project_participant_idx) => {
        const query = `DELETE FROM project_participant WHERE project_participant_idx = ${project_participant_idx}`;

        try {
            const result = pool.queryParamArr(query);
            return result;

        } catch (err) {
            console.log('deleteProjectparticipant ERROR : ', err);
            return -1;
            //throw err;
        }

    },

    //project_participant_idx를 받았을 때 해당 idx가 project_participant_host 테이블에 있는지 확인
    checkHost: async (project_participant_idx) => {
        const query = `SELECT COUNT(*) FROM project_participant_host WHERE project_participant_idx = ${project_participant_idx}`;

        try {
            const result = pool.queryParamArr(query);
            const ifHost = result[0]["COUNT(*)"];
            return ifHost;

        } catch (err) {
            console.log('checkHost ERROR : ', err);
            return -1;
            //throw err;
        }

    },

    //user_idx를 받았을 때 project_idx, project_name을 반환
    getProjectIdxName: async (user_idx) => {
        const query = `SELECT p.project_idx, p.project_name
                       FROM project_participant pp JOIN project p ON pp.project_idx = p.project_idx
                       WHERE pp.user_idx = ${user_idx}`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('getProjectIdx ERROR : ', err);
            return -1;
            //throw err;
        }
    },

    //project_idx를 받았을 때 card_img, card_txt를 반환
    getProjectCard: async (project_idx) => {
        const query = `SELECT card_img, card_txt FROM card WHERE project_idx = ${project_idx}`;
        try {
            const result = await pool.queryParamArr(query);
            return result;
        } catch (err) {
            console.log('getProjectCard ERROR : ', err);
            return -1;
            //throw err;
        }
    },

    //project_idx를 받았을 때 round수, project_name, project_date, user_idx 반환
    finalInfo: async (project_idx) => {
        const query1 = `SELECT COUNT(*) FROM round WHERE project_idx = ${project_idx}`;
        const query2 = `SELECT project_name, project_date FROM project WHERE project_idx = ${project_idx}`;
        const query3 = `SELECT user_idx FROM project_participant WHERE project_idx = ${project_idx}`;

        try {
            const round_count = await pool.queryParam(query1);
            const round_number = round_count[0]["COUNT(*)"];
            const project_result = await pool.queryParam(query2);
            const user_idx_list = await pool.queryParam(query3);

            const array = [];
            for (var i = 0; i < user_idx_list.length; i++) {
                const query4 = `SELECT user_img FROM project_participant AS p, user AS u WHERE u.user_idx = ${user_idx_list[i]["user_idx"]}`;
                const user_img_list = await pool.queryParam(query4);
                array.push(user_img_list[0]["user_img"]);
            }

            var data = new Object();
            data.project_name = project_result[0]["project_name"];
            data.project_date = project_result[0]["project_date"];
            data.round_count = round_number;
            data.project_participants_list = array;
            return data;
        } catch (err) {
            console.log('finalInfo ERROR : ', err);
            return -1;
            //throw err;
        }
    },

    //user_idx, project_idx를 받았을 때 project_name, round_number, round_purpose, round_time, card_idx, card_img, card_txt를 반환
    finalScarpList: async (user_idx, project_idx) => {
        const query1 = `SELECT project_name, COUNT(scrap_idx) AS scrap_count
                        FROM project JOIN card ON project.project_idx = card.project_idx JOIN scrap ON scrap.card_idx = card.card_idx
                        WHERE project.project_idx = ${project_idx} AND scrap.user_idx = ${user_idx};`;
        
        const query2 = `SELECT card.card_idx, card.card_img, card.card_txt
                        FROM project JOIN card ON project.project_idx = card.project_idx JOIN scrap ON scrap.card_idx = card.card_idx
                        WHERE project.project_idx = ${project_idx} AND scrap.user_idx = ${user_idx};`
        
        try {
            const query1_result = await pool.queryParam(query1);
            const query2_result = await pool.queryParam(query2);

            const array = [];
            
            for (var i = 0; i < query1_result[0]["scrap_count"]; i++) {

                const query3 = `SELECT round_number, round_purpose, round_time FROM round
                                WHERE round_idx in(SELECT round_idx from card WHERE card_idx = ${query2_result[i]["card_idx"]})`;
                const query3_result = await pool.queryParam(query3);

                const data = new Object();
                data.round_number = query3_result[0]["round_number"];
                data.round_purpose = query3_result[0]["round_purpose"];
                data.round_time = query3_result[0]["round_time"];
                data.card_idx = query2_result[i]["card_idx"];
                data.card_img = query2_result[i]["card_img"];
                data.card_txt = query2_result[i]["card_txt"];
                array.push(data);
            }
            
            const data2 = new Object();
            data2.project_name = query1_result[0]["project_name"];
            data2.scrap_count = query1_result[0]["scrap_count"];
            data2.card_item = array;
            return data2;

        } catch (err) {
            console.log('finalScarpList ERROR : ', err);
            return -1;
            //throw err;
        }
    },

    setProjectStatus: async(project_idx) => {
        const query = `UPDATE project SET project_status = 1 WHERE project_idx = ${project_idx}`;
        try{
            const result = await pool.queryParam(query);
            return result
        }catch(err){
            console.log('finalScarpList ERROR : ', err);
            return -1;
            //throw err;
        }
    },

    finishProject: async(project_idx) => {
        const query = `UPDATE project SET project_code = NULL WHERE project_idx = ${project_idx}`;
        try{
            const result = await pool.queryParam(query);
            return result
        }catch(err){
            console.log('finalScarpList ERROR : ', err);
            return -1;
            //throw err;
        }
    },

    testErrProject: async(user_idx, project_idx) => {
        const query = `SELECT COUNT(*) FROM project_participant pp WHERE pp.user_idx = ${user_idx} AND pp.project_idx = ${project_idx}`
        try{
            const result = await pool.queryParam(query);
            return result
        }catch(err){
            console.log('testErrProject ERROR : ', err);
            throw err;
        }
    }
}