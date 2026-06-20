import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNav from "./NavBar";
import Home from "../screens/Home";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Orders from "../screens/Orders";
import Cart from "../screens/Cart";
import { useEffect } from "react";
import { useAppDispatch } from "../redux/config";
import { getSession } from "../database/SupabaseLogic";
import { showSnackBar } from "../redux/SnackBarStore";
function App() {
  const dispatch = useAppDispatch();
  const handleRestoreSession = async () => {
    const r = await dispatch(getSession());

    if (getSession.fulfilled.match(r)) {
      return dispatch(
        showSnackBar({
          isOpen: true,
          message: r.payload.msg,
        }),
      );
    }
    if (getSession.rejected.match(r)) {
      return dispatch(
        showSnackBar({
          isOpen: true,
          message: (r.payload as string) ?? "Error.",
        }),
      );
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
        <Route path="/logout" element={null} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <BottomNav />
    </BrowserRouter>
  );
}

export default App;
