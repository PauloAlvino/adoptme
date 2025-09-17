import { createContext } from "react";
import useAuth from "../hooks/useAuth";
const Context = createContext();

function UserProvider({ children }) {
  const { register, login, auth, logout} = useAuth();
  return (
    <Context.Provider value={{ register, login, auth, logout }}>{children}</Context.Provider>
  );
}

export { UserProvider, Context };
