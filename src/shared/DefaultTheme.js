import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const DefaultTheme = createTheme({
  palette: {
    secondary: red,
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: "none",
          color: "black",
          backgroundColor: "#fca311",
          fontWeight: 600,
          "&:hover": {
            backgroundColor: "white",
            color: "#fca311",
          },
        },
        outlined: {
          border: "solid 1px",
          color: "white",
          borderColor: "#fca311",
          "&:hover": {
            borderColor: "#fca311",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        sizeSmall: {
          lineHeight: "1 !important",
          letterSpacing: "0.00938em !important",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        sizeSmall: {
          lineHeight: "1.1876em !important",
          letterSpacing: "0.00938em !important",
          "& .MuiInputBase-input:not(.MuiInputBase-inputMultiline)": {
            paddingTop: `6.5px !important`,
            paddingBottom: "6.5px !important",
            height: "1.1876em !important",
          },
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        outlined: {
          color: "hsl(0, 0%, 20%)",
          fontSize: "0.88rem",
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        underlineHover: {
          "&:hover": {
            color: "#fca311",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        colorPrimary: {
          color: "#fca311",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#fca311",
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          borderColor: "#fca311",
          color: "#fca311",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#fca311 !important",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "#fca311",
        },
      },
    },
  },
});

export default DefaultTheme;
