import mongoose from 'mongoose';

export  const DBconnect =async () => {
    try {
         await mongoose.connect(process.env.DATABASE_URL);
        console.log("Database Connected");
    } catch (error) {
        throw(error);
    }
}

