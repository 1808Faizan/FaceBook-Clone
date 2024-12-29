import mongoose from "mongoose";
export const db=()=>{
    mongoose
    .connect(process.env.MONGODB_URL,{
        dbName:"Details"
    })
    .then(()=>{
        console.log("Connected to Database....");
    })
    .catch((err)=>{
        console.log("Error connecting to Database",err);
    });
}