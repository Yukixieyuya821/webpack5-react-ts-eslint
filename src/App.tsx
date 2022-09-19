import {useState} from 'react';
import routes from './routes';
import {renderRoutes, RouteConfig} from 'react-router-config';
import RichTextExample from './components/richtext';

import styles from './style.module.scss';
const App = () => {
    const [value, setValue] = useState([
        {
            type: 'paragraph',
            children: [{text: ''}],
        }
    ]);
    const getValue = () => {
        console.log(value);
    };
    const onChange = (val: []) => {
        setValue(val);
    };
    return (
        <div className={styles.App}>
            {/* 设置routes的类型为RouteConfig[]，否则报错 */}
            {renderRoutes(routes as RouteConfig[])}
            Test
            <RichTextExample value={value} onChange={onChange} />
        </div>
    );
};
export default App;

