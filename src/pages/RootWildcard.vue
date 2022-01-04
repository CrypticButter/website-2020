<template>
    <component :is="mainComponent" />
</template>

<script lang="ts">
import { ref, defineComponent } from '@vue/composition-api';

import HeaderBar from 'components/main/HeaderBar.vue';
import FooterBar from 'components/main/FooterBar.vue';
import posts from 'api/posts';

async function getMainComponent(path: string) {
    let pageType = '';

    try {
        await posts.getPost(path);
        pageType = 'Post';
    } catch { /* Not a post */ }

    if (pageType) {
        return () => import(`pages/${pageType}.vue`);
    } else {
        return () => import('pages/Error404.vue');
    }
}

export default defineComponent({
    name: 'RootWildcard',
    components: {
        HeaderBar,
        FooterBar,
    },
    setup(props, ctx) {
        const mainComponent = ref<Function>(null);

        async function setMainComponent(path: string) {
            const x = await getMainComponent(path);
            mainComponent.value = x;
        }

        setMainComponent(ctx.root.$route.params.pathMatch);

        return { mainComponent, setMainComponent };
    },
    beforeRouteUpdate(to: any, from: any, next: Function) {
        if (to.path !== from.path) {
            from.matched[1].instances.default.setMainComponent(to.params.pathMatch); // Child of MainComponent; this
            next();
        } else {
            next();
        }
    },
});
</script>
