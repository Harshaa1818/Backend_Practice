import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config({
    path:'./.env'
})

const connectDB = async () => {
    try{
       const instance= await mongoose.connect(`${process.env.MONGO_DB_URL}${process.env.MONGO_DB_NAME}`)
            
        console.log("MongoDB connection SUCCESS")
    }
    catch(err){
        console.log("MongoDB connection FAIL",err);
        process.exit(1);
    }
}

export {connectDB}