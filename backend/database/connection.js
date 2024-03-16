import mongoose from "mongoose";
const connect =async()=>{
    try{
        const con=await mongoose.connect(process.env.MONGO_URI,{
            usenewurlparse:true,
            useunifiedtopology:true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(error){
        console.error(`Error:${error.message}`);
        process.exit(1);
    }
};

export default connect;