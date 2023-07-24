import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import patientRouter from "./routes/patient.js";
import userRouter from "./routes/user.js";
dotenv.config();
// async function connectToDatabase() {
//   try {
//     await mongoose.connect(process.env.MONGO_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       connectTimeoutMS: 300000000,
//     });
//     console.log("Connected to database successfully!");
//   } catch (error) {
//     console.error("Error connecting to database:", error);
//   }
// }
// connectToDatabase();
// mongoose.set("strictQuery", false);
// mongoose.connect(process.env.MONGO_URL, (err) => {
//   if (err) return console.log(err);
//   console.log("connected to database");
// });
// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use("/user", userRouter);
// app.use("/patient", patientRouter);
// app.listen(process.env.PORT, () => {
//   console.log("Server is running on port " + process.env.PORT);
// });
dotenv.config();
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connecté à la base de données MongoDB !");
    // Reste de votre code
  })
  .catch((err) => {
    console.error("Erreur de connexion à la base de données : ", err);
  });

const app = express();
//body parser
app.use(cors());
app.use(express.json());

// define routers
app.use("/user", userRouter);
app.use("/patient", patientRouter);
//app.use("/patient", patientRouter);
//test
app.get("/ping", (req, res) => {
  res.send("pong");
});
app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
