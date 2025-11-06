const express = require('express');
const router = express.Router();
const pollController = require("../controllers/pollController");

// ACTIVITY: Create routes that call controller functions when rrequested
router.get("/polls", pollController.getPolls);
router.get("/polls", pollController.getPoll);
router.post("/polls", pollController.postPoll);
router.post("/polls", pollController.postVote);


module.exports = router;
