import type { SxProps, Theme } from "@mui/material/styles";

export class NavBarstyles {
  static navBar: SxProps<Theme> = {
    height: "fit-content",
    backgroundColor: "lightskyblue",
  };
  static menuStack: SxProps<Theme> = {
    flexGrow: 1,
  };
  static authStack: SxProps<Theme> = {
    flexDirection: "row-reverse",
    marginRight: 1,
  };
  static categoryBox: SxProps<Theme> = {
    width: 100,
    height: "fit-content",
    marginRight: 1,
  };
  static menuBtns: SxProps<Theme> = {
    width: "fit-content",
    marginRight: 1,
  };
}
