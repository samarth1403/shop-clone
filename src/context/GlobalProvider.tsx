import React from "react";
import {
  GlobalContextType,
  initialGlobalContext,
  initialUserInfo,
  userInfoType,
} from "../utils/constants";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const GlobalContext = createContext<GlobalContextType>(initialGlobalContext);

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<userInfoType>(initialUserInfo);

  return (
    <GlobalContext.Provider
      value={{
        isUserLoggedIn,
        setIsUserLoggedIn,
        user,
        setUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
