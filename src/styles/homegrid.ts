import type { SxProps, Theme } from "@mui/material/styles";

class HomeGridStyles {
  static grid: SxProps<Theme> = {
    padding: 0.1,
    marginTop: 1,
    height: "100%",
    width: "100%",
  };
  static mainstack: SxProps<Theme> = {
    backgroundColor: "darkgray",
    padding: 1,
    marginTop: 8,
    opacity: 1,
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
    width: 130,
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
