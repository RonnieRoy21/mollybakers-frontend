import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";

import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/config";

const BottomNav = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const location = useLocation();

  return (
    <Paper
      elevation={3}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <BottomNavigation
        value={location.pathname}
        onChange={(_, newValue) => {
          navigate(newValue);
        }}
      >
        <BottomNavigationAction
          showLabel
          label="Home"
          value="/"
          icon={<HomeIcon />}
        />

        {isLoggedIn ? (
          <BottomNavigationAction
            showLabel
            label="Cart"
            value="/cart"
            icon={<InfoIcon />}
          />
        ) : null}
        {isLoggedIn ? (
          <BottomNavigationAction
            showLabel
            label="Orders"
            value="/orders"
            icon={<ContactMailIcon />}
          />
        ) : null}

        {!isLoggedIn ? (
          <BottomNavigationAction
            showLabel
            label="SignUp"
            value="/signUp"
            icon={<InfoIcon />}
          />
        ) : null}

        {!isLoggedIn ? (
          <BottomNavigationAction
            showLabel
            label="Login"
            value="/login"
            icon={<ContactMailIcon />}
          />
        ) : null}
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
