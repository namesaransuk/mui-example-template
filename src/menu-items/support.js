// assets
import { ChromeOutlined, QuestionOutlined, UserOutlined } from '@ant-design/icons';

// icons
const icons = {
    ChromeOutlined,
    QuestionOutlined,
    UserOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
    id: 'support',
    title: 'Support',
    type: 'group',
    children: [
        {
            id: 'edit-profile',
            title: 'Edit Profile',
            type: 'item',
            url: '/EditProfile',
            icon: icons.UserOutlined
        },
        {
            id: 'sample-page',
            title: 'Sample Page',
            type: 'item',
            url: '/sample-page',
            icon: icons.ChromeOutlined
        },
        {
            id: 'documentation',
            title: 'Documentation',
            type: 'item',
            url: 'https://codedthemes.gitbook.io/mantis-react/',
            icon: icons.QuestionOutlined,
            external: true,
            target: true
        }
    ]
};

export default support;
