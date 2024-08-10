import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// import my routes
import Routes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import doctorRoutes from "./routes/doctor.js";
import patientRoutes from "./routes/patient.js";

// import my all middlewares
import {
    isAdmin,
    isDoctor,
    isLoggedIn,
    isPatient,
  } from "./middlewares/auth.js";



const PORT = 8000;
const app = express();

// configure my database (env) file
dotenv.config();

// configure the my middlewared
app.use(express.json());

// configure backend to frontend
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

// configure routes
app.use("/auth", Routes);
app.use("/admin", isLoggedIn, isAdmin, adminRoutes);
app.use("/doctor", isLoggedIn, isDoctor, doctorRoutes);
app.use("/patient", isLoggedIn, isPatient, patientRoutes);


// configure my routes
app.use("/auth", Routes)

//connect to my databases
mongoose.connect(process.env.DB_URL)
.then(() => {
    app.listen(PORT, () => console.log("App started on PORT ", PORT));
})
.catch((err) => {
    console.log("database is not connected.");
    process.exit();
});