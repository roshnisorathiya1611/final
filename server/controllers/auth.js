
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/general.js";

// this for the signup code 
const signup = async(req, res) => {

    try
    {
    const { name, email, password, gender } = req.body;

    // check email already exit or not
    const oldUser = await User.findOne({ email: email});
        if(oldUser)
        {
            return sendResponse(400, false , "Email already in use", res);
        }
    // hash password
    bcrypt.hash(password, 10, async function(err, hash) {
            // Create a new accounts
                const newUser = new User ({name, email, password : hash, gender});
                await newUser.save();
                return sendResponse(200, true , "Account Created", res);
                    });
    }
    catch(err)
    {
        return sendResponse(500, true , err.message, res);
    }
};

// this for the login code 
const login = async (req, res) => {
    try
    {
        const { email, password } = req.body;

            // check email is right or not
            const user = await User.findOne({email})
            if(!user)
            {
                return sendResponse(400, false , "Invalid email!", res);
            }

            // check the password
            bcrypt.compare(password, user.password, function(err, result) {
                if(!result)
                {
                    return sendResponse(400, false , "Invalid password!", res);
                }
                else
                {
                    // sign the token and give it back user
                    const token = jwt.sign
                    (
                        {
                        _id: user._id,
                        }, 
                        process.env.JWT_SECRET, 
                        { 
                        expiresIn: '1h' 
                        }
                    );
                    return res
                    .status(200)
                    .json({ success: true, token: token});
                }
            });
    }
    catch(err)
    {
        return sendResponse(500, true , "err.message", res);
    }
  };

    const changePassword = async (req, res) => {
        try {
          const { currentPassword, newPassword } = req.body;
          const userId = req.user._id;
          const userAccount = await User.findById(userId);
          if (!userAccount)
            return sendResponse(400, false, "No details found in db", res);
          bcrypt.compare(
            currentPassword,
            userAccount.password,
            function (err, result) {
              if (!result)
                return sendResponse(400, false, "Invalid Password", res);
              else {
                bcrypt.hash(newPassword, 10, async function (err, hash) {
                  userAccount.password = hash;
                  await userAccount.save();
                  return sendResponse(200, true, "Password Updated Created", res);
                });
              }
            }
          );
        } catch (err) {
          return sendResponse(500, false, err.message, res);
        }
      };

export {signup, login, changePassword};