import { GlobalProvider } from "./GlobalProvider";
import React, { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <GlobalProvider>{children}</GlobalProvider>;
}
