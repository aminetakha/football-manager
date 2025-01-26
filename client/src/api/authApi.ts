import { LoginValues, User } from "../types";
import { apiUrl } from "./apiUrl";
import get from "./methods/get";
import post from "./methods/post";

export default {
    login: (value: LoginValues) => post<LoginValues, { success: boolean, user: User }>(`${apiUrl}/api/auth`, value),
    getMe: () => get(`${apiUrl}/api/auth/me`),
    logout: () => post(`${apiUrl}/api/auth/logout`)
}