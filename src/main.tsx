import { Provider } from "react-redux";
import { store } from "./redux/config";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import NavBar from "./components/NavBar";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <NavBar></NavBar>
    </Provider>
  </StrictMode>,
);
