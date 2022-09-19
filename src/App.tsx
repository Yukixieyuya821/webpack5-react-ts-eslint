
import routes from './routes';
import {renderRoutes, RouteConfig} from 'react-router-config';
import styles from './style.module.scss';
const App = () => (
    <div className={styles.App}>
        {/* 设置routes的类型为RouteConfig[]，否则报错 */}
        {renderRoutes(routes as RouteConfig[])}
        Test
    </div>
);
export default App;

