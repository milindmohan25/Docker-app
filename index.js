import express  from "express";
import cookieParser from "cookie-parser" ;
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from "./routes/auth.js"




 dotenv.config();

 const app = express();
 const port = process.env.PORT || 8000 ;

 const CorsOptions = {
    origin: true,
 };

 app.get("/", (req,res)=>{
    res.send("API is On");
 });
// databse
 mongoose.set('strictQuery',false)
 const connectDB =async()=>{
   try {
     await mongoose.connect(process.env.Mongo_URL, {
         useNewUrlParser:true,
         useUnifiedTopology:true,

      })
      console.log('mondoDB is connected')
   } catch (error) {
      console.log('mongoDB is not connected')
      
   }
 }
 //middlewere
 app.use(express.json());
 app.use(cookieParser());
 app.use(cors(CorsOptions));
 app.use('/api/v1/auth', authRoute) //domain/api/version1/auth/register


 


 app.listen(port,()=> {
   connectDB();
    console.log(" server is running on"+ port)
 })