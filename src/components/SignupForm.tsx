import {
  Button,
  Stack,
  ButtonGroup,
  Container,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { SignUpStyles } from "../styles/signup";
import { useAppDispatch, useAppSelector } from "../redux/config";
import { showSnackBar } from "../redux/SnackBarStore";
import { signUp } from "../database/SupabaseLogic";

const useStyles = makeStyles({
  btnGroup: {
    gap: 20,
  },
});

function SignupForm() {
  const dispatch = useAppDispatch();
  const { isCreated, message, userId } = useAppSelector((state) => state.auth);
  const classes = useStyles();
  const [emailErr, setEmailErr] = useState(false);
  const [pswdErr, setPswdErr] = useState(false);
  const [confirmedPswdErr, setConfirmedPswdErr] = useState(false);

  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const [confirmedPswd, setConfirmedPswd] = useState("");

  const handleSubmit = async () => {
    setEmailErr(false);
    setPswdErr(false);
    setConfirmedPswdErr(false);
    if (
      email.trim() === "" ||
      pswd.trim() === "" ||
      confirmedPswd.trim() === ""
    ) {
      if (email.trim() == "") {
        setEmailErr(true);
      }
      if (pswd.trim() == "") {
        setPswdErr(true);
      }

      if (confirmedPswd.trim() == "") {
        setConfirmedPswdErr(true);
      }
    } else {
      const result = await dispatch(
        signUp({
          Email: email,
          Password: pswd,
        }),
      );

      if (signUp.fulfilled.match(result)) {
        dispatch(showSnackBar({ isOpen: true, message: message }));
        return;
      } else if (signUp.rejected.match(result)) {
        dispatch(showSnackBar({ isOpen: true, message: "Error:" + message }));
        return;
      }
    }
  };

  const handleClear = () => {
    setEmail("");
    setConfirmedPswd("");
    setPswd("");
    setEmailErr(false);
    setPswdErr(false);
    setConfirmedPswdErr(false);
  };

  return (
    <>
      <Container sx={SignUpStyles.container}>
        <form action="submit" onSubmit={(e) => e.preventDefault()}>
          <Stack spacing={2}>
            <TextField
              id="emailField"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailErr}
              label="Email"
            />
            <TextField
              id="pswdField"
              required
              type="text"
              value={pswd}
              onChange={(e) => setPswd(e.target.value)}
              error={pswdErr}
              label="Password"
            />
            <TextField
              id="confirmedPswdField"
              required
              type="text"
              value={confirmedPswd}
              onChange={(e) => setConfirmedPswd(e.target.value)}
              error={confirmedPswdErr}
              label="confirm password"
            />
            <ButtonGroup className={classes.btnGroup}>
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </>

              <Button variant="contained" color="error" onClick={handleClear}>
                Clear
              </Button>
            </ButtonGroup>
          </Stack>
        </form>
      </Container>
    </>
  );
}

export default SignupForm;
