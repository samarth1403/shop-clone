import axios, { HttpStatusCode } from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GrCart } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { apiUrls } from "../../../services/apiUrls/apiUrls";
import Logo from "../../../utils/assets/svg/logo.svg";
import close from "../../../utils/assets/icons/close.svg";
import menu from "../../../utils/assets/icons/menu.svg";

import {
  constants,
  GlobalContextType,
  mobileNavLinks,
  // navLinks,
  userInfoType,
} from "../../../utils/constants/index";
import Button from "../../ReusableComponents/Button";

const Header = () => {
  const {
    isUserLoggedIn,
    user,
    setIsUserLoggedIn,
    setUser,
    cart,
  }: GlobalContextType = useGlobalContext();
  const navigate = useNavigate();
  const [isFormSubmitting, setFormIsSubmitting] = useState<boolean>(false);
  // const [isMenuOpen, setIsMenuOpen] = useState("");
  const [active, setActive] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toggle, setToggle] = useState(false);

  let token = "";
  if (typeof window !== "undefined") {
    token =
      localStorage.getItem(constants.localStorageItems.access_token) || "";
  }

  // --- Getting User Profile ---

  const getCurrentUser = useCallback(async () => {
    try {
      const { data, status } = await axios.get(apiUrls.profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (status === HttpStatusCode.Ok) {
        setUser({
          name: data?.name,
          email: data?.email,
          role: data?.role,
          avatar: data?.avatar,
          id: data?.id,
        });
        setIsUserLoggedIn(true);
      }
    } catch (error: unknown) {
      console.log(error);
      setIsUserLoggedIn(false);
      setUser({} as userInfoType);
    } finally {
      setIsLoading(false);
    }
  }, [setIsUserLoggedIn, setUser, token]);

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  // --- Logout ---
  const handleLogout = async () => {
    setFormIsSubmitting(true);
    toast.success("Logout Successful");
    localStorage.removeItem(constants.localStorageItems.access_token);
    navigate(constants.routes.login);
    setIsUserLoggedIn(false);
    localStorage.clear();
    setFormIsSubmitting(false);
  };

  return (
    <div className="fixed left-0 top-0 z-50 mb-4 w-full border-b border-shades-4  backdrop-blur-2xl lg:mb-6 ">
      <nav className="flex-between px-5 py-4 lg:px-8 lg:py-3 xl:px-10 w-full ">
        <Link
          to={constants.routes.home}
          className="flex-center gap-4"
          onClick={() => setActive("")}
        >
          <img
            src={Logo}
            alt=""
            width={30}
            height={30}
            className="object-contain"
          />
          <p className="logo_text">Shopi</p>
        </Link>
        <div className="flex-center flex-row z-20 gap-6 flex">
          <Link
            to={constants.routes.orders}
            className=" justify-center items-center hidden lg:flex "
          >
            <span className="text-lg font-medium">My Orders</span>
          </Link>
          <Link
            to={constants.routes.cart}
            className="justify-center items-center flex relative"
          >
            <GrCart size={30} />
            {cart?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-[11px] w-6 h-6 flex flex-center text-white rounded-full p-1">
                {cart?.length}
              </span>
            )}
          </Link>
          {!isUserLoggedIn && (
            <Link to={constants.routes.login} className="hidden lg:flex">
              {!isLoading ? (
                <button type="button" className="black_btn">
                  Sign In
                </button>
              ) : (
                <div className="medium-loader" />
              )}
            </Link>
          )}
          {!isUserLoggedIn && (
            <Link to={constants.routes.register} className="hidden lg:flex">
              <button type="button" className="outline_btn">
                Sign Up
              </button>
            </Link>
          )}
          {!isLoading && isUserLoggedIn ? (
            <Link to={constants.routes.profile}>
              <button className="black_btn size-4 h-full rounded-full text-2xl ">
                {String(user?.name).charAt(0).toUpperCase()}
              </button>
            </Link>
          ) : isUserLoggedIn ? (
            <div className="medium-loader" />
          ) : null}
          {isUserLoggedIn && (
            <div className="lg:flex hidden">
              <Button
                isFormSubmitting={isFormSubmitting}
                className="outline_btn"
                onClick={() => handleLogout()}
              >
                {"Logout"}
              </Button>
            </div>
          )}

          <div className="flex-center gap-2  lg:hidden">
            <img
              src={toggle ? close : menu}
              alt=""
              width={35}
              height={35}
              className="object-contain transition-all duration-200 ease-linear lg:hidden "
              onClick={() => setToggle(!toggle)}
            />
          </div>
        </div>
      </nav>

      <nav
        className={`fixed inset-x-0 bottom-0 top-20 bg-white  ${
          toggle ? "flex" : "hidden"
        } h-screen w-full lg:hidden`}
      >
        <div className="relative z-10 m-auto flex h-screen w-full flex-col items-center justify-start gap-2 bg-white py-4 ">
          {mobileNavLinks?.map((link) => (
            <Link
              to={link.url || ""}
              key={link.id}
              className="relative mt-2 h-8"
              onClick={() => {
                setActive(link.id);
                setToggle(false);
              }}
            >
              <p
                className={`text-xl font-medium ${
                  active === link.id ? "text-primary-orange" : "text-shades-12"
                } hover:text-primary-orange`}
              >
                {link.title}
              </p>
            </Link>
          ))}
          {!isUserLoggedIn && (
            <Link to={constants.routes.login} onClick={() => setToggle(false)}>
              <button type="button" className="black_btn my-2">
                Sign In
              </button>
            </Link>
          )}
          {!isUserLoggedIn && (
            <Link
              to={constants.routes.register}
              onClick={() => setToggle(false)}
            >
              <button type="button" className="black_btn my-2">
                Sign Up
              </button>
            </Link>
          )}
          {isUserLoggedIn && (
            <Button
              isFormSubmitting={isFormSubmitting}
              className="outline_btn my-2"
              onClick={() => handleLogout()}
            >
              {"Logout"}
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
