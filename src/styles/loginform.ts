import type { SxProps, Theme } from "@mui/material/styles";

export class LoginFormstyles {
  static container: SxProps<Theme> = {
    marginTop: 15,
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: "10%",
    paddingRight: "10%",
    backgroundColor: "burlywood",
  };
  static loginbtn: SxProps<Theme> = {
    width: "100%",
    alignSelf: "center",
    backgroundColor: "greenyellow",
  };
}
