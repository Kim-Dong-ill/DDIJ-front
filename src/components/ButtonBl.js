import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const ButtonBl = styled(Button)({
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
  backgroundColor: "#444444",
  // borderColor: "#0063cc",
  fontFamily: ["jua"].join(","),
  "&:hover": {
    backgroundColor: "#222222",
    // borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#222222",
    borderColor: "#222222",
  },
  "&:focus": {
    // boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

export default ButtonBl;
