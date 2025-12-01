import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        // style: {
        //   fontSize: "6rem",
        //   fontWeight: 700,
        //   width: "auto",
        //   maxWidth: "none",
        //   whiteSpace: "nowrap",
        //   padding: "4rem",
        // },
        success: {
          style: {
            background: "#22c55e",
            color: "white",
          },
          iconTheme: {
            primary: "white",
            secondary: "#16a34a",
          },
        },
        error: {
          style: { background: "red", color: "white" },
          iconTheme: {
            primary: "white",
            secondary: "#b91c1c",
          },
        },
      }}
    />
  </StrictMode>
);
