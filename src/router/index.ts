import { route } from 'quasar/wrappers';
import VueRouter from 'vue-router';
import { StoreInterface } from '../store';
import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default route<StoreInterface>(({ Vue }) => {
    Vue.use(VueRouter);

    const Router = new VueRouter({
        routes,
        scrollBehavior(to, from, savedPosition) {
            if (to.hash) {
                if (to.hash === '#') { return { x: 0, y: 0 }; }
                return {
                    selector: to.hash,
                };
            }
            if (savedPosition) {
                return savedPosition;
            }
            return { x: 0, y: 0 };
        },


        // Leave these as is and change from quasar.conf.js instead!
        // quasar.conf.js -> build -> vueRouterMode
        // quasar.conf.js -> build -> publicPath
        mode: process.env.VUE_ROUTER_MODE,
        base: process.env.VUE_ROUTER_BASE,
    });

    if (process.env.NODE_ENV !== 'production') {
        Router.beforeEach((to, from, next) => {
            if (!to.path.endsWith('/')) {
                next(`${to.path}/`);
                return;
            }

            const nearestWithTitle = to.matched.slice().reverse().find((r) => r.meta && r.meta.title);
            if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

            next();
        });
    }

    Router.beforeEach((to, from, next) => {
        const nearestWithTitle = to.matched.slice().reverse().find((r) => r.meta && r.meta.title);
        if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

        next();
    });

    return Router;
});
