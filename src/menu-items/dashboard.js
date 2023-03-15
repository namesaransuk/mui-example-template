// assets
import {
    DashboardOutlined,
    TableOutlined,
    CoffeeOutlined,
    InteractionOutlined,
    FileExcelOutlined,
    CalendarOutlined
} from '@ant-design/icons';
// icons
const icons = {
    DashboardOutlined,
    TableOutlined,
    CoffeeOutlined,
    InteractionOutlined,
    FileExcelOutlined,
    CalendarOutlined
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
            icon: icons.CoffeeOutlined,
            breadcrumbs: false
        },
        {
            id: 'social',
            title: 'Social',
            type: 'item',
            url: '/dashboard/social',
            icon: icons.InteractionOutlined,
            breadcrumbs: false
        },
        {
            id: 'excel',
            title: 'Excel',
            type: 'item',
            url: '/dashboard/excel',
            icon: icons.FileExcelOutlined,
            breadcrumbs: false
        },
        {
            id: 'calendar',
            title: 'Calendar',
            type: 'item',
            url: '/dashboard/calendar',
            icon: icons.CalendarOutlined,
            breadcrumbs: false
        },
        {
            id: 'test',
            title: 'Test',
            type: 'item',
            url: '/dashboard/test',
            icon: icons.CalendarOutlined,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
