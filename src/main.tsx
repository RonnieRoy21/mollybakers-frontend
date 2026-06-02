import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import NavBar from "./components/NavBar";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NavBar></NavBar>
  </StrictMode>,
);
