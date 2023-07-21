import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import patientRouter from "./routes/patient.js";
import userRouter from "./routes/user.js";
dotenv.config();
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
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
const secretKey = process.env.JWT_SECRET;
const payload = { userId: "votre-id-d'utilisateur" };
const token = jwt.sign(payload, secretKey, { expiresIn: "1000h" });
try {
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decodedToken);
} catch (error) {
  console.error(error.message);
}
