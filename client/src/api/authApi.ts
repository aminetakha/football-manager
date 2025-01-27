import { LoginValues, User } from "../types";
import { apiUrl } from "./apiUrl";
import get from "./methods/get";
import post from "./methods/post";

type GetMe =
  | {
      user: {
        id: number;
        email: string;
        hasTeam: boolean;
      };
    }
  | { message: string };

type Logout = { success: boolean } | { message: string };

export default {
  login: (value: LoginValues) =>
    post<LoginValues, { success: boolean; user: User }>(
      `${apiUrl}/api/auth`,
      value
    ),
  getMe: () => get<GetMe>(`${apiUrl}/api/auth/me`),
  logout: () => post<unknown, Logout>(`${apiUrl}/api/auth/logout`),
};
