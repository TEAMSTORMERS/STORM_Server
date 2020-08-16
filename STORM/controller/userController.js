const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const UserDao = require('../dao/user');

module.exports = {

  signup: async (req, res) => {
    //1. request body에서 값을 읽어온다.
    const { user_name, user_token_kakao, user_token_google } = req.body;
    const user_img = req.file.location;

    //예외처리1 : parameter 체크 - 하나라도 null이나 undefined가 들어올 경우
    if (!user_name || (!user_token_kakao && !user_token_google) || user_img === undefined) {
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
    const userIdx = await UserDao.signup(user_name, user_token_kakao, user_token_google, user_img);
    if (userIdx === -1) {
      return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
    }

    //3. 가입성공
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.CREATED_USER, userIdx));
  },

  getMypage : async (req, res) => {

    //1. request body에서 값을 읽어온다.
    const user_idx = req.params.user_idx;
    
    //예외처리1 : user_idx를 입력받지 못했을 경우
    if (!user_idx) {
      return res.status(statusCode.BAD_REQUEST).sendzzz(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    }

    //예외처리2 : 해당 user_idx가 존재하지 않을 경우
    const user = await UserDao.checkUserIdx(user_idx);
    if (user === 0) { //여기서 잡았으
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    }

    //2. 새로운 User를 등록한다.
    const result = await UserDao.getMypage(user_idx);
    if (result === -1) {
      return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
    }

    //3. 조회성공
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.READ_PROFILE_SUCCESS, {
      "user_img" : result[0].user_img,
      "user_name" : result[0].user_name
    }));
  },

  changeProfileImg : async (req, res) => {

    //1. request body에서 값을 읽어온다.
    const user_idx = req.body.user_idx;
    const user_img = req.file.location;
    
    //예외처리1 : 입력받지 못했을 경우
    if (!user_idx || !user_img) {
      return res.status(statusCode.BAD_REQUEST).sendzzz(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    }

    //예외처리2 : 해당 user_idx가 존재하지 않을 경우
    const user = await UserDao.checkUserIdx(user_idx);
    if (user === 0) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    }

    //2. 새로운 프로필사진을 등록한다.
    const result = await UserDao.changeProfileImg(user_idx, user_img);
    if (result === -1) {
      return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
    }

    //3. 수정 성공
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.CHANGE_PROFILE_IMG_SUCCESS, {
      "user_img" : result[0].user_img
    }));
  },

  changeProfileName : async (req, res) => {

    //1. request body에서 값을 읽어온다.
    const {user_idx, user_name} = req.body;
    
    //예외처리1 : 입력받지 못했을 경우
    if (!user_idx || !user_name) {
      return res.status(statusCode.BAD_REQUEST).sendzzz(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    }

    //예외처리2 : 해당 user_idx가 존재하지 않을 경우
    const user = await UserDao.checkUserIdx(user_idx);
    if (user === 0) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    }

    //2. 새로운 닉네임을 등록한다.
    const result = await UserDao.changeProfileName(user_idx, user_name);
    if (result === -1) {
      return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
    }

    //3. 수정 성공
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.CHANGE_PROFILE_NAME_SUCCESS, {
      "user_name" : result[0].user_name
    }));
  }
  
  

}