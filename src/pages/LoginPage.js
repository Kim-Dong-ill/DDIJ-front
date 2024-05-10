import React from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
// import { Button } from "@mui/material";
import ButtonYe from "../components/ButtonYe";
import { NavLink } from "react-router-dom";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#FFBC11",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#FFBC11",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E0E3E7",
    },
    "&:hover fieldset": {
      borderColor: "#e9a701",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#FFBC11",
    },
  },
});

// const BootstrapButton = styled(Button)({
//   variant: "contained",
//   borderRadius: "500px",
//   boxShadow: "none",
//   textTransform: "none",
//   fontSize: 16,
//   padding: "6px 50px",
//   // border: "1px solid",
//   // lineHeight: 1.5,
//   backgroundColor: "#FFBC11",
//   // borderColor: "#0063cc",
//   fontFamily: ["jua"].join(","),
//   "&:hover": {
//     backgroundColor: "#e9a701",
//     // borderColor: "#0062cc",
//     boxShadow: "none",
//   },
//   "&:active": {
//     boxShadow: "none",
//     backgroundColor: "#e9a701",
//     borderColor: "#e9a701",
//   },
//   "&:focus": {
//     // boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
//   },
// });

function LoginPage() {
  return (
    <div className="bg-white h-[100vh] flex flex-col items-center">
      <div>
        <img src="./images/intro_logo_wh.svg" alt="" />
      </div>
      <div className="bg-ye-200 w-[80%]">
        <form>
          <div className="flex flex-col">
            <CssTextField
              fullWidth
              color="secondary"
              id="outlined-basic"
              type="text"
              label="E-mail"
            />
            <CssTextField
              fullWidth
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
          </div>
          <div>
            <ButtonYe>로그인</ButtonYe>
          </div>
        </form>
      </div>
      <div>
        <div>Don't have an account?</div>
        <span className="text-ye-600">
          <NavLink>Create Account</NavLink>
        </span>
      </div>
    </div>
  );
}

export default LoginPage;
