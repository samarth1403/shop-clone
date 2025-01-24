import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { Providers } from "../../../context/Provider";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Layout = () => {
  return (
    <Providers>
      <Header />
      <Toaster />
      <Outlet />
      <Footer />
    </Providers>
  );
};

export default Layout;
