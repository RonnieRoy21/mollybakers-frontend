import type { SxProps, Theme } from "@mui/material/styles";

export class NavBarstyles {
  static navBar: SxProps<Theme> = {
    padding: 1,
    height: "fit-content",
  };
  static menuStack: SxProps<Theme> = {
    flexGrow: 1,
  };
  static authStack: SxProps<Theme> = {
    padding: 1,
  };
  static categoryBox: SxProps<Theme> = {
    width: 100,
    marginRight: 1,
  };
  static menuBtns: SxProps<Theme> = {
    width: "fit-content",
  };
}
