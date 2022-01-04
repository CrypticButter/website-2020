import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [{ path: '', component: () => import('pages/Index.vue') }],
        meta: {
            title: 'Cryptic Butter: Butter Ways to Do Things',
        },
    },
    {
        path: '/about',
        component: () => import('layouts/MainLayout.vue'),
        children: [{ path: '', component: () => import('pages/About.vue') }],
        meta: {
            title: 'About Cryptic Butter',
        },
    },
    {
        path: '/contact',
        component: () => import('layouts/MainLayout.vue'),
        children: [{ path: '', component: () => import('pages/Contact.vue') }],
        meta: {
            title: 'Contact · Cryptic Butter',
        },
    },
    {
        path: '/blog',
        component: () => import('layouts/MainLayout.vue'),
        children: [{ path: '', component: () => import('pages/Blog.vue') }],
        meta: {
            title: 'Cryptic Butter Blog: Thoughts from a Nutter',
        },
    },
    {
        path: '/privacy-policy',
        component: () => import('layouts/MainLayout.vue'),
        children: [{ path: '', component: () => import('pages/generic/PrivacyPolicy.vue') }],
        meta: {
            title: 'Privacy Policy · Cryptic Butter',
        },
    },
    {
        path: '/*',
        component: () => import('layouts/MainLayout.vue'),
        props: { enableSidebar: true, enableInfobar: true },
        children: [{ path: '', component: () => import('pages/RootWildcard.vue') }],
        meta: {
            title: 'Cryptic Butter: Butter Ways to Do Things',
        },
    },
];

// https://quasar.dev/quasar-cli/developing-ssr/handling-404-and-500-errors#Error-404

export default routes;
