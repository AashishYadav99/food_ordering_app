import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./Store/store.js";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
} from "react-router-dom";
import App from "./App.jsx";
import FoodList from "./components/FoodList";
import Cart from "./components/Cart";
import "./index.css";

// Define your routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <FoodList /> }
    ],
  },
  {
    path:"/cart",
    element: <Cart />

  }
]);

// Render your application with the RouterProvider
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);

