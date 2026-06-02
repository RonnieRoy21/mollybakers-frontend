import type { SxProps, Theme } from "@mui/material/styles";

export class LoginFormstyles {
  static container: SxProps<Theme> = {
    marginTop: 15,
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: "20%",
    paddingRight: "20%",
    backgroundColor: "burlywood",
  };
  static loginbtn: SxProps<Theme> = {
    width: "fit-content",
    alignSelf: "center",
    backgroundColor: "greenyellow",
  };
}
