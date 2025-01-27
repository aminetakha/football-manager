import { useState } from "react";
import { useQuery } from "react-query";
import { Box, Flex, Loader } from "@mantine/core";
import { AuthContext } from "./contexts/AuthContext";
import Router from "./Router";
import { User } from "./types";
import authApi from "./api/authApi";
import keys from "./api/keys";

const App = () => {
  const [user, setUser] = useState<User>(null);
  const getCurrentUser = useQuery({
    queryFn: authApi.getMe,
    queryKey: keys.getMeKey(),
    onSuccess(data) {
      if (data && "user" in data) {
        setUser(data.user);
      }
    },
    retry: false,
  });

  const signUser = (value: User) => {
    setUser(value);
  };

  if (getCurrentUser.isLoading)
    return (
      <Box h="100vh">
        <Flex justify="center" align="center" h="100%">
          <Loader color="blue" />
        </Flex>
      </Box>
    );

  return (
    <AuthContext.Provider value={{ user, signUser }}>
      <Router />
    </AuthContext.Provider>
  );
};

export default App;
