<template>
    <q-page
        style="text-align: center"
    >
        <h2>Recent Posts</h2>
        <p>As I document my experiences, you have the perfect opportunity to gain from my journeys and learn from my mistakes…</p>
        <post-grid :maximum-posts="6" />
        (Don’t worry, this butter is cheese-free certified)
        <h2>Who Am I?</h2>
        <p>My name is Luis Thiam-Nye, and I believe that knowledge is power.</p>
        <p>Combine knowledge with productivity and you get a truly unstoppable force.</p>
    </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import PostGrid from 'components/widgets/PostGrid.vue';

export default defineComponent({
    name: 'PageIndex',
    components: { PostGrid },
    setup() {
        return {};
    },
});
</script>

<style lang="sass" scoped>

</style>
