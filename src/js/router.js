import Main from './components/Main.vue';
import Settings from './components/Settings.vue';
import PageNotFound from './components/PageNotFound.vue';
const routes = [
    {
        path: '/',
        name: 'main',
        component: Main
    },
    {
        path: '/settings',
        name: 'settings',
        component: Settings
    },
    {
        path: '*',
        name: 'PageNotFound',
        component: PageNotFound
    }
];
export { routes };