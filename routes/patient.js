import express from "express";
import {
  addpatient,
  deletepatient,
  getallpatient,
  updatepatient,
} from "../controllers/patient.js";

const router = express.Router();
router.get("/", getallpatient);
router.post("/add", addpatient); //ca marche
router.put("/:id", updatepatient); //
router.delete("/:id", deletepatient);
export default router;
