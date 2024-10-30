import { createBrowserRouter, Navigate, useParams } from "react-router-dom";
import App from "../App";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import CreateForm from "../pages/CreateForm";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import { RouterProvider } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function index() {
  let { user } = useContext(AuthContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: user ? <Home /> : <Navigate to={`/sign-in`} />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/create-form",
          element: user ? <CreateForm /> : <Navigate to={`/sign-in`} />,
        },
        {
          path: "/edit-form/:id",
          element: user ? <CreateForm /> : <Navigate to={`/sign-in`} />,
        },
        {
          path: "/sign-up",
          element: !user ? <SignUp /> : <Navigate to={`/`} />,
        },
        {
          path: "/sign-in",
          element: !user ? <SignIn /> : <Navigate to={`/`} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
