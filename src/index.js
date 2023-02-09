import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import App from "./App";
import { MantineProvider } from "@mantine/core";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MantineProvider
      theme={{
        colorScheme: "dark",
        colors: {
          dark: [
            "#transparent",
            "#transparent",
            "#transparent",
            "#transparent",
            "#transparent",
            "#transparent",
            "#transparent",
            "rgba(83, 80, 74, 0.5)",
            "#transparent",
            "#transparent",
          ],
        },
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <App />
    </MantineProvider>
  </React.StrictMode>
);
