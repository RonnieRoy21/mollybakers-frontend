import { AppBar, Button, MenuItem, Stack, TextField } from "@mui/material";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Home from "../screens/Home";
import SignupForm from "./SignupForm";
import { useState } from "react";
import LoginForm from "./LoginForm";
import { NavBarstyles } from "../styles/navbar";

function NavBar() {
  const categoryList: string[] = [
    "cakes",
    "bread",
    "muffins",
    "asian",
    "custom",
  ];
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const c = e.target.value;
    setSelectedCategory(c);
    console.log(c);
  };

  return (
    <>
      <BrowserRouter>
        <header>
          <AppBar
            sx={NavBarstyles.navBar}
            color="default"
            enableColorOnDark
            position="fixed"
          >
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
                  <TextField
                    label="Filter"
                    sx={NavBarstyles.categoryBox}
                    select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                  >
                    {categoryList.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField variant="filled" label="Search..." size="small" />
                </Stack>
                <Stack spacing={0.3} direction="row-reverse">
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
