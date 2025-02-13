const { validationResult } = require("express-validator");
const db = require("../models")

const getAllMeetingRooms = async (req, res) => {
  const validate = validationResult(req)
  if (!validate.isEmpty()) {
    return res.status(400).json({ errors: validate.errors });
  }
  try {
    const meetingRooms = await db.meetingRoom.findAll();
    res.json({ success: true, data: meetingRooms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllMeetingRooms
}