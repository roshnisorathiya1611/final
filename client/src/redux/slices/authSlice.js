import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Login Thunk
export const loginAction = createAsyncThunk(
  "login",
  async ({ email, password }) => {
    console.log(email, password);
    const data = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return data.json();
  }
);

export const signupAction = createAsyncThunk(
  "signup",
  async ({ name, email, password, gender }) => {
    console.log(email, password);
    const data = await fetch("http://localhost:8000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, gender, email, password }),
    });
    return data.json();
  }
);

export const updatePassword = createAsyncThunk(
  "updatepassword",
  async ({ currentPassword, newPassword, token }) => {
    console.log(currentPassword, newPassword, token);
    const data = await fetch("http://localhost:8000/auth/password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    return data.json();
  }
);

const authSlice = createSlice({
  name: "auth-slice",
  initialState: {
    user: null,
    authloading: false,
    autherror: null,
    loginsuccess: false,
    signupsuccess: false,
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state, action) => {
      state.authloading = true;
      state.autherror = null;
      state.loginsuccess = false;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.authloading = false;

      if (action.payload.success) {
        state.user = {
          token: action.payload.token,
        };
        state.loginsuccess = true;
      } else {
        state.autherror = action.payload.message;
      }
    });
    builder.addCase(signupAction.pending, (state, action) => {
      state.authloading = true;
      state.autherror = null;
      state.signupsuccess = false;
    });
    builder.addCase(signupAction.fulfilled, (state, action) => {
      state.authloading = false;

      if (action.payload.success == false) {
        state.autherror = action.payload.message;
      } else {
        state.signupsuccess = true;
      }
    });
    builder.addCase(updatePassword.pending, (state, action) => {
      state.authloading = true;
      state.autherror = null;
    });
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      state.authloading = false;
      if (action.payload.success == false) {
        state.autherror = action.payload.message;
      } else {
        state.autherror = "Details Updated";
      }
    });
  },
});

export default authSlice.reducer;
