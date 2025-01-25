import { Routes, Route } from 'react-router';
import Login from '../features/auth';
import Team from '../features/teams';
import Market from '../features/Market';
import LoggedOutRoute from '../components/LoggedOutRoute';
import PrivateRoute from '../components/PrivateRoute';

const Router = () => {
    return (
        <Routes>
            <Route index path='' element={<PrivateRoute><Team /></PrivateRoute>} />
            <Route path='transfer' element={<PrivateRoute><Market /></PrivateRoute>} />
            <Route path='login' element={<LoggedOutRoute><Login /></LoggedOutRoute>} />
        </Routes>
    )
}

export default Router;