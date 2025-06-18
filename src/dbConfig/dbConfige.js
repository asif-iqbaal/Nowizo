import mongoose from 'mongoose';

export  const DBconnect =async () => {
    try {
        console.log("Database Connected ho rah h",process.env.DATABASE_URL);
         await mongoose.connect(process.env.DATABASE_URL);
        console.log("Database Connected");
    } catch (error) {
        throw(error);
    }
}

