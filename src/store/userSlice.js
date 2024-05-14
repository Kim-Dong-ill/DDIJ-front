import { createSlice } from "@reduxjs/toolkit";

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
  reducers: {},
  //   extraReducers: (builder) => {
  //     builder.addCase().addCase().addCase();
  //   },
});

export default userSlice.reducer;
