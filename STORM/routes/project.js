var express = require('express');
var router = express.Router();
const projectController = require('../controller/projectController');

router.get('/user/:user_idx', projectController.showAllProject);
router.get('/info/:project_code', projectController.getProjectInfoPopUp);
router.post('/enter', projectController.memberEnterProject);
router.post('/', projectController.createProject); 
router.get('/:project_idx', projectController.getProjectInfo);
router.delete('/leave/:project_idx', projectController.deleteProject);
router.put('/status/:project_idx', projectController.setProjectStatus);
router.put('/finish/:project_idx', projectController.finishProject);
router.get('/finalInfo/:project_idx', projectController.finalInfo);
router.get('/finalScrapList/:user_idx/:project_idx', projectController.finalScrapList);

//사용안함
//router.get('/enter/:project_idx', projectController.getProjectparticipant);

module.exports = router;