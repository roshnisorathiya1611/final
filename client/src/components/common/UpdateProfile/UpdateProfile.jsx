import React, { useState } from "react";
import { updatePassword } from "../../../redux/slices/authSlice.js";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
export default function UpdateProfile() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
 //const authloading = useSelector((state) => state.authReducers);
 // const autherror = useSelector((state) => state.authReducers);
  //const user  = useSelector((state) => state.authReducers)

  const { authloading, user } = useSelector((state) => state.authReducers);
  const dispatch = useDispatch();


const handlePasswordUpdateSubmit = (e) => {
    e.preventDefault();
    if (newPassword == confirmPassword) {
      dispatch(
        updatePassword({
          currentPassword,
          newPassword,
          token: user.token,
        })
      );
    } else {
      toast.error("Password are not matching");
    }
  };

  return (
    <div className="container-fluid pt-4 px-4">
    <div className="row g-4">
      <div className="col-sm-12 col-xl-12">
        <div className="bg-light rounded h-100 p-4">
          <h6 className="mb-4">Basic Form</h6>
          <form onSubmit={handlePasswordUpdateSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) =>
                          setCurrentPassword(e.currentTarget.value)}
                        required />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">New Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) =>
                          setNewPassword(e.currentTarget.value)}
                        required />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Conform Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) =>
                          setConfirmPassword(e.currentTarget.value)}
                        required/>
            </div>

            <button
                        disabled={authloading == true}
                        className="btn btn-primary btn-sm"
                      >
                        {authloading ? "Please Wait..." : "Change Password"}
                      </button>
          </form>
        </div>
      </div>
    </div></div>
  );
}
