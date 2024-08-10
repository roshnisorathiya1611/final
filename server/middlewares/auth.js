import {validationResult} from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const validateBodyData = (req,res,next) => {
    const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }

  res.status(400).json({ success: false, message: result.array()[0]["msg"] });
};

// Check login or not
const isLoggedIn = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    // inject user if from the token into request
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).json({ success: false, message: "Invalid Token" });
  }
};

// only admin this access code
const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user && user.role == "admin") {
    return next();
  }
  return res
    .status(401)
    .json({ success: false, message: "Only admins have access" });
};

// this for the doctor
const isDoctor = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user && user.role == "doctor") {
    return next();
  }
  return res
    .status(401)
    .json({success: false,message: "Only Doctors have access"});
};

// this for the Patient
const isPatient = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user && user.role == "patient") {
    return next();
  }
  return res
    .status(401)
    .json({success: false,message: "Only Patients have access"});
};

export { validateBodyData, isLoggedIn, isAdmin, isDoctor, isPatient };