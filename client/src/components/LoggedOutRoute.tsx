import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const LoggedOutRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    
    if (user) {
        return <Navigate to="/teams" replace />;
    }

    return children;
};

export default LoggedOutRoute;