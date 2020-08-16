var express = require('express');
var router = express.Router();
const userController = require('../controller/userController');
const upload = require('../modules/multer');
//const AuthMiddleware = require('../middlewares/auth');

router.post('/signup', upload.single('user_img'), userController.signup);
router.post('/signin', userController.signIn);
router.post('/signout', userController.signOut);
router.get('/mypage/:user_idx', userController.getMypage);
router.put('/mypage/img', upload.single('user_img'), userController.changeProfileImg);
router.put('/mypage/name', userController.changeProfileName);

module.exports = router;
