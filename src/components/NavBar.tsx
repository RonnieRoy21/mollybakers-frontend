import { AppBar, Button, Stack } from "@mui/material";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Home from "../screens/Home";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { NavBarstyles } from "../styles/navbar";

function NavBar() {
  return (
    <>
      <BrowserRouter>
        <header>
          <AppBar sx={NavBarstyles.navBar} enableColorOnDark position="fixed">
            <nav>
              <Stack direction={"column-reverse"}>
                <Stack direction="row" sx={NavBarstyles.menuStack}>
                  <Link to="/">
                    <Button sx={NavBarstyles.menuBtns} variant="text">
                      Home
                    </Button>
                  </Link>
                  <Link to="/orders">
                    <Button sx={NavBarstyles.menuBtns} variant="text">
                      Orders
                    </Button>
                  </Link>
                  <Link to="/offers">
                    <Button sx={NavBarstyles.menuBtns} variant="text">
                      Offers
                    </Button>
                  </Link>
                </Stack>
                <Stack sx={NavBarstyles.authStack} direction={"row-reverse"}>
                  <Link to="/login">
                    <Button size="small" variant="contained">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signUp">
                    <Button size="small" variant="outlined">
                      Sign Up
                    </Button>
                  </Link>
                </Stack>
              </Stack>
            </nav>
          </AppBar>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signUp" element={<SignupForm />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}
export default NavBar;
