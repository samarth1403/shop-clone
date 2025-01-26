import { ReactNode } from "react";
import { GlobalProvider } from "./GlobalProvider";

export function Providers({ children }: { children: ReactNode }) {
  return <GlobalProvider>{children}</GlobalProvider>;
}
