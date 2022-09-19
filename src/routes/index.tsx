import Home from '../pages/Home';
import About from '../pages/About';
import {RouteConfig} from 'react-router-config';

const routes:RouteConfig = [
    {
        path: '/home',
        exact: true,
        component: Home
    },
    {
        path: '/about',
        exact: true,
        component: About
    }
];

export default routes;
