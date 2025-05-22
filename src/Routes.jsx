import React, { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";

// Pages List
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import CreateRepo from "./components/repo/CreateRepo";
import RepoDetail from "./components/repo/RepoDetail";
import UpdateRepo from "./components/repo/UpdateRepo";
// import IssueList from "./components/issue/IssueList";
// import CreateIssue from "./components/issue/CreateIssue";
// import EditIssue from "./components/issue/EditIssue";

// Auth Context
import { useAuth } from "./authContext";

const ProjectRoutes = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");

    if (userIdFromStorage && !currentUser) {
      setCurrentUser(userIdFromStorage);
    }

    if (
      !userIdFromStorage &&
      !["/auth", "/signup"].includes(window.location.pathname)
    ) {
      navigate("/auth");
    }

    if (userIdFromStorage && window.location.pathname == "/auth") {
      navigate("/");
    }
  }, [currentUser, navigate, setCurrentUser]);

  let element = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/auth",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/create",
      element: <CreateRepo />,
    },
    {
      path: "/repo/:id",
      element: <RepoDetail />,
    },
    {
      path: "/repo/update/:id",
      element: <UpdateRepo />,
    },
    {
        path: "/userProfile/:userId",
        element: <Profile />
      },
    // {
    //   path: "/repo/:id/issues",
    //   element: <IssueList />,
    // },
    // {
    //   path: "/issue/create/:id",
    //   element: <CreateIssue />,
    // },
    // {
    //   path: "/issue/edit/:id",
    //   element: <EditIssue />,
    // },
  ]);

  return element;
};

export default ProjectRoutes;
