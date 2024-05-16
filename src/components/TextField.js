import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const TextFieldLine = styled(TextField)({
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

export default TextFieldLine;
