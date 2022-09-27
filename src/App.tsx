
import routes from './routes';
import {renderRoutes, RouteConfig} from 'react-router-config';
import styles from './style.module.scss';
const App = () => {
    useEffect(() => {
        // StrictMode 严格模式会重复调用组件的一些钩子，从而使副作用更容易暴露出来，仅在开发环境中运行，不影响生产环境。
        console.log('我加载了');
    }, []);
    return (
        <div className={styles.App}>
            {/* 设置routes的类型为RouteConfig[]，否则报错 */}
            {renderRoutes(routes as RouteConfig[])}
      Test
        </div>
    );
};
export default App;

