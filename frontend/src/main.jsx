import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./router/index";
import { AuthContextProvider } from "./contexts/AuthContext";
createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <Router />
  </AuthContextProvider>
);
