import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);

        console.log(" MongoDB Connected");
        console.log(" DB Name:", conn.connection.name);
        console.log(" Host:", conn.connection.host);

    } catch (error) {
        console.error(" MongoDB Connection Error:", error);
        process.exit(1); // stop server if DB fails
    }
};

export default connectDB;
