import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import store from "./store/store";
import { Provider } from "react-redux";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error("Element with ID 'root' not found!");
}
