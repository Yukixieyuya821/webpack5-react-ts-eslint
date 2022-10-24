import path from 'path';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import AutoImport from 'unplugin-auto-import/vite';
// https://vitejs.dev/config/
export default defineConfig({
    // root: path.resolve(process.cwd(), 'public/vite'),
    plugins: [
        react(),
        tsconfigPaths(),
        AutoImport({
            // 自定引入 Vue VueRouter API,如果还需要其他的可以自行引入
            imports: ['react', 'react-router-dom'],
            // 调整自动引入的文件位置
            dts: path.resolve(process.cwd(), 'src/auto-imports.d.ts'),
            eslintrc: {
                enabled: true,
                // 配置文件的位置
                filepath: path.resolve(process.cwd(), '.eslintrc-auto-import.json'),
                globalsPropValue: true,
            }
        }),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "/src/assets/scss/common.scss";',
            },
        },
    },
    server: {
        port: 9588,
        host: '0.0.0.0',
        open: true
    },
});
