import mongoose from "mongoose";

const User = new mongoose.Schema ({
    name: {
        type : String,
        required : true,
    },
    email: {
        type : String,
        required : true,
        unique : true,
    },
    gender: {
        type : String,
        enum : ["male","female","other"],
        required : true,
    },
    password: {
        type : String,
        required : true,
    },
    emailVerified: {
        type : Boolean,
        required : true,
        default : false,
    },
    role: {
        type : String,
        enum : ["admin","doctor","patient"],
        default : "patient",
        required : true,
    }
});

export default mongoose.model("HMSUsers",User)