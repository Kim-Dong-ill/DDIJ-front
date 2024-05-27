import { createSlice } from "@reduxjs/toolkit";
import { authUser, loginUser, logoutUser } from "./thunkFunctions";
import { toast } from "react-toastify";

const initialState = {
  userData: {
    id: "",
    name: "",
    email: "",
    role: 0,
    image: [],
    location: "",
    createAt: "",
  },
  petsData: [],
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
        // state.userData = action.payload.user;
        state.userData = action.payload;
        console.log(action.payload);
        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.error = action.payload;
      })

      //authUser
      .addCase(authUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
        state.petsData = action.payload.pets;
        console.log("action.payload", action.payload);
        state.isAuth = true;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuth = false;
        state.userData = initialState.userData;
        localStorage.removeItem("accessToken");
      })

      //logoutUser
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.userData = initialState.userData;
        localStorage.removeItem("accessToken");
        toast.success(action.payload.message);
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload.messgae);
      });
  },
});

export default userSlice.reducer;
