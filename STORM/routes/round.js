var express = require('express');
var router = express.Router();
const roundController = require('../controller/roundController');

router.get("/count/:project_idx", roundController.roundCount);
router.post("/setting", roundController.roundSetting);
router.get("/info/:round_idx", roundController.roundInfo);
router.post("/enter", roundController.nextRoundEnter);
router.delete("/leave/:user_idx/:project_idx/:round_idx", roundController.roundLeave);
router.get("/memberList/:project_idx/:round_idx", roundController.roundParticipant);
router.get("/cardList/:project_idx/:round_idx/:user_idx", roundController.roundCardList);
router.get("/roundFinalInfo/:user_idx/:project_idx", roundController.roundFinalInfo);

module.exports = router;