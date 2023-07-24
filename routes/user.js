import express from "express";
import {
  adduser,
  deleteuser,
  getallusers,
  updateuser,
} from "../controllers/user.js";
import { loginUser } from "../middlewares/login.js";
export const router = express.Router();
router.get("/", getallusers), //testé
  router.post("/login", loginUser, (req, res) => {
    res.status(200).json({
      message: "Login successful",
      user: req.user,
    });
  }); //testé
router.post("/signup", adduser, (req, res) => {
  res.status(201).json({
    message: "User registered successfully",
    user: req.user,
  });
}); //testé
router.put("/:id", updateuser); //TESTé
router.delete("/:id", deleteuser); //testé
export default router;
