// stores/StoreProvider.js
"use client";
import { createContext, useContext } from "react";
import authStore from "./AuthStore";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  return (
    <StoreContext.Provider value={{ authStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);