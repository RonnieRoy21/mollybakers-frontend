import { Button, Container, Stack, TextField } from "@mui/material";
import { LoginFormstyles } from "../styles/loginform";
import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";
//import { useAppDispatch } from "../redux/config";
function LoginForm() {
  //const dispatch = useAppDispatch();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [emailErr, setEmailErr] = useState<boolean>(false);
  const [passwordErr, setPasswordErr] = useState<boolean>(false);

  const handleSubmit = () => {
    setEmailErr(false);
    setPasswordErr(false);
    if (loginPassword.toString().trim() === "") {
      setPasswordErr(true);
      return;
    }
    if (loginEmail.toString().trim() === "") {
      setEmailErr(true);
      return;
    }
    console.log(loginEmail);
    console.log(loginPassword);
  };

  return (
    <>
      <Container>
        <form action="submit" onSubmit={(e) => e.preventDefault()}>
          <Stack spacing={2} sx={LoginFormstyles.container}>
            <TextField
              required
              helperText="Eg. name@domain.com"
              value={loginEmail}
              label="Email"
              type="email"
              error={emailErr}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <TextField
              required
              value={loginPassword}
              label="Password"
              type="text"
              error={passwordErr}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <Button
              type="submit"
              sx={LoginFormstyles.loginbtn}
              variant="outlined"
              onClick={handleSubmit}
            >
              Login
            </Button>
            <Button startIcon={<GoogleIcon />} variant="contained">
              Continue with Google
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
}

export default LoginForm;
