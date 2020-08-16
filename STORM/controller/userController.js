const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const UserDao = require('../dao/user');
const encrypt  = require('../modules/crypto');

module.exports = {

  signup: async (req, res) => {
    //1. request body에서 값을 읽어온다.
    const { user_name, user_email, user_password, user_img_flag } = req.body;
    const user_img = req.file.location;

    //예외처리1 : parameter 체크 - 하나라도 null이나 undefined가 들어올 경우
    if (!user_name || (!user_email && !user_password) || user_img === undefined) {
      res.status(statusCode.BAD_REQUEST).sendzzz(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE)); //400은 요청이 잘못됐다는 오류 메세지
      return;
    }


    if(await UserDao.checkUserByEmail(user_email)){
      return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.ALREADY_ID)); 
    }

    //2. 새로운 User를 등록한다.
    const {salt, hashed} = await encrypt.encrypt(user_password);

    

    const idx = await UserDao.signup(user_name, user_email, hashed, salt, user_img, user_img_flag);
    if (idx === -1) {
      return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
    }


    //3. 가입성공
    return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.CREATED_USER, idx));
  },

  signIn: async(req, res) => {
    const { user_email, user_password } = req.body;

    if(!user_email || !user_password){
      console.log(user_email);
      console.log(req.body);
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    }


    const salt = await UserDao.checkUserByEmail(user_email);
    console.log(salt);

    const hashed = await encrypt.encryptWithSalt(user_password, salt);

    console.log(hashed);
    const user = await UserDao.signIn(user_email, salt, hashed);

    if(!user){
      console.log(user);
      return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.MISS_MATCH_PW));
    }

    return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, user));
  },

  signOut: async(req, res) => {
    const { user_idx, user_password, reason} = req.body;

    if(!user_password || !reason){
      console.log(user_password, reason);
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    }

    const salt = await UserDao.checkUserByIdx(user_idx);

    if(!salt){
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    }

    const hashed = await encrypt.encryptWithSalt(user_password, salt);

    if(!await UserDao.signOut(user_idx, salt, hashed, reason)){
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    };

    return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.DELETE_USER));

  }
}