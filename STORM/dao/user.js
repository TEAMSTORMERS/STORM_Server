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
        const fields = 'user_email, salt, user_password';
        const questions = `?, ?, ?`;
        const values = [user_email, salt, user_password];
        const query = `SELECT INTO user (${fields}) VALUES (${questions})`;

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
    }
}