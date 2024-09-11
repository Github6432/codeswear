import mongoose from "mongoose";

const connectDb = (handler) => async (req, res) => {
    try {
        const url = process.env.MONGO_URI;
        if (mongoose.connection.readyState === 0) {
            const conn = await mongoose.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log(`Mongodb DataBase Connected!, ${conn.connection.host}`);
        } else {
            console.log('MongoDB already connected');
        }
        return handler(req, res);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Database connection failed", error: error.message });
    }
};

export default connectDb;
