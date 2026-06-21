import React from "react";
import ReactDOM from "react-dom/client";
import App from "../../components/App.tsx";
import { MantineProvider, Stack } from "@mantine/core";
import "@mantine/core/styles.css";
import theme from "./theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Stack style={{ width: "400px" }}>
        <App />
      </Stack>
    </MantineProvider>
  </React.StrictMode>,
);
