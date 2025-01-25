import './App.css'
import { AuthContext } from './contexts/AuthContext'
import Router from "./Router"

const App = () => {
  return (
    <AuthContext.Provider value={{ user: null }}>
      <Router />
    </AuthContext.Provider>
  )
}

export default App