import { createContext, useContext } from "react";

interface BottomBarNavigationContextType {
  isNavHidden: boolean;
  setNavHidden: (hidden: boolean) => void;
  currentScrollY: number;
  setCurrentScrollY: (currentScrollY: number) => void;
}

export const BottomBarNavigationContext =
  createContext<BottomBarNavigationContextType>({
    isNavHidden: false,
    setNavHidden: () => {},
    currentScrollY: 0,
    setCurrentScrollY: () => {},
  });

export const useBottomBarNavigation = () =>
  useContext(BottomBarNavigationContext);
