import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Layout from "./components/LayoutComponents/Layout/Layout";
import { Home, Login, Register } from "./components/SubComponents";
import Cart from "./components/SubComponents/Cart/Cart";
import ProductDetails from "./components/SubComponents/Home/ProductDetails";
import OrderPlaced from "./components/SubComponents/OrderPlaced/OrderPlaced";
import Orders from "./components/SubComponents/Orders/Orders";
import Products from "./components/SubComponents/Products/Products";
import { Providers } from "./context/Provider";
import { constants } from "./utils/constants";
import PrivateRoute from "./utils/routing/PrivateRoute";
import Profile from "./components/SubComponents/Profile/Profile";

axios.defaults.baseURL = "https://api.escuelajs.co/api/v1";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <Providers>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path={constants.routes.login} element={<Login />} />
              <Route path={constants.routes.register} element={<Register />} />
              <Route
                path={constants.routes.cart}
                element={
                  <PrivateRoute>
                    <Cart />
                  </PrivateRoute>
                }
              />
              <Route path={`${constants.routes.products}`} element={<Outlet />}>
                <Route index element={<Products />} />
                <Route
                  path={constants.routes.productDetails}
                  element={<ProductDetails />}
                />
              </Route>
              <Route
                path={`${constants.routes.orderPlaced}`}
                element={
                  <PrivateRoute>
                    <OrderPlaced />
                  </PrivateRoute>
                }
              />
              <Route
                path={constants.routes.orders}
                element={
                  <PrivateRoute>
                    <Orders />
                  </PrivateRoute>
                }
              />
              <Route
                path={constants.routes.profile}
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </Providers>
  );
};

export default App;
