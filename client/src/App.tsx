import { useState } from 'react'
import './App.css'
import { AuthContext } from './contexts/AuthContext'
import Router from "./Router"
import { User } from './types'

const App = () => {
  const [user, setUser] = useState<User>(null);

  const signUser = (value: User) => {
    setUser(value)
  }

  return (
    <AuthContext.Provider value={{ user, signUser }}>
      <Router />
    </AuthContext.Provider>
  )
}

export default App