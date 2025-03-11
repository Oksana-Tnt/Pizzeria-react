import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";

import { ToastContainer } from "react-toastify";
import {
  AppWrapperOrder,
  AppWrapperSearch,
} from "./components/context/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppWrapperOrder>
      <AppWrapperSearch>
        <App />
      </AppWrapperSearch>
    </AppWrapperOrder>
    <ToastContainer />
  </StrictMode>
);
