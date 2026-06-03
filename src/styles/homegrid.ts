import type { SxProps, Theme } from "@mui/material/styles";

class HomeGridStyles {
  static grid: SxProps<Theme> = {
    backgroundColor: "burlywood",
    padding: 0.1,
    paddingTop: 1,
    width: "fit-content",
  };
  static mainstack: SxProps<Theme> = {
    backgroundColor: "grey",
    padding: 1,
    marginTop: 8,
  };
  static filterStack: SxProps<Theme> = {
    position: "sticky",
    top: 60,
    backgroundColor: "skyblue",
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
