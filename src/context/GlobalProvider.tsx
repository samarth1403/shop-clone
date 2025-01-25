import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  constants,
  GlobalContextType,
  initialGlobalContext,
  initialUserInfo,
  OrderInfoType,
  ProductInfoType,
  userInfoType,
} from "../utils/constants";
import { jwtDecode } from "jwt-decode";

const GlobalContext = createContext<GlobalContextType>(initialGlobalContext);

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [user, setUser] = useState<userInfoType>(initialUserInfo);
  const [cart, setCart] = useState<ProductInfoType[]>([]);
  const [orders, setOrders] = useState<OrderInfoType[]>([]);

  const verifyToken = useCallback(async () => {
    setAuthLoading(true);
    try {
      const accessToken = localStorage.getItem(
        constants.localStorageItems.access_token
      );
      if (accessToken) {
        const decodedToken = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000;
        if (decodedToken?.exp && decodedToken?.exp < currentTime) {
          localStorage.removeItem(constants.localStorageItems.access_token);
          setIsUserLoggedIn(false);
        } else {
          setIsUserLoggedIn(true);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

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

  useEffect(() => {
    const orders = localStorage.getItem(constants.localStorageItems.orders);
    if (orders !== "undefined" && orders !== null) {
      setOrders(JSON.parse(orders) as OrderInfoType[]);
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
        orders,
        setOrders,
        authLoading,
        setAuthLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
