import React from "react";
import {
  GlobalContextType,
  mobileNavLinks,
  navLinks,
  userInfoType,
} from "../../../utils/constants/index";
import axios, { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../ReusableComponents/Button";

const Header = () => {
  const {
    isUserLoggedIn,
    user,
    setIsUserLoggedIn,
    setUser,
  }: GlobalContextType = useGlobalContext();
  const navigate = useNavigate();
  const [isFormSubmitting, setFormIsSubmitting] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState("");
  const [active, setActive] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toggle, setToggle] = useState(false);

  let token = "";

  if (typeof window !== "undefined") {
    token = localStorage.getItem("access_token") || "";
  }

  useEffect(() => {
    setIsLoading(true);
    const getCurrentUser = async () => {
      try {
        const { data, status } = await axios.post("/api/user/me", {
          token,
        });
        if (status === 200) {
          setUser({
            username: data.user.username,
            email: data.user.email,
            isAdmin: data.user.isAdmin,
            isVerified: data.user.isVerified,
            userId: data.user._id,
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
    };
    getCurrentUser();
  }, [isUserLoggedIn, setUser, setIsUserLoggedIn]);

  const handleLogout = async () => {
    setFormIsSubmitting(true);
    try {
      const { data, status } = await axios.get("/api/user/sign-out");
      if (status === 200) {
        toast.success(data.message);
        // Cookie.remove("resumify-token");
        localStorage.removeItem("resumify-token");
        navigate("/");
        setIsUserLoggedIn(false);
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.error || "An error occurred");
      } else {
        toast.error("An error occurred");
      }
      setIsUserLoggedIn(true);
    } finally {
      setFormIsSubmitting(false);
      setToggle(false);
    }
  };

  return (
    <div className="fixed left-0 top-0 z-50 mb-4 w-full border-b border-shades-4  backdrop-blur-2xl lg:mb-6 ">
      <nav className="flex-between px-5 py-4 lg:px-8 lg:py-3 xl:px-10 w-full">
        <Link to={"/"} className="flex-center" onClick={() => setActive("")}>
          <img
            src={"/assets/images/logo.svg"}
            alt=""
            width={50}
            height={50}
            className="object-contain"
          />
          <p className="logo_text">Resumify</p>
        </Link>
        <div className="lg:flex-center z-20 hidden gap-4 lg:flex lg:gap-8">
          {navLinks?.map((link) => (
            <Link
              to={link.url}
              key={link.id}
              className="relative mt-2 h-8"
              onMouseEnter={() => setIsMenuOpen(link.id)}
              onClick={() => setActive(link.id)}
              onMouseLeave={() => setIsMenuOpen("")}
            >
              <p
                className={`text-lg font-medium ${
                  active === link.id ? "text-primary-orange" : "text-shades-12"
                } hover:text-primary-orange`}
              >
                {link.title}
              </p>
              {link.subLinks &&
                link.subLinks.length > 0 &&
                isMenuOpen === link.id && (
                  <div
                    onMouseLeave={() => setIsMenuOpen("")}
                    className="flex-start absolute left-0 top-full z-10 w-60 flex-col gap-3 rounded-lg bg-white p-4 shadow-2xl shadow-shades-6"
                  >
                    {link.subLinks.map((subLink) => (
                      <Link
                        to={subLink.url}
                        key={subLink.id}
                        onClick={() => {
                          setIsMenuOpen("");
                          // setActive(subLink.id);
                        }}
                      >
                        <p
                          className={`text-[1rem] text-shades-12 hover:text-primary-orange`}
                        >
                          {subLink.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
            </Link>
          ))}
        </div>
        {!isUserLoggedIn ? (
          <div className="lg:flex-center hidden lg:flex lg:gap-4">
            <Link to={"/login"}>
              {!isLoading ? (
                <button type="button" className="black_btn">
                  Sign In
                </button>
              ) : (
                <div className="medium-loader" />
              )}
            </Link>
            <Link to={"/register"}>
              <button type="button" className="black_btn">
                Sign Up
              </button>
            </Link>
          </div>
        ) : (
          <div className="lg:flex-center hidden lg:flex lg:gap-4">
            <div>
              {!isLoading ? (
                <Link to={"/profile"}>
                  <button className="black_btn size-4 h-full rounded-full text-2xl ">
                    {String(user?.username).charAt(0).toUpperCase()}
                  </button>
                </Link>
              ) : (
                <div className="medium-loader" />
              )}
            </div>
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
          {isUserLoggedIn && (
            <div className="flex lg:hidden">
              {!isLoading ? (
                <Link to={"/profile"}>
                  <button className="black_btn size-4 h-full rounded-full text-2xl ">
                    {String(user?.username).charAt(0).toUpperCase()}
                  </button>
                </Link>
              ) : (
                <div className="medium-loader" />
              )}
            </div>
          )}
          <img
            src={toggle ? "/assets/icons/close.svg" : "/assets/icons/menu.svg"}
            alt=""
            width={35}
            height={35}
            className="object-contain transition-all duration-200 ease-linear lg:hidden "
            onClick={() => setToggle(!toggle)}
          />
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
            <Link to={"/sign-in"} onClick={() => setToggle(false)}>
              <button type="button" className="black_btn my-2">
                Sign In
              </button>
            </Link>
          )}
          {!isUserLoggedIn && (
            <Link to={"/sign-up"} onClick={() => setToggle(false)}>
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
