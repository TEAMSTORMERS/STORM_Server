const pool = require('../modules/pool');


module.exports = {

    //project_idx를 받았을 때 round 수 +1 반환
    countInfo: async (project_idx) => {
        const values = project_idx;
        const query = `SELECT COUNT(*) FROM round WHERE project_idx = ${project_idx}`

        try {
            const result = await pool.queryParamArr(query, values);
            return result[0]["COUNT(*)"] + 1;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('signup ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('signup ERROR : ', err);
            throw err;
        }
    },

    //project_idx, round_purpose, round_time을 받았을 때 project_idx로 round 수 반환해서 새로운 round 정보 추가
    roundSetting: async (project_idx, round_purpose, round_time) => {

        const fields = 'round_number, round_purpose, round_time, project_idx';
        const questions = '?, ?, ?, ?'

        const query1 = `SELECT COUNT(*) FROM round WHERE project_idx = ${project_idx}`
        const query2 = `INSERT INTO round (${fields}) VALUES (${questions})`
        try {
            const round_count = await pool.queryParam(query1);
            const round_number = round_count[0]["COUNT(*)"] + 1;

            const value = [round_number, round_purpose, round_time, project_idx];
            const result = await pool.queryParamArr(query2, value);
            const insertId = result.insertId;
            return insertId;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('signup ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('signup ERROR : ', err);
            throw err;
        }
    },

    //(2라운드 이상부터) project_idx로 가장 최근의 round_idx 찾기
    checkRoundIdx: async (project_idx) => {
        const query = `SELECT round_idx FROM round WHERE project_idx = ${project_idx}`

        try {
            const result = await pool.queryParam(query);
            return result[result.length-1]["round_idx"];
        } catch (err) {
            console.log('checkRoundIdx ERROR : ', err);
            throw err;
        }
    },

    //user_idx, round_idx를 받았을 때 round_participant에 새로운 row 추가
    roundEnter: async (user_idx, round_idx) => {
        const fields = `user_idx, round_idx`;
        const questions = '?, ?'
        const values = [user_idx, round_idx];
        const query = `INSERT INTO round_participant (${fields}) VALUES (${questions})`;

        try {
            const result = await pool.queryParamArr(query, values);
            return result;
        } catch (err) {
            console.log('roundEnter ERROR : ', err);
            throw err;
        }
    },

    //round_idx 받았을 때 round_idx, round_number, round_purpose, round_time를 반환
    roundInfo: async (round_idx) => {
        const fields = `round_number, round_purpose, round_time`;
        const query = `SELECT ${fields} FROM round WHERE round_idx = ${round_idx}`

        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('roundInfo ERROR : ', err);
            throw err;
        }
    },

    //user_idx, round_idx를 받았을 때 round_participant의 해당하는 row 삭제
    roundLeave: async (user_idx, round_idx) => {
        const query = `DELETE FROM round_participant WHERE user_idx = ${user_idx} AND round_idx = ${round_idx}`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('roundLeave ERROR : ', err);
            throw err;
        }
    },

    //round_idx를 받았을 때 user_idx를 반환
    roundMemberList: async(project_idx, round_idx) => {
        const query1 = `SELECT rp.user_idx
                        FROM round_participant rp JOIN round r ON r.round_idx = rp.round_idx
                        WHERE r.round_idx = ${round_idx}`;

        try{
            const round_user = await pool.queryParam(query1);
           
            const array = [];
            for(var i=0; i<round_user.length; i++){
                const query3 = `SELECT user_name, user_img FROM user WHERE user_idx = ${round_user[i]["user_idx"]}`;
                const result1 = await pool.queryParam(query3);
                
                const query4 = `SELECT COUNT(project_participant_host_idx) AS user_host_flag
                                FROM project_participant_host AS pph JOIN project_participant AS pp
                                WHERE pph.project_participant_idx = pp.project_participant_idx AND pp.user_idx = ${round_user[i]["user_idx"]} AND pp.project_idx = ${project_idx}`;
                const result2 = await pool.queryParam(query4);
                
                var data = new Object();
                data.user_name = result1[0].user_name;
                data.user_img = result1[0].user_img;
                data.user_host_flag = result2[0].user_host_flag;
                array.push(data);
            }
            return array;
        }catch(err){
            console.log('roundMemberList ERROR : ', err);
            console.log(err);
        }
    },

    //project_idx, round_idx를 받았을 때 round정보, card정보, project_name를 반환
    roundCardList: async (project_idx, round_idx) => {
        const query1 = `SELECT round_number, round_purpose, round_time FROM round WHERE round_idx = ${round_idx}`;
        const query2 = `SELECT card_idx, card_img, card_txt, user_img FROM card JOIN user ON card.user_idx = user.user_idx WHERE round_idx = ${round_idx}`;
        const query3 = `SELECT project_name FROM project WHERE project_idx = ${project_idx}`;

        try {
            const round_result = await pool.queryParam(query1);
            const card_result = await pool.queryParam(query2)
            const project_result = await pool.queryParam(query3);

            var data = new Object();
            data.project_name = project_result[0]["project_name"];
            data.round_number = round_result[0]["round_number"];
            data.round_purpose = round_result[0]["round_purpose"];
            data.round_time = round_result[0]["round_time"];
            var array = [];
            for (var i = 0; i < card_result.length; i++) {
                var data2 = new Object();
                data2.card_idx = card_result[i]["card_idx"];
                data2.card_img = card_result[i]["card_img"];
                data2.card_txt = card_result[i]["card_txt"];
                data2.user_img = card_result[i]["user_img"];
                array.push(data2);
            };
            data.card_list = array;
            return data;

        } catch (err) {
            console.log('roundCardList ERROR : ', err);
            console.log(err);
        }
    },

    //project_idx를 받았을 때 round정보, card정보, project_name를 반환
    roundFinalInfo: async (project_idx) => {
        try {
            const query1 = `SELECT round_idx, round_number, round_purpose, round_time
                            FROM round r JOIN project p ON r.project_idx = p.project_idx
                            WHERE p.project_idx = ${project_idx}`;

            const result = await pool.queryParam(query1);
            var array = [];

            for (var i = 0; i < result.length; i++) {
                const query2 = `select user_name, user_img
                                FROM user u JOIN round_participant rp ON u.user_idx = rp.user_idx 
                                JOIN round r ON r.round_idx = rp.round_idx 
                                JOIN project p ON p.project_idx = r.project_idx 
                                WHERE r.project_idx = ${project_idx} AND r.round_number = ${result[i]["round_number"]};`;
                const result2 = await pool.queryParam(query2);

                var data = new Object();
                data.round_idx = result[i]["round_idx"];
                data.round_number = result[i]["round_number"];
                data.round_purpose = result[i]["round_purpose"];
                data.round_time = result[i]["round_time"];
                data.round_participant = result2;
                array.push(data);
            }
            return array;

        } catch (err) {
            console.log('roundFinalInfo ERROR : ', err);
            console.log(err);
        }
    },

    //중복 참여 방지
    testErrRound: async(user_idx, round_idx) => {
        const query = `SELECT COUNT(*) FROM round_participant rp WHERE rp.user_idx = ${user_idx} AND rp.round_idx = ${round_idx}`;
        try{
            const result = await pool.queryParam(query);
            return result
        }catch(err){
            console.log('testErrRound ERROR : ', err);
            console.log(err);
        }
    }
}