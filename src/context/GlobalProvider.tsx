import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  constants,
  GlobalContextType,
  initialGlobalContext,
  initialUserInfo,
  ProductInfoType,
  userInfoType,
} from "../utils/constants";

const GlobalContext = createContext<GlobalContextType>(initialGlobalContext);

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<userInfoType>(initialUserInfo);
  const [cart, setCart] = useState<ProductInfoType[]>([]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
      setIsUserLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const cart = localStorage.getItem(constants.localStorageItems.cart);
    if (cart !== "undefined" && cart !== null) {
      setCart(JSON.parse(cart) as ProductInfoType[]);
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isUserLoggedIn,
        setIsUserLoggedIn,
        user,
        setUser,
        cart,
        setCart,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
