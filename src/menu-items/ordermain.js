// assets
import { UnorderedListOutlined } from '@ant-design/icons';

// icons
const icons = {
    UnorderedListOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const ordermain = {
    id: 'ordermain',
    title: 'Order',
    type: 'group',
    children: [
        {
            id: 'order-main',
            title: 'Order Main',
            type: 'item',
            url: '/Order',
            icon: icons.UnorderedListOutlined
        }
    ]
};

export default ordermain;
