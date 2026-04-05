import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { useGameStore } from "./game/store";
import "./styles/index.css";

useGameStore.getState().hydrate();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
