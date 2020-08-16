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

    /*
    //예외처리2 : img 형식이 올바르지 않을 경우
    const type = req.file.mimetype.split('/')[1];
    if(type !== 'jpeg' && type !== 'jpg' && type !=='png'){
      return res.status(CODE.OK).send(util.success(statusCode.OK, resMessage.UNSUPPORTED_TYPE));
    }

    //예외처리2 : 아이디 중복 체크
    if (await UserModel.checkUser(id)) {
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
      return;
    }
    */

    //2. 새로운 User를 등록한다.
    const {salt, hashed} = await encrypt.encrypt(user_password);

    const idx = await UserDao.signup(user_name, user_email, hashed, salt, user_img, user_img_flag);
    if (idx === -1) {
      return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
    }



    //3. 가입성공
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.CREATED_USER, idx));
  },

  signIn: async(req, res) => {
    const { user_email, user_password } = req.body;

    if(!user_email || !user_password){
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    }

    const{salt, hashed} = await encrypt.encrypt(user_password);

    if(!salt || !hashed){
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    }

    const user_idx = await UserDao.signIn(user_email, salt, hashed);
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, user_idx));

  }
}