<template>
    <q-layout
        view="hhh Lpr fff"
        :class="{'darker-background': darkBackground}"
    >
        <header-bar
            :enable-left-drawer-button="enableSidebar"
            :enable-right-drawer-button="false"
            @toggleLeftDrawer="leftDrawerOpen = !leftDrawerOpen"
            @toggleRightDrawer="rightDrawerOpen = !rightDrawerOpen"
        />

        <q-drawer
            v-model="leftDrawerOpen"
            :show-if-above="enableSidebar"
            side="left"
            :width="300"
            :breakpoint="leftDrawerBreakpoint"
            :no-swipe-backdrop="!$q.platform.has.touch"
            :no-swipe-close="!$q.platform.has.touch"
            :no-swipe-open="!$q.platform.has.touch"
        >
            <q-scroll-area
                class="fit"
                dark
                :thumb-style="scrollThumbStyle"
                :bar-style="scrollBarStyle"
                :class="{'darker-background': darkBackground}"
            >
                <q-btn
                    class="lt-md"
                    icon="close"
                    color="accent"
                    style="margin: 6px 6px 0 6px;"
                    no-caps
                    dense
                    @click="leftDrawerOpen = false"
                />
                <div class="drawer-module">
                    <div style="padding:8px 16px 2px 16px">
                        <b>Table of Contents</b>
                    </div>
                    <q-list
                        class="contents-menu-list"
                    >
                        <q-item
                            v-for="entry in tableOfContents"
                            :key="tableOfContents.indexOf(entry)"
                            v-ripple
                            style="color: inherit; text-decoration:none"
                            dense
                            clickable
                            class="row"
                            :to="$route.path+'#'+entry.element"
                        >
                            <div
                                :class="`toc-entry toc-entry-level-${entry.level}`"
                                v-text="'·\xa0\xa0\xa0'.repeat(entry.level)+entry.title"
                            />
                        </q-item>
                    </q-list>
                </div>
                <div style="height: 50px" />
            </q-scroll-area>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>

        <!--         <q-drawer
            v-model="rightDrawerOpen"
            :show-if-above="enableInfobar"
            side="right"
            :width="200"
            :breakpoint="rightDrawerBreakpoint"
            :no-swipe-backdrop="!$q.platform.has.touch"
            :no-swipe-close="!$q.platform.has.touch"
            :no-swipe-open="!$q.platform.has.touch"
        >

        </q-drawer> -->

        <footer-bar />
        <q-page-sticky
            v-if="enableSidebar"
            position="top-left"
            :offset="[2, 4]"
            class="gt-sm"
        >
            <q-btn
                text-color="white"
                round
                class="left-drawer-float-button"
                :icon="leftDrawerOpen? 'chevron_left':'list'"
                size="14px"
                @click="leftDrawerOpen = !leftDrawerOpen"
            />
        </q-page-sticky>
        <q-page-sticky
            position="top-right"
            :offset="[10, 4]"
        >
            <div class="q-gutter-xs">
                <q-btn
                    v-if="enableSidebar"
                    text-color="white"
                    round
                    class="left-drawer-float-button lt-md"
                    :icon="leftDrawerOpen? 'chevron_left':'list'"
                    size="14px"
                    @click="leftDrawerOpen = !leftDrawerOpen"
                />
                <div>
                    <a
                        :href="$route.path+'#'"
                        style="text-decoration: none"
                    >
                        <q-btn
                            v-show="showToTopButton"
                            class="to-top-button"
                            text-color="white"
                            round
                            icon="arrow_upward"
                            size="14px"
                        /></a>
                </div>
            </div>
        </q-page-sticky>
    </q-layout>
</template>

<script lang="ts">
import {
    defineComponent, watch, ref, computed,
} from '@vue/composition-api';

import HeaderBar from 'components/main/HeaderBar.vue';
import FooterBar from 'components/main/FooterBar.vue';

export default defineComponent({
    name: 'MainLayout',

    components: {
        HeaderBar,
        FooterBar,
    },
    props: {
        enableSidebar: {
            default: false,
            type: Boolean,
        },
        enableInfobar: {
            default: false,
            type: Boolean,
        },
    },
    setup(props, ctx) {
        const leftDrawerBreakpoint = 1023;
        const leftDrawerOpen = ref(false);
        const rightDrawerOpen = ref(false);

        const rightDrawerBreakpoint = computed(() => (leftDrawerOpen ? 1100 : leftDrawerBreakpoint));

        watch(() => props.enableSidebar, (sidebar: boolean) => {
            const leftDrawerAboveBreakpoint = window.innerWidth > leftDrawerBreakpoint;
            leftDrawerOpen.value = sidebar ? leftDrawerAboveBreakpoint : false;
        });

        watch(() => props.enableInfobar, (infobar: boolean) => {
            const aboveBreakpoint = window.innerWidth > rightDrawerBreakpoint.value;
            rightDrawerOpen.value = infobar ? aboveBreakpoint : false;
        });

        const darkBackground = computed(() => ctx.root.$store.getters['style/darkLayoutEnabled']);

        const tableOfContents = computed(() => ctx.root.$store.getters['currentContent/tableOfContents']);

        const scrollThumbStyle = {
            right: '1px',
            borderRadius: '4px',
            backgroundColor: 'lightgray',
            width: '8px',
            opacity: 0.9,
        };

        const scrollBarStyle = {
            borderRadius: '5px',
            backgroundColor: 'white',
            width: '10px',
            opacity: 0.3,
        };

        const showToTopButton = ref(false);

        function onScroll() {
            if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
                showToTopButton.value = true;
            } else {
                showToTopButton.value = false;
            }
        }

        window.addEventListener('scroll', onScroll);

        return {
            leftDrawerOpen,
            rightDrawerOpen,
            rightDrawerBreakpoint,
            darkBackground,
            tableOfContents,
            scrollBarStyle,
            scrollThumbStyle,
            showToTopButton,
            leftDrawerBreakpoint,
        };
    },
});
</script>

<style lang="sass">
.contents-menu-list .q-item
    border-radius: 0 8px 8px 0

.drawer-module
    margin: 6px 10px 10px 0
    background: #E0D3BC
    border-radius: 0 8px 8px 0
</style>

<style lang="sass" scoped>
.left-drawer-float-button
    background: rgba($dark,0.8)
    opacity: 0.9

.to-top-button
    background: rgba($dark,0.8)
    opacity: 0.95

.darker-background
    background: $dark-tinted

.toc-entry
    text-overflow: ellipsis
    white-space: nowrap
    overflow: hidden
    margin: auto 0
    opacity: 0.8
    font-size: 1.4rem
    font-family: 'Baloo 2'

.toc-entry-level-0
    opacity: 0.8
    font-weight: 500

.toc-entry-level-1
    opacity: 0.8

.toc-entry-level-2, .toc-entry-level-3, .toc-entry-level-4
    opacity: 0.7
</style>
