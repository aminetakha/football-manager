import { createContext } from "react";
import { User } from "../types";

export const AuthContext = createContext<{
    user: User;
    signUser: (data: User) => void;
}>({
    user: null,
    signUser: () => {},
});