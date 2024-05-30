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
        autoClose: 2000,
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
        autoClose: 2000,
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

export const authUser = createAsyncThunk("/user/auth", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/user/auth"); //여기에 토큰 데리고 온다.
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data || error.message);
  }
});

export const logoutUser = createAsyncThunk(
  "/user/logout",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/user/logout");
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const signOutUser = createAsyncThunk(
  "/user/signout",
  async (state, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(`/user/signout/${state}`);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

// createCCpage
export const createCircle = createAsyncThunk(
  "/circles/new",
  async (body, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/circles/new", body);
      console.log("thunkapi 모임생성");
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);
