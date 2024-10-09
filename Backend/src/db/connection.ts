import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const db = await mongoose.connect(`${process.env.DB_URL}/donation`);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;
