const pool = require('../modules/pool');
const encrypt = require('../modules/crypto');

module.exports = {

    //회원가입
    signup: async (user_name, user_email, user_password, salt, user_img, user_img_flag) => {
        const fields = 'user_name, user_email, user_password, salt, user_img, user_img_flag';
        const questions = `?, ?, ?, ?, ?, ?`;
        const values = [user_name, user_email, user_password, salt, user_img, user_img_flag];
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

    signIn: async(user_email, salt, user_password) => {
        const query = `SELECT user_idx FROM user  WHERE user_email = "${user_email}" AND salt = "${salt}" AND user_password = "${user_password}"`;

        try {
            const result = await pool.queryParam(query);
            const insertId = result[0]["user_idx"];
            return insertId;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('signIn ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('signIn ERROR : ', err);
            return false;
        }
    },

    checkUser: async(user_email) => {
        const query = `SELECT salt FROM user WHERE user_email = "${user_email}"`;

        try {
            const result = await pool.queryParam(query);
            return result[0]["salt"];
        } catch (err) {
            if (err.errno == 1062) {
                console.log('checkUser ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('checkUser ERROR : ', err);
            return false;
        }
    }

}