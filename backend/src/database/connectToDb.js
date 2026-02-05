import mongoose from "mongoose";

export const connectToDb = async () => {
    try{
        const connect = await mongoose.connect(process.env.Mongo_URI);
        console.log(`Connected to Database ${connect.connection.host}`);
    }catch(err){
        console.error(`Could not connect to Database: ${err}`);

    }
}


