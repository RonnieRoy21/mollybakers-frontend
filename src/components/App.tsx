import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNav from "./NavBar";
import Home from "../screens/Home";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Orders from "../screens/Orders";
import Cart from "../screens/Cart";

function App() {
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
