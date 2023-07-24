import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import patientRouter from "./routes/patient.js";
import userRouter from "./routes/user.js";
dotenv.config();
mongoose.set("strictQuery", false);
async function connectToDatabase() {
  try {
    await mongoose.connect(
      "mongodb+srv://randakourifa:3z2LWJBXY8MgjCOt@cluster0.t0ljlki.mongodb.net/test2retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to database successfully!");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}
connectToDatabase();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/patient", patientRouter);
app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
