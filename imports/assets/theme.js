import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    primary: {
      main: "#00838F"
    },
    secondary: {
      main: "#1DE9B6"
    },
    custom: {
      error: "#FFFF00",
      success: "#d1e37f",
      text: "#94d6d6"
    }
  },
  overrides: {
    MuiInput: {
      underline: {
        "&:before": {
          borderBottom: `2px solid #1DE9B6`
        },
        "&:hover:not($disabled):before": {
          borderBottom: `2px solid #00838F`
        }
      }
    }
  }
});
