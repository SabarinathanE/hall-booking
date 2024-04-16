import { ObjectId } from "mongodb";
import { client } from "../../db.js";

//controllers used to do specific operations to the database

//to find all the rooms
export function getAllRoom(){
    return client.db("Hall-Booking").collection("booking").find({}).toArray();
}

//to create a room 
export function creatingRoom(data){
    return client.db("Hall-Booking").collection("booking").insertOne(data);
}

//to find the room 
export function bookingStatus(roomName){
    return client.db("Hall-Booking").collection("booking").findOne({room_name:roomName})
}

//to update the status as booked
export function statusUpdation(id,data){
    return client.db("Hall-Booking").collection("booking").updateOne({_id:new ObjectId(id)},{$set:data})
}

//to get all the booked rooms
export function getAllBookedRooms(){
    return client.db("Hall-Booking").collection("booking").find({booking_status:"Booked"}).toArray();
}

//to get all the rooms that are booked
export function checkBooking(){
    return client.db("Hall-Booking").collection("booking").find({})
}