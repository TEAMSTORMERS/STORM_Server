var express = require('express');
var router = express.Router();
const userController = require('../controller/userController');
const upload = require('../modules/multer');

router.post('/checkemail', userController.checkEmail);
router.post('/signup', upload.single('user_img'), userController.signup);
router.post('/signin', userController.signIn);
router.post('/checkPassword', userController.checkPassword);
router.post('/withdrawal', userController.withDrawal);
router.get('/mypage/:user_idx', userController.getMypage);
router.put('/mypage/img', upload.single('user_img'), userController.changeProfileImg);
router.put('/mypage/name', userController.changeProfileName);

module.exports = router;