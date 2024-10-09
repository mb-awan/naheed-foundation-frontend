import express from "express";
import userRoute from "./Routes/userRoute";
import connectDB from "./db/connection";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
connectDB();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    maxAge: 3600,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoute);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
