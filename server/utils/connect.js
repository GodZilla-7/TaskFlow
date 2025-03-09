import mongoose from "mongoose";

const connection={isConnected:null};

export const connecttoDB = async () => {
    try{
        if(connection.isConnected){
            console.log("Using existing connection");
            return;
        }
        const db = await mongoose.connect(process.env.MONGO_URI);
        connection.isConnected=db.connections[0].readyState;
        console.log("New connection");
    }
    catch(error){
        console.log("Error connecting to database",error);
        connection.isConnected=null;
    }
};
