import {
  Button,
  Stack,
  ButtonGroup,
  Container,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/config";
import { showSnackBar } from "../redux/SnackBarStore";
import { signUp } from "../database/SupabaseLogic";

function SignupForm() {
  const dispatch = useAppDispatch();
  const message = useAppSelector((state) => state.auth.message);
  const [emailErr, setEmailErr] = useState(false);
  const [pswdErr, setPswdErr] = useState(false);
  const [confirmedPswdErr, setConfirmedPswdErr] = useState(false);
  const [locErr, setLocErr] = useState(false);
  const [numErr, setPhoneNumErr] = useState(false);

  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const [confirmedPswd, setConfirmedPswd] = useState("");
  const [loc, setLoc] = useState("");
  const [num, setPhoneNum] = useState("");

  const handleSubmit = async () => {
    setEmailErr(false);
    setPswdErr(false);
    setConfirmedPswdErr(false);
    setLocErr(false);
    setPhoneNumErr(false);
    if (
      email.trim() === "" ||
      pswd.trim() === "" ||
      confirmedPswd.trim() === "" ||
      loc.trim() === "" ||
      num.trim() === ""
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
      if (num.trim() == "") {
        setPhoneNumErr(true);
      }
      if (loc.trim() == "") {
        setLocErr(true);
      }
    } else {
      const r = await dispatch(
        signUp({
          Email: email,
          Password: pswd,
          loc: loc,
          phone: num,
        }),
      );

      if (signUp.pending.match(r)) {
        dispatch(
          showSnackBar({
            isOpen: true,
            message: message,
          }),
        );
      }
      if (signUp.fulfilled.match(r)) {
        dispatch(showSnackBar({ isOpen: true, message: message }));
      }
      if (signUp.rejected.match(r)) {
        dispatch(showSnackBar({ isOpen: true, message: "Error:" + message }));
      }
    }
  };

  const handleClear = () => {
    setEmail("");
    setConfirmedPswd("");
    setPswd("");
    setLoc("");
    setPhoneNum("");

    setEmailErr(false);
    setPswdErr(false);
    setConfirmedPswdErr(false);
    setLocErr(false);
    setPhoneNumErr(false);
  };

  return (
    <>
      <Container
        sx={{
          paddingBottom: 5,
          paddingTop: 5,
          paddingLeft: "10%",
          paddingRight: "10%",
          backgroundColor: "burlywood",
        }}
      >
        <form action="submit" onSubmit={(e) => e.preventDefault()}>
          <Stack spacing={2}>
            <TextField
              sx={{
                width: "100%",
                backgroundColor: "whitesmoke",
              }}
              id="emailField"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailErr}
              label="Email"
            />
            <TextField
              sx={{
                width: "100%",
                backgroundColor: "whitesmoke",
              }}
              id="pswdField"
              required
              type="text"
              value={pswd}
              onChange={(e) => setPswd(e.target.value)}
              error={pswdErr}
              label="Password"
            />
            <TextField
              sx={{
                width: "100%",
                backgroundColor: "whitesmoke",
              }}
              id="confirmedPswdField"
              required
              type="text"
              value={confirmedPswd}
              onChange={(e) => setConfirmedPswd(e.target.value)}
              error={confirmedPswdErr}
              label="confirm password"
            />
            <TextField
              sx={{
                width: "100%",
                backgroundColor: "whitesmoke",
              }}
              id="location"
              required
              type="text"
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
              error={locErr}
              label="Add Pick Up Station"
            />
            <TextField
              sx={{
                width: "100%",
                backgroundColor: "whitesmoke",
              }}
              id="phoneNumber"
              required
              type="text"
              value={num}
              onChange={(e) => setPhoneNum(e.target.value)}
              error={numErr}
              label="Contact number"
            />
            <ButtonGroup
              sx={{
                alignContent: "space-between",
              }}
            >
              <>
                <Button
                  sx={{
                    marginRight: 5,
                  }}
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
