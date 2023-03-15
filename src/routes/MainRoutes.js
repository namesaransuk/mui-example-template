import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const Customer = Loadable(lazy(() => import('pages/customer')));
const Product = Loadable(lazy(() => import('pages/product')));
const Cart = Loadable(lazy(() => import('pages/product/Cart')));
// const Line = Loadable(lazy(() => import('pages/Line')));
const Social = Loadable(lazy(() => import('pages/social')));
const Excel = Loadable(lazy(() => import('pages/excel')));
const Calendar = Loadable(lazy(() => import('pages/calendar')));
const Test = Loadable(lazy(() => import('pages/test')));

const AdminDefault = Loadable(lazy(() => import('pages/addminmm')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));

// render - EditProfile
const EditProfile = Loadable(lazy(() => import('pages/user-management/EditProfile')));

// ==============================|| MAIN ROUTING ||============================== //

function hasJWT() {
    let flag = false;

    //check user has JWT token
    localStorage.getItem('accessToken') ? (flag = true) : (flag = false);

    return flag;
}

const MainRoutes = {
    path: '/',
    element: hasJWT() ? <MainLayout /> : <AuthLogin />,
    children: [
        {
            path: '/',
            children: [
                {
                    path: '/',
                    element: <DashboardDefault />
                },
                {
                    path: 'color',
                    element: <Color />
                },
                {
                    path: 'dashboard',
                    children: [
                        {
                            path: 'default',
                            element: <DashboardDefault />
                        },
                        {
                            path: 'customer',
                            element: <Customer />
                        },
                        {
                            path: 'product',
                            element: <Product />
                        },
                        {
                            path: 'cart',
                            element: <Cart />
                        },
                        {
                            path: 'social',
                            element: <Social />
                        },
                        {
                            path: 'excel',
                            element: <Excel />
                        },
                        {
                            path: 'calendar',
                            element: <Calendar />
                        },
                        {
                            path: 'test',
                            element: <Test />
                        }
                    ]
                },
                {
                    path: 'sample-page',
                    element: <SamplePage />
                },
                {
                    path: 'shadow',
                    element: <Shadow />
                },
                {
                    path: 'typography',
                    element: <Typography />
                },
                {
                    path: 'icons/ant',
                    element: <AntIcons />
                },
                {
                    path: 'EditProfile',
                    element: <EditProfile />
                },
                {
                    path: 'UsersManagement',
                    element: <AdminDefault />
                }
            ]
        }
    ]
};

export default MainRoutes;
