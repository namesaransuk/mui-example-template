// assets
import { DashboardOutlined, TableOutlined } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined,
    TableOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'group-dashboard',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.DashboardOutlined,
            breadcrumbs: false
        },
        {
            id: 'customer',
            title: 'Customer',
            type: 'item',
            url: '/dashboard/customer',
            icon: icons.TableOutlined,
            breadcrumbs: false
        },
        {
            id: 'product',
            title: 'Product',
            type: 'item',
            url: '/dashboard/product',
            icon: icons.TableOutlined,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
