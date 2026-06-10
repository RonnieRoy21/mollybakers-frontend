import type { SxProps, Theme } from "@mui/material/styles";

class HomeGridStyles {
  static texts: SxProps<Theme> = {
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 19,
    },
  };
  static filterStack: SxProps<Theme> = {
    position: "sticky",
    width: "100%",
    height: "fit-content",
    top: window.innerWidth > 600 ? "1%" : "12%",
    opacity: 1,
    zIndex: 10,
    backgroundColor: "burlywood",
  };
  static card: SxProps<Theme> = {
    width: {
      xs: 150,
      sm: 160,
      md: 170,
      lg: 180,
      xl: 200,
    },
    height: "fit-content",
    borderRadius: 2,
    padding: 0.5,
  };

  static cardActionStack: SxProps<Theme> = {
    flexGrow: 1,
  };
  static isNotLiked: SxProps<Theme> = {
    color: "white",
  };
}

export default HomeGridStyles;
