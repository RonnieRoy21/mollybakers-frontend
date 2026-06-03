import type { SxProps, Theme } from "@mui/material/styles";

class HomeGridStyles {
  static grid: SxProps<Theme> = {
    backgroundColor: "burlywood",
    padding: 2,
    marginTop: 15,
    width: "fit-content",
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
