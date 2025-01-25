import { Routes, Route } from 'react-router';
import Login from '../features/auth';
import Team from '../features/teams';
import Market from '../features/Market';
import LoggedOutRoute from '../components/LoggedOutRoute';
import PrivateRoute from '../components/PrivateRoute';

const Router = () => {
    return (
        <Routes>
            <Route path='login' element={<LoggedOutRoute><Login /></LoggedOutRoute>} />
            <Route path='teams' element={<PrivateRoute><Team /></PrivateRoute>} />
            <Route path='transfer' element={<PrivateRoute><Market /></PrivateRoute>} />
        </Routes>
    )
}

export default Router;