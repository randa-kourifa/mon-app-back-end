// middleware.js
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../schemas/user.js";
dotenv.config();

const JWT_SECRET =
  "randaquiessayedereparersontokenpourlapremierfois123456789try2";

// export const ADDUser = async (req, res, next) => {
//   // Get user input
//   const { first_name, last_name, email, password, role } = req.body;

//   // Validate user input
//   if (!(email && password && first_name && last_name && role)) {
//     return res.status(400).json({
//       message: "All input is required",
//     });
//   }

//   try {
//     // check if user already exists
//     const oldUser = await User.findOne({ email });
//     if (oldUser) {
//       return res.status(409).json({
//         message: "User Already Exists. Please Login",
//       });
//     }

//     // Encrypt user password
//     const encryptedPassword = await bcrypt.hash(password, 10);

//     // Create user in our database
//     const newUser = await User.create({
//       role,
//       first_name,
//       last_name,
//       email: email.toLowerCase(),
//       password: encryptedPassword,
//     });

//     // Create token
//     const token = jwt.sign(
//       { user_id: newUser._id, email: newUser.email },
//       JWT_SECRET, // Utilisez la clé secrète définie dans la constante JWT_SECRET
//       {
//         expiresIn: "2h",
//       }
//     );

//     // Save the token to the user document in MongoDB
//     newUser.token = token;
//     await newUser.save();

//     // Add the user to the request object for later use
//     req.user = newUser;

//     next();
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: "Error creating user",
//       error: err.message,
//     });
//   }
// };
export const ADDUser = async (req, res, next) => {
  // Get user input
  const { first_name, last_name, email, password, role } = req.body;

  // Validate user input
  if (!(email && password && first_name && last_name && role)) {
    return res.status(400).json({
      message: "All input is required",
    });
  }

  try {
    // check if user already exists
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).json({
        message: "User Already Exists. Please Login",
      });
    }

    // Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const newUser = await User.create({
      role, // Set the role of the new user
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: newUser._id, email: newUser.email },
      JWT_SECRET, // Utilisez la clé secrète définie dans la constante JWT_SECRET
      {
        expiresIn: "2h",
      }
    );

    // Save the token to the user document in MongoDB
    newUser.token = token;
    await newUser.save();

    // Add the user to the request object for later use
    req.user = newUser;

    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error creating user",
      error: err.message,
    });
  }
};
