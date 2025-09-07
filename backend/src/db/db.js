// db connection
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
}
export default connectDb;