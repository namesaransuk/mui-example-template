// assets
import { UnorderedListOutlined } from '@ant-design/icons';

// icons
const icons = {
    UnorderedListOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const adminmm = {
    id: 'adminmm',
    title: 'Admin',
    type: 'group',
    children: [
        {
            id: 'users-management',
            title: 'Users Management',
            type: 'item',
            url: '/UsersManagement',
            icon: icons.UnorderedListOutlined,
            breadcrumbs: false
        }
    ]
};

export default adminmm;
