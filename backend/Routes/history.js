const express = require("express");
const router = express.Router();
const Authentication = require('../Authentication/auth');
const HistoryController = require('../Controllers/history')

router.post('/add',Authentication.adminFacultyAuth,HistoryController.addHistory) //adding medincine to specific user ...
router.get('/get-history',Authentication.adminFacultyAuth,HistoryController.getHistoryByDate)
router.get('/get',Authentication.studentAuth,HistoryController.getStudentHistory);


module.exports = router;