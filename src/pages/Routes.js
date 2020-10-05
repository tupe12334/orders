import Home from './Home';
import OrderPlace from './OrderPlace';
import Show from './Show';


const Routes = [
    {
        path: '/',
        sidebarName: 'בית',
        component: Home,
        icon:"home"
    },
    {
        path: '/Place-an-order',
        sidebarName: 'הכנס הזמנה',
        component: OrderPlace,
        icon:"input"
    },
    {
        path: '/Show',
        sidebarName: 'צפה בהזמנות',
        component: Show,
        icon:"inbox"
    },
]
export default Routes
