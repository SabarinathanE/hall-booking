const express = require("express")
const bodyparser = require("body-parser")
const {listrooms,listcustomers,bookingdetail} = require("./Utils") 

const rooms = [];
const booking = [];

const http_server = express();

http_server.use(bodyparser.json())

http_server.post("/room", (req, res, next) => {
    rooms.push(req.body)
    res.send({message: "room created Successfully", rooms})
})

http_server.post("/booking", (req, res, next) => {
    booking.push(req.body)
    res.send({name: "sabari nathan", message: "created"})
})

http_server.get("/rooms", (req, res, next) => {
    res.send({message: "room created Successfully", rooms})
})

http_server.get("/bookings", (req, res, next) => {
    res.send({message: "booking created Successfully", booking})
})

http_server.get("/", (req, res, next) => {
    res.send({Details: "Booked Rooms",listrooms})
})

http_server.get("/listcustomers", (req, res, next) => {
    res.send({Details: "Customer Details", listcustomers})
})

http_server.get("/bookingdetail", (req, res, next) => {
    res.send({Details: "Booking Details", bookingdetail})
})


http_server.listen(3000, "0.0.0.0", () => {
    console.log("listening to 127.0.0.1")
})