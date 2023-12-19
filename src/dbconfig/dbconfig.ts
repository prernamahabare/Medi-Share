import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URL!);

        const connection = mongoose.connection;

        connection.on('connected', ()=>{
            console.log("MongoDB Connected Sucessfully!");
        })

        connection.on('error', (err) =>{
            console.log('MongoDB connection error. Please make sure mongoDB connected Sucessfully or not.'+ err);
            process.exit();
        })
    } catch (error) {
        console.log('Something went Wrong!');
        console.log(error);
    }
}
