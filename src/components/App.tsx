import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNav from "./NavBar";
import Home from "../screens/Home";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Orders from "../screens/Orders";
import Cart from "../screens/Cart";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/config";
import { getSession } from "../database/SupabaseLogic";
import { showSnackBar } from "../redux/SnackBarStore";
function App() {
  const dispatch = useAppDispatch();
  const { message } = useAppSelector((state) => state.auth);
  const handleRestoreSession = async () => {
    const r = await dispatch(getSession());

    if (getSession.rejected.match(r)) {
      dispatch(
        showSnackBar({
          isOpen: true,
          message: message,
        }),
      );
      return false;
    }
    if (getSession.fulfilled.match(r)) {
      dispatch(
        showSnackBar({
          isOpen: true,
          message: message,
        }),
      );
      return true;
    }
  };

  useEffect(() => {
    dispatch(handleRestoreSession);
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <BottomNav />
    </BrowserRouter>
  );
}

export default App;
