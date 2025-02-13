const router = require("express").Router()
const { body, query } = require("express-validator")
const {
  getAllMeetingRooms,
  updateMeetingRoomById,
  createMeetingRoom,
  deleteMeetingRoomById,
} = require("../db/controllers/meetingRoomController")

router.get(
  "/room-meetings",
  [
    query("limit").notEmpty().withMessage("limit wajib diisi"),
    query("page").notEmpty().withMessage("page wajib diisi"),
  ],
  getAllMeetingRooms
)

router.get(
  "/room-meeting",
  [query("id").notEmpty().withMessage("limit wajib diisi")],
  getAllMeetingRooms
)

router.post("/room-meeting", [
  body("unit").notEmpty().withMessage("Unit wajib diisi"),
  body("meeting_room").notEmpty().withMessage("Meeting Room wajib diisi"),
  body("capacity")
    .isInt({ min: 1 })
    .withMessage("Capacity harus berupa angka dan minimal 1"),
  body("meeting_date")
    .isISO8601()
    .withMessage("Meeting Date harus berupa format tanggal valid (YYYY-MM-DD)"),
  body("start_time").notEmpty().withMessage("Waktu Mulai wajib diisi"),
  body("end_time").notEmpty().withMessage("Waktu Selesai wajib diisi"),
  body("number_of_participants")
    .isInt({ min: 1 })
    .withMessage("Jumlah Peserta harus berupa angka dan minimal 1"),
  body("type_of_consumption")
    .optional()
    .isString()
    .withMessage("Jenis Konsumsi harus berupa string"),
  body("nominal_consumption")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Nominal Konsumsi harus berupa angka positif"),
], createMeetingRoom)

router.put(
  "/room-meeting",
  [
    query("id").notEmpty().withMessage("ID wajib diisi"),
    body("unit").notEmpty().withMessage("Unit wajib diisi"),
    body("meeting_room").notEmpty().withMessage("Meeting Room wajib diisi"),
    body("capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity harus berupa angka dan minimal 1"),
    body("meeting_date")
      .isISO8601()
      .withMessage("Meeting Date harus berupa format tanggal valid (YYYY-MM-DD)"),
    body("start_time").notEmpty().withMessage("Waktu Mulai wajib diisi"),
    body("end_time").notEmpty().withMessage("Waktu Selesai wajib diisi"),
    body("number_of_participants")
      .isInt({ min: 1 })
      .withMessage("Jumlah Peserta harus berupa angka dan minimal 1"),
    body("type_of_consumption")
      .optional()
      .isString()
      .withMessage("Jenis Konsumsi harus berupa string"),
    body("nominal_consumption")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Nominal Konsumsi harus berupa angka positif"),
  ],
  updateMeetingRoomById
);

router.delete(
  "/room-meeting",
  [query("id").notEmpty().withMessage("ID wajib diisi")],
  deleteMeetingRoomById
);

module.exports = router
