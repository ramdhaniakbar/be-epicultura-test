require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

const PORT = process.env.PORT || 9000;

// Server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})

app.get("/", (req, res) => {
  res.json({
    message: "epicultura backend test",
  })
})


// -- Routes
const meetingRoomRouter = require("./src/routes/meetingRoomRoutes")

app.use('/api', meetingRoomRouter)

module.exports = app