const pool = require('../modules/pool');

module.exports = {

    //회원가입
    signup: async (user_name, user_token_kakao, user_token_google, user_img) => {
        const fields = 'user_name, user_token_kakao, user_token_google, user_img';
        const questions = `?, ?, ?, ?`;
        const values = [user_name, user_token_kakao, user_token_google, user_img];
        const query = `INSERT INTO user (${fields}) VALUES (${questions})`;
        try {
            const result = await pool.queryParamArr(query, values);
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

    checkUserIdx : async (user_idx) => {
        const query = `SELECT COUNT(*) FROM user WHERE user_idx = ${user_idx}`;
        try{
            const result = await pool.queryParam(query);
            return result[0]["COUNT(*)"];
        }catch (err){
            console.log('getMypage ERROR : ', err);
            //throw err;
            return 0; //숫자가 아닌 값이 들어올 경우 catch에 잡히는데 이때 임의로 0이라는 값을 넘겨서
        }
    },

    //프로필조회
    getMypage : async (user_idx) => {
        const query = `SELECT user_img, user_name, user_img_flag FROM user WHERE user_idx = ${user_idx}`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch (err){
            console.log('getMypage ERROR : ', err);
            throw err;
        }
    },

        //프로필이미지변경
    changeProfileImg : async (user_idx, user_img, user_img_flag) => {
        const query = `UPDATE user SET user_img = "${user_img}", user_img_flag = ${user_img_flag} WHERE user_idx = ${user_idx}`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch (err){
            console.log('getMypage ERROR : ', err);
            return -1;
            //throw err;
        }
    },

    //프로필이름변경
    changeProfileName : async (user_idx, user_name) => {
        const query = `UPDATE user SET user_name = "${user_name}" WHERE user_idx = ${user_idx}`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch (err){
            console.log('getMypage ERROR : ', err);
            return -1;
            //throw err;
        }
    }
}