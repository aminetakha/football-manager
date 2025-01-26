import { Routes, Route } from 'react-router';
import Login from '../features/auth';
import Team from '../features/teams';
import Market from '../features/market';
import LoggedOutRoute from '../components/LoggedOutRoute';
import PrivateRoute from '../components/PrivateRoute';
import Layout from '../components/Layout';

const Router = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index path='' element={<PrivateRoute><Team /></PrivateRoute>} />
                <Route path='transfer' element={<PrivateRoute><Market /></PrivateRoute>} />
            </Route>
            <Route path='login' element={<LoggedOutRoute><Login /></LoggedOutRoute>} />
        </Routes>
    )
}

export default Router;