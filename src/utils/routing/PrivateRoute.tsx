import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalProvider";
import { constants } from "../constants";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isUserLoggedIn, authLoading } = useGlobalContext();
  console.log("IS USER LOGGED IN PRIVATE ROUTE", isUserLoggedIn);
  if (authLoading) {
    return <div>Loading...</div>;
  }
  return isUserLoggedIn ? (
    <>{children}</>
  ) : (
    <Navigate to={constants.routes.login} />
  );
};

export default PrivateRoute;
