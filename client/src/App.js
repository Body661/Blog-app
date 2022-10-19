import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Write from "./pages/Write";
import Single from "./pages/Single";
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import NotFound from "./pages/NotFound";
import "./style.scss"


import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Admin from "./pages/Admin";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/post/:id",
          element: <Single />,
        },
        {
          path: "/write",
          element: <Write />,
        },
        {
          path: "/admin",
          element: <Admin />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },

  ]);



  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
