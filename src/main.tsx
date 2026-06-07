import { Provider } from "react-redux";
import { store } from "./redux/config";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CustomSnackBar from "./components/SnackBar";
import App from "./components/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <CustomSnackBar />
    </Provider>
  </StrictMode>,
);
