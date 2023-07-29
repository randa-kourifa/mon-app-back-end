import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../schemas/user.js";

export const getallusers = async (req, res) => {
  try {
    const getUser = await User.findOne();
    res.status(200).json(getUser);
  } catch (error) {
    res.status(500).json({
      location: "error in get all user",
      message: error.message,
    });
  }
};
export const adduser = async (req, res) => {
  try {
    const user = req.body;
    console.log(user);

    const isFound = await User.findOne({ email: user.email }).maxTimeMS(30000);

    if (isFound) {
      return res.status(400).json({ message: "user already exists" });
    }

    console.log("hi from checkuser");

    // Créer un mot de passe haché
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newuser = { ...user, password: hashedPassword };

    const createuser = await User.create(newuser);

    const { password, ...rest } = createuser._doc;

    jwt.sign(
      { id: createuser._id },
      process.env.JWT_SECRET,
      { expiresIn: "14 days" },
      (err, token) => {
        if (err) return res.status(500).json({ message: "error in token" });
        res.status(200).json({ token, newuser: rest });
      }
    );
  } catch (error) {
    res.status(500).json({
      location: "error in adduser",
      message: error.message,
    });
  }
};

export const deleteuser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteduser = await User.findByIdAndDelete(id);
    if (!deleteduser)
      return res.status(400).json({
        message: " ID not found",
      });

    res.status(200).json(deleteduser);
  } catch (error) {
    res.status(500).json({
      location: "error in delete user",
      message: error.message,
    });
  }
};
export const updateuser = async (req, res) => {
  try {
    const getID = req.params.id;
    const updateusers = req.body;

    const updatedUser = await User.findByIdAndUpdate(getID, updateusers, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({
      location: "error in update user",
      message: error.message,
    });
  }
};
