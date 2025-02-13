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

const getMeetingRoomById = async (req, res) => {
  const validate = validationResult(req)
  if (!validate.isEmpty()) {
    return res.status(400).json({ errors: validate.errors });
  }
  try {
    const { id } = req.query;
    const meetingRoom = await db.meetingRoom.findOne({
      where: { id: id }
    });

    if (!meetingRoom) {
      return res.status(404).json({ success: false, message: "Meeting room not found" });
    }

    res.json({ success: true, data: meetingRoom });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createMeetingRoom = async (req, res) => {
  const validate = validationResult(req)
  if (!validate.isEmpty()) {
    return res.status(400).json({ errors: validate.errors });
  }
  try {
    const { unit, meeting_room, capacity, meeting_date, start_time, end_time, number_of_participants, type_of_consumption, nominal_consumption } = req.body;

    const newMeetingRoom = await db.meetingRoom.create({
      unit,
      meeting_room,
      capacity,
      meeting_date,
      start_time,
      end_time,
      number_of_participants,
      type_of_consumption,
      nominal_consumption,
    });

    res.status(201).json({ success: true, data: newMeetingRoom });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateMeetingRoomById = async (req, res) => {
  const validate = validationResult(req);
  if (!validate.isEmpty()) {
    return res.status(400).json({ errors: validate.errors });
  }

  try {
    const { id } = req.query; 
    const { unit, meeting_room, capacity, meeting_date, start_time, end_time, number_of_participants, type_of_consumption, nominal_consumption } = req.body;

    const meetingRoom = await db.meetingRoom.findOne({ where: { id } });

    if (!meetingRoom) {
      return res.status(404).json({ success: false, message: "Meeting room not found" });
    }

    // Update data
    await db.meetingRoom.update(
      {
        unit,
        meeting_room,
        capacity,
        meeting_date,
        start_time,
        end_time,
        number_of_participants,
        type_of_consumption,
        nominal_consumption,
      },
      { where: { id } }
    );

    // Ambil data terbaru setelah update
    const updatedMeetingRoom = await db.meetingRoom.findOne({ where: { id } });

    res.status(200).json({ success: true, message: "Meeting room updated successfully", data: updatedMeetingRoom });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteMeetingRoomById = async (req, res) => {
  const validate = validationResult(req);
  if (!validate.isEmpty()) {
    return res.status(400).json({ errors: validate.errors });
  }
  
  try {
    const { id } = req.query;

    const meetingRoom = await db.meetingRoom.findOne({ where: { id } });

    if (!meetingRoom) {
      return res.status(404).json({ success: false, message: "Meeting room not found" });
    }

    await db.meetingRoom.destroy({ where: { id } });

    res.status(200).json({ success: true, message: "Meeting room deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllMeetingRooms,
  getMeetingRoomById,
  createMeetingRoom,
  updateMeetingRoomById,
  deleteMeetingRoomById
}