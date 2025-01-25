import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const Layout = () => {
  return (
    <>
      <div className="main">
        <div className="gradient" />
      </div>
      <main className="app">
        <Header />
        <Toaster />
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
