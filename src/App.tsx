
import routes from './routes';
import {renderRoutes, RouteConfig} from 'react-router-config';
import styles from './style.module.scss';
import bigImg from './assets/imgs/22kb.png';
const App = () => {
    useEffect(() => {
        console.log('加载了。。。');
    });
    return (
        <div className="App">
            {/* 设置routes的类型为RouteConfig[]，否则报错 */}
            {renderRoutes(routes as RouteConfig[])}
            <h1 className={styles.title}>Test</h1>
            <img src={bigImg} alt="大于于10kb的图片" />
        </div>
    );
};
export default App;

