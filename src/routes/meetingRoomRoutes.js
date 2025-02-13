const router = require('express').Router()
const { body, query, validationResult } = require("express-validator");
const { getAllMeetingRooms } = require('../db/controllers/meetingRoomController');

router.get('/room-meetings', [
  query("limit").notEmpty().withMessage("limit wajib diisi"),
  query("page").notEmpty().withMessage("page wajib diisi"),
], getAllMeetingRooms);

module.exports = router;