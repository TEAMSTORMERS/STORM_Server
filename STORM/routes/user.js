var express = require('express');
var router = express.Router();
const userController = require('../controller/userController');
const upload = require('../modules/multer');
//const AuthMiddleware = require('../middlewares/auth');

router.post('/', upload.single('user_img'), userController.signup);
router.get('/mypage/:user_idx', userController.getMypage);
router.put('/mypage/img', userController.changeProfileImg);
router.put('/mypage/name', userController.changeProfileName);

module.exports = router;