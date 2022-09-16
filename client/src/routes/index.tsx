import {
    BrowserRouter,
    Navigate,
    Outlet,
    Route,
    Routes as RouteContainer,
} from 'react-router-dom';
import { Fragment, lazy, Suspense } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

import Home from '@/pages/Home';
// import Dashboard from '@/pages/Dashboard';
// import Tasks from '@/pages/Tasks';
// import Users from '@/pages/Users';
// import Profile from '@/pages/Profile';
import { Role } from '@/interfaces/user';
import { useUser } from '@/hooks';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

type Token = {
    token: string | null;
};

const LazyTasks = lazy(() => import('../pages/Tasks'));
const LazyDashboard = lazy(() => import('../pages/Dashboard'));
const LazyUsers = lazy(() => import('../pages/Users'));
const LazyProfile = lazy(() => import('../pages/Profile'));

const Routes = () => {
    const { user, token } = useUser();

    return (
        <BrowserRouter>
            <RouteContainer>
                <Route path="/" element={<RedirectOrHome token={token} />}>
                    <Route path="login" element={<Fragment />} />
                    <Route path="register" element={<Fragment />} />
                </Route>

                {/* Authenticated users only  */}
                <Route element={<AuthenticatedRoute token={token} />}>
                    <Route
                        path="dashboard"
                        element={
                            <DashboardLayout>
                                <Suspense fallback={<Loading />}>
                                    <Outlet />
                                </Suspense>
                            </DashboardLayout>
                        }
                    >
                        <Route path="" element={<LazyDashboard />} />
                        <Route path="tasks" element={<LazyTasks />} />
                        <Route path="profile" element={<LazyProfile />} />

                        {/* Admin role users only  */}
                        <Route element={<AdminRoute role={user?.role} />}>
                            <Route path="users" element={<LazyUsers />} />
                        </Route>
                    </Route>
                </Route>

                {/* Non existing routes redirect to Homepage  */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </RouteContainer>
        </BrowserRouter>
    );
};

export default Routes;

function AuthenticatedRoute({ token }: Token) {
    return token ? <Outlet /> : <Navigate to="/" replace />;
}

function AdminRoute({ role }: { role: Role | undefined }) {
    return role === 'admin' ? <Outlet /> : null;
}

function RedirectOrHome({ token }: Token) {
    return token ? <Navigate to="dashboard" replace /> : <Home />;
}

function Loading() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
            }}
        >
            <CircularProgress />
        </Box>
    );
}
