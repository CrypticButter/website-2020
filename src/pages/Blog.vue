<template>
    <q-page>
        <div class="text-center">
            <h1 style="font-family:'Baloo 2'">
                Thoughts from a Nutter
            </h1>
            <h4
                class="text-italic subtitle-text"
            >
                The Cryptic Butter Blog
            </h4>
        </div>
        <post-grid
            :maximum-posts="24"
            :use-pages="true"
            class="post-grid-container"
        />
    </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import PostGrid from 'components/widgets/PostGrid.vue';

export default defineComponent({
    name: 'PageIndex',
    components: { PostGrid },
    setup() {
        return { };
    },
});
</script>

<style lang="sass" scoped>
.subtitle-text
    font-family: 'Pt sans'
    margin: -2.4rem 0 0rem 0

.post-grid-container
    margin: 0 0 24px 0
</style>
