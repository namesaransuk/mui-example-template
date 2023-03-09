// project import
import pages from './pages';
import dashboard from './dashboard';
import utilities from './utilities';
import support from './support';
import adminmm from './adminmm';

// ==============================|| MENU ITEMS ||============================== //

const user = JSON.parse(localStorage.getItem('user'));
let menuItems = null;
if (user) {
    switch (user.role) {
        case 1:
            menuItems = {
                items: [adminmm, dashboard, utilities, support]
            };

            break;
        default:
            menuItems = {
                items: [dashboard, support]
            };

            break;
    }
}

export default menuItems;
