import { AppBar, Button, Drawer, Stack } from "@mui/material";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Home from "../screens/Home";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { NavBarstyles } from "../styles/navbar";
import { useAppSelector } from "../redux/config";
import Cart from "../screens/Cart";
import Orders from "../screens/Orders";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
// import DrawerNavigation from "./drawer";

function NavBar() {
  const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  return (
    <>
      <BrowserRouter>
        <header>
          <AppBar sx={NavBarstyles.navBar} enableColorOnDark position="fixed">
            <nav>
              <Stack direction={"column-reverse"}>
                <Button
                  size="medium"
                  sx={{ justifyContent: "left" }}
                  onClick={() => setDrawerIsOpen(true)}
                  startIcon={<MenuIcon />}
                />
                <Drawer
                  open={drawerIsOpen}
                  onClose={() => setDrawerIsOpen(false)}
                >
                  <Stack direction="column" sx={NavBarstyles.menuStack}>
                    {/* <DrawerNavigation /> */}
                    <Link to="/">
                      <Button sx={NavBarstyles.menuBtns} variant="text">
                        Home
                      </Button>
                    </Link>
                    {isLoggedIn ? (
                      <>
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
                        <Link to="/cart">
                          <Button sx={NavBarstyles.menuBtns} variant="text">
                            Cart
                          </Button>
                        </Link>
                      </>
                    ) : null}
                  </Stack>
                </Drawer>

                <Stack sx={NavBarstyles.authStack}>
                  {!isLoggedIn ? (
                    <>
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
                    </>
                  ) : (
                    <Button size="small" variant="outlined">
                      Logout
                    </Button>
                  )}
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
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}
export default NavBar;
