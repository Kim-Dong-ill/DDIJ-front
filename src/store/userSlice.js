import { createSlice } from "@reduxjs/toolkit";
import { authUser, loginUser } from "./thunkFunctions";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

const initialState = {
  userData: {
    id: "",
    name: "",
    email: "",
    role: 0,
    image: [],
    createAt: "",
  },
  isAuth: false,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.isLoading = false;
        state.userData = action.payload.user;
        console.log(action.payload);
        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.error = action.payload;
        // toast.error(action.payload.message);
      })

      //authUser
      .addCase(authUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
        state.isAuth = true;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuth = false;
        state.userData = initialState.userData;
        localStorage.removeItem("accessToken");
      });
  },
});

export default userSlice.reducer;
