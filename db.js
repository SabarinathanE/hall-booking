//to connect to mongodb atlas
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
//importing and using config for accessing dotenv variable connectionString
dotenv.config();


async function dbConnection(){
    try {
        //passing the connectionString to the MongoClient
        const client=new MongoClient(process.env.connectionString);
        //connecting database
        await client.connect();
        console.log("Database connected");
        return client;

    } catch (error) {
        console.log(error,"error connecting database");
    }
}

export const client=await dbConnection();