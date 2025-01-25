import { LoginValues, User } from "../types";
import post from "./methods/post";

export default {
    login: (value: LoginValues) => post<LoginValues, User>('http://localhost:5000/api/auth', value)
}