import { useState } from "react";
import { BottomBarNavigationContext } from "./context";

export const BottomBarNavigationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isNavHidden, setNavHidden] = useState(false);
  const [currentScrollY, setCurrentScrollY] = useState(0);

  const value = {
    isNavHidden,
    setNavHidden,
    currentScrollY,
    setCurrentScrollY,
  };

  return (
    <BottomBarNavigationContext.Provider value={value}>
      {children}
    </BottomBarNavigationContext.Provider>
  );
};
