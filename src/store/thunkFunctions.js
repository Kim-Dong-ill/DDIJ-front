import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";
import { toast } from "react-toastify";

export const loginUser = createAsyncThunk(
  "/user/login",
  async ({ body, handleLoginError }, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/user/login", body);
      console.log("로그인 성공", res.data);

      toast.success(`😸😸 ${res.data.message} 😸😸`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return res.data;
    } catch (error) {
      console.log("로그인 실패", error);

      toast.error(`🤷‍♂️🤷‍♂️🤷‍♂️ 로그인실패`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      const logErr = thunkAPI.rejectWithValue(
        error.response.data || error.message
      ).payload.message;

      console.log(logErr);
      if (handleLoginError) {
        handleLoginError(logErr);
      }
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);
