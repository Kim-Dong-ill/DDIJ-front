import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const ButtonYe = styled(Button)({
  color: "#FBFBFB",
  variant: "contained",
  borderRadius: "500px",
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  // padding: "6px 50px",
  width: "100px",
  height: "33px",
  // border: "1px solid",
  // lineHeight: 1.5,
  backgroundColor: "#FFBC11",
  // borderColor: "#0063cc",
  fontFamily: ["jua"].join(","),
  "&:hover": {
    backgroundColor: "#e9a701",
    // borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#e9a701",
    borderColor: "#e9a701",
  },
  "&:focus": {
    // boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

export default ButtonYe;
