import { useMutation } from "react-query";
import { LoginValues } from "../../../types";
import authApi from "../../../api/authApi";
import { useAuth } from "../../../hooks/useAuth";
import { notifications } from "@mantine/notifications";

const useLogin = () => {
  const { signUser } = useAuth();

  const login = useMutation({
    mutationFn: (value: LoginValues) => authApi.login(value),
    onSuccess(data) {
      signUser(data.user);
    },
    onError(error: Error) {
      const errorData = JSON.parse(error.message);
      notifications.show({
        message: errorData.message,
        title: "Error while login",
        position: "top-right",
        color: "red",
      });
    },
  });

  return login;
};

export default useLogin;
