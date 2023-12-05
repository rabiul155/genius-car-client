import Main from "../../Layout/Main";
import Checkout from "../../Pages/Checkout/Checkout";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Order from "../../Pages/Order/Order";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>
      },
      {
        path: '/services/:id',
        loader: ({ params }) => fetch(`https://67-genius-car-server.vercel.app/services/${params.id}`),
        element: <PrivateRoute><Checkout></Checkout></PrivateRoute>
      },
      {
        path: '/orders',
        element: <PrivateRoute><Order></Order></PrivateRoute>
      }
    ]
  }
]);

export default router;