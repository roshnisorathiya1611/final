import express from "express";
import { body } from "express-validator"
const router = express.Router();

// import controllers
import { signup, login, changePassword } from "../controllers/auth.js";

// import middlewares
import { isLoggedIn, validateBodyData } from "../middlewares/auth.js";
router.post
    ("/signup", 
    body("name").exists().isLength({ min:3 }).withMessage("Name must be 3 character"),
    body("email").exists().isEmail().withMessage("Invalid email!"), 
    body("password").exists().isStrongPassword().withMessage("Password weak"),
    body("gender").exists().isIn(["male", "female", "others"]).withMessage("Give me a correct gender"),
    validateBodyData,
    signup
    );
router.post("/login",
    body("email").exists().isEmail().withMessage("Invalid email!"), 
    body("password").exists().withMessage("Password weak"),
    validateBodyData,
    login
    );

    router.put(
        "/password",
        body("currentPassword").exists().withMessage("Current Password is required"),
        body("newPassword")
          .exists()
          .isStrongPassword()
          .withMessage("New Password is required"),
        validateBodyData,
        isLoggedIn,
        changePassword
      );


export default router;