import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { StyleProvider } from "@ant-design/cssinjs";
import "./index.css";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { ConfigProvider } from "antd";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <StyleProvider layer>
        <ConfigProvider
          theme={{
            token: {
              // colorPrimary: "#282828",
              // colorInfo: "#282828",
              borderRadius: 16,
            },
            components: {
              Rate: {
                fontSize: 14,
              },
              Table: {
                // headerBg: "#f0f0f0",
                // headerColor: "#000000",
              },
            },
          }}
        >
          <RouterProvider router={router} />
        </ConfigProvider>
      </StyleProvider>
    </StrictMode>
  );
}
