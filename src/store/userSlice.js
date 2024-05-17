import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./thunkFunctions";
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
  isLoding: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // const navigate = useNavigate();
        state.isAuth = true;
        state.isLoding = false;
        state.userData = action.payload.user;
        localStorage.setItem("accessToken", action.payload.accessToken);
        // navigate("/");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoding = false;
        state.isAuth = false;
        state.error = action.payload;
        // toast.error(action.payload.message);
      });
  },
});

export default userSlice.reducer;
