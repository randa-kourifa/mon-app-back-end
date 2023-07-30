import express from "express";
import { deleteuser, getallusers, updateuser } from "../controllers/user.js";
import { checkuser } from "../middlewares/checktoken.js";
import { isAdmin } from "../middlewares/isadmin.js";
import { loginUser } from "../middlewares/login.js";
import { ADDUser } from "../middlewares/register.js";
export const router = express.Router();
router.get("/", getallusers), //testé
  router.post("/login", loginUser, isAdmin, (req, res) => {
    res.status(200).json({
      message: "Login successful",
      user: req.user,
    });
  }); //testé
router.post("/signup", ADDUser, isAdmin, (req, res) => {
  res.status(201).json({
    message: "User registered successfully",
    user: req.user,
  });
}); //testé
router.post("/checktoken", checkuser, (req, res) => {
  res.status(201).json({
    message: "User registered successfully",
    user: req.user,
  });
});
router.put("/:id", updateuser); //TESTé
router.delete("/:id", deleteuser); //testé
export default router;
