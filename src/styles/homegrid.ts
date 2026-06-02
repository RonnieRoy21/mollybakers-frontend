import type { SxProps, Theme } from "@mui/material/styles";

class HomeGridStyles {
  static grid: SxProps<Theme> = {
    backgroundColor: "burlywood",
    padding: 2,
    marginTop: 15,
    width: "fill",
  };
  static card: SxProps<Theme> = {
    width: 150,
    height: "fit-content",
    padding: 1,
    borderRadius: 5,
  };

  static cardActions: SxProps<Theme> = {
    flexGrow: 1,
  };
  static isNotLiked: SxProps<Theme> = {
    color: "white",
  };
}

export default HomeGridStyles;
