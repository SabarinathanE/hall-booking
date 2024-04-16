import express from "express";
import {bookingStatus, creatingRoom, getAllBookedRooms, statusUpdation } from "../controller/index.js";
import { getAllRoom } from "../controller/index.js";

//using express.Router as common for all routers
const router=express.Router();

//to get all the rooms
router.get("/",async(req,res)=>{
    try {
        const data=await getAllRoom();
        res.status(201).json({data:data});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error,
        })
    }
})

//to create a room
router.post("/create",async(req,res)=>{
    try {
        if(Object.keys(req.body).length<=0){
            return res.status(400).json({error:"Check request body"});
        }
        const data=req.body;
        const newRoom=await creatingRoom(data);
        if(!newRoom.acknowledged){
            return res.status(400).json({error:"error in adding data"});
        }
        res.status(201).json({data:newRoom});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error,
        })
    }
});

//to book a room
router.post("/book",async(req,res)=>{
    try {
        if(Object.keys(req.body).length<=0){
            return res.status(400).json({error:"Check request body"});
        }
        const givenData=req.body;
        const roomName=req.body.room_name;
        const findRoom=await bookingStatus(roomName);
        if(findRoom.booking_status==="Booked"){
            return res.status(400).json({error:"Room is already booked"});
        }else{
            const data={...findRoom,booking_status:"Booked"};
            const statusUpdate=await statusUpdation(findRoom._id,data);
            const findingRoom=await bookingStatus(roomName);
            const updatedData={...findingRoom,customer:givenData};
            const finalUpdate=await statusUpdation(findingRoom._id,updatedData)
            if(!finalUpdate.acknowledged){
                return res.status(400).json({error:"error in adding data"});
            }
            res.status(200).json({data:finalUpdate});
        }
       
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error,
        })
    }
});

//to get all the room that are booked
router.get("/bookedRooms",async(req,res)=>{
    try {
        const data=await getAllBookedRooms();
        const arrayData=[];
        for(let i=0;i<data.length;i++){          
            arrayData.push({
                roomName:data[i].room_name,
                bookedStatus:data[i].booking_status,
                customerName:data[i].customer.customer_name,
                date:data[i].customer.date,
                startTime:data[i].customer.start_time,
                endTime:data[i].customer.end_time,
            }) 
        }
        res.status(201).json({data:arrayData});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error,
        })
    }
})

//to get all the customers booked a room
router.get("/bookedCustomers",async(req,res)=>{
    try {
        const data=await getAllBookedRooms();
        const arrayData=[];
        for(let i=0;i<data.length;i++){          
            arrayData.push({
                customerName:data[i].customer.customer_name,
                roomName:data[i].room_name,
                date:data[i].customer.date,
                startTime:data[i].customer.start_time,
                endTime:data[i].customer.end_time,
            }) 
        }
        res.status(201).json({data:arrayData});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error,
        })
    }
})

//to get how many times a customer has booked a room
router.get("/bookingCount",async(req,res)=>{
    try {
        const count=await getAllBookedRooms();
        const arrayData=[{"Number of times customer booked":count.length}];
        for(let i=0;i<count.length;i++){          
            arrayData.push({
                customerName:count[i].customer.customer_name,
                roomName:count[i].room_name,
                date:count[i].customer.date,
                startTime:count[i].customer.start_time,
                endTime:count[i].customer.end_time,
                bookingId:count[i].customer.booking_id,
                bookingDate:count[i].customer.booking_date,
                bookingStatus:count[i].customer.booking_status
            }) 
        }
        res.status(201).json({booked:arrayData});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error,
        })
    }
})

export const Router=router;