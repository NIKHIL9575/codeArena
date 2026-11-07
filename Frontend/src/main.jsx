import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./App.css";

import AuthProvider from "./context/AuthProvider";
import { Provider } from "react-redux";
import { store } from "./Redux/store.js";


createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  <AuthProvider>
    <App />
  </AuthProvider>
</Provider>
);