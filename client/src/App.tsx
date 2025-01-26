import { useState } from 'react'
import './App.css'
import { AuthContext } from './contexts/AuthContext'
import Router from "./Router"
import { User } from './types'
import { useQuery } from 'react-query'
import authApi from './api/authApi'

const App = () => {
  const [user, setUser] = useState<User>(null);
  const getCurrentUser = useQuery({
    queryFn: authApi.getMe,
    queryKey: ['me'],
    onSuccess(data) {
      setUser(data.user);
    },
    retry: false,
  })

  const signUser = (value: User) => {
    setUser(value);
  }

  if(getCurrentUser.isLoading) return <h1>Loading...</h1>

  return (
    <AuthContext.Provider value={{ user, signUser }}>
      <Router />
    </AuthContext.Provider>
  )
}

export default App