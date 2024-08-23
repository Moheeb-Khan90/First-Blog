import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../Pages/Home";
import { Login, Signin, AuthLayout} from "../components/index";
import AddPost from "../Pages/AddPost";
import AllPost from "../Pages/AllPost";
import Post from "../Pages/Post";
import Edit from "../Pages/Edit";

const PageRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <AuthLayout authentication={true}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: <Signin />,
      },
      {
        path: "/home",
        element: (
          <AuthLayout authentication>
            <Home />
          </AuthLayout>
        ),
      },
      {
        // /add-post
        path: "/add-posts",
        element: (
          <AuthLayout authentication>
            {" "}
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        // /add-post
        path: "/all-posts",
        element: (
          <AuthLayout authentication>
            {" "}
            < AllPost/>
          </AuthLayout>
        ),
      },
      {
        // /add-post
        path: "/posts/:slug",
        element: (
          <AuthLayout authentication>
            {" "}
            < Post/>
          </AuthLayout>
        ),
      },
      {
        // /add-post
        path: "/edit/:slug",
        element: (
          <AuthLayout authentication>
            {" "}
            < Edit/>
          </AuthLayout>
        ),
      },
    ],
  },
]);

export default PageRoutes;
