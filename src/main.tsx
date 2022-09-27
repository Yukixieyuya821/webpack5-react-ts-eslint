import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';
const root = document.getElementById('root');
// StrictMode 严格模式会重复调用组件的一些钩子，从而使副作用更容易暴露出来，仅在开发环境中运行，不影响生产环境。
if(root)
    createRoot(root).render(<React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>);

