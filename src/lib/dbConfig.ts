import { promises } from "dns";
import mongoose from "mongoose";


type ConnectionObject = {
    isConnected?:number
}

const connection:ConnectionObject ={};

const dbConnect = async():Promise<void> =>{
    if(connection.isConnected){
        console.log("Using existing connection");
        return;
    }
    try {
        const db=await mongoose.connect(process.env.MONGO_URI || '');
        connection.isConnected=db.connections[0].readyState;
        console.log("Db connected succesfully")
        
    } catch (error) {
        console.log("Error connecting to db",error);
        process.exit(1);
        
    }
}

export default dbConnect;