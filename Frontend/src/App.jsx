import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './components/Home';
import Profile from "./components/Profile";
import Editprofile from "./components/Editprofile";
import Submissions from "./components/Submissions";
import Problems from "./components/Problems";
import Leaderboard from "./components/Leaderboard";
import Problem from "./components/Problem";
import Login from "./components/Login";
import Layout from './components/Layout';
import Submission from './components/Submission';
import ProtectedRoute from './components/ProtectedRoute';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "problems",
        element: <Problems />,
      },
      {
        path: "problems/:id/:index",
        element: <Problem />,
      },
      {
        path: "leaderboard",
        element: <Leaderboard />,
      },

      // Protected routes
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path:"profile/:id",
            element:<Profile/>,
          },
          {
            path: "profile/edit",
            element: <Editprofile />,
          },
          {
            path: "submissions",
            element: <Submissions />,
          },
          {
            path: "problems/:id/submission",
            element: <Submission />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  

  return (
    
    <>
    <ToastContainer position="top-right" autoClose={3000} />
     <RouterProvider router={router} />
    </>

  
  )
}

export default App
