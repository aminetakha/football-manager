import { useState } from "react";
import { useQuery } from "react-query";
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

  if (getCurrentUser.isLoading) return <h1>Loading...</h1>;

  return (
    <AuthContext.Provider value={{ user, signUser }}>
      <Router />
    </AuthContext.Provider>
  );
};

export default App;
