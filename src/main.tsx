import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./utils/styles/global.css";

createRoot(document.getElementById("root")!).render(<App />);
