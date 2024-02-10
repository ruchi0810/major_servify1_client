import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import User from "./components/getuser/User";
import Add from "./components/adduser/Add";
import Edit from "./components/updateuser/Edit";
import ServiceProviderList from "./components/serviceproviderlist/ServiceProviderList";
import Reviews from "./components/reviews/Reviews";

function App() {
  //aa route
  const route = createBrowserRouter([
    {
      path: "/",
      element: <User />,
    },
    {
      path: "/add",
      element: <Add />,
    },
    {
      path: "/edit/:id",
      element: <Edit />,
    },
    {
      path: "/serviceprovider",
      element: <ServiceProviderList />,
    },
    {
      path: "/reviews/:serviceProviderId", // Add a route for reviews
      element: <Reviews />,
    },
  ]);

  return (
    <div className="App">
      {/* aa route chhe */}
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
