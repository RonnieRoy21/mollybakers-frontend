import { Button, Container, Stack, TextField } from "@mui/material";
import { LoginFormstyles } from "../styles/loginform";
import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/config";
import { signIn } from "../database/SupabaseLogic";
import { showSnackBar } from "../redux/SnackBarStore";
import { useNavigate } from "react-router-dom";
function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { message } = useAppSelector((state) => state.auth);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [emailErr, setEmailErr] = useState<boolean>(false);
  const [passwordErr, setPasswordErr] = useState<boolean>(false);

  const handleSubmit = async () => {
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

    const r = await dispatch(
      signIn({
        Email: loginEmail,
        Password: loginPassword,
      }),
    );

    if (signIn.pending.match(r)) {
      dispatch(showSnackBar({ isOpen: true, message: message }));
    }
    if (signIn.fulfilled.match(r)) {
      dispatch(showSnackBar({ isOpen: true, message: message }));
      navigate("/");
    }

    if (signIn.rejected.match(r)) {
      dispatch(showSnackBar({ isOpen: true, message: message }));
    }
  };

  return (
    <>
      <Container>
        <form action="submit" onSubmit={(e) => e.preventDefault()}>
          <Stack spacing={2} sx={LoginFormstyles.container}>
            <TextField
              sx={{ width: "100%", backgroundColor: "whitesmoke" }}
              required
              value={loginEmail}
              label="Email"
              type="email"
              error={emailErr}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <TextField
              sx={{ width: "100%", backgroundColor: "whitesmoke" }}
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
            <Button
              sx={{
                width: "100%",
                height: "fit-content",
              }}
              endIcon={<GoogleIcon />}
              variant="contained"
            >
              Continue with
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
}

export default LoginForm;
