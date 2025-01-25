import { useAuth } from "../../hooks/useAuth"

const Team = () => {
  const { user } = useAuth();
  return (
    <div>Team: {JSON.stringify(user)}</div>
  )
}

export default Team