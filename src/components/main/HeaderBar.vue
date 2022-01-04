<template>
    <q-header
        elevated
        class="header-bar"
    >
        <q-toolbar class="toolbar">
            <q-btn
                v-if="false"
                flat
                stretch
                icon="menu"
                @click="$emit('toggleLeftDrawer')"
            />
            <q-btn
                stretch
                flat
                no-caps
                to="/"
                class="logo-button"
            >
                <q-img
                    basic
                    src="~assets/brand-logo/square.png"
                    class="logo-image"
                />
                <span class="logo-text">
                    Cryptic Butter
                </span>
            </q-btn>
            <q-toolbar-title class="toolbar-title gt-xs">
                Thoughts from a Nutter
            </q-toolbar-title>
            <q-space class="lt-sm" />
            <q-btn-group
                class="gt-xs"
                stretch
                flat
            >
                <q-btn
                    v-for="item in menuItems"
                    :key="item.route"
                    no-caps
                    :to="item.route"
                    class="menu-item"
                >
                    {{ item.text }}
                </q-btn>
            </q-btn-group>
            <q-btn
                v-if="enableRightDrawerButton"
                flat
                stretch
                icon="list"
                @click="$emit('toggleRightDrawer')"
            />
            <q-btn-dropdown
                class="lt-sm"
                icon="menu"
                flat
                stretch
            >
                <q-list
                    style="min-width:100px"
                    class="lt-sm"
                >
                    <q-item
                        v-close-popup
                        clickable
                        to="/blog"
                    >
                        <q-item-section>
                            <q-item-label>Blog</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-item
                        v-close-popup
                        clickable
                        to="/about"
                    >
                        <q-item-section>
                            <q-item-label>About</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-btn-dropdown>
        </q-toolbar>
    </q-header>
</template>

<script lang="ts">
import { reactive, defineComponent } from '@vue/composition-api';

function useMenu() {
    const menuItems = reactive([
        { text: 'Blog', route: '/blog' },
        { text: 'About', route: '/about' },
    ]);

    return { menuItems };
}

export default defineComponent({
    name: 'HeaderBar',
    props: {
        enableLeftDrawerButton: {
            type: Boolean,
            required: true,
        },
        enableRightDrawerButton: {
            type: Boolean,
            required: true,
        },
    },
    setup() {
        return { ...useMenu() };
    },
});
</script>

<style lang="sass" scoped>
.header-bar
    background: rgba($primary, 0.96)

.toolbar
    padding: 0 12px 0 2px

.logo-button
    background-color: rgba(0,0,0,0.07)

.logo-image
    height: 40px
    width: 40px
    margin: 0 10px 0 0

.logo-text
    font-size: 20px
    font-family: 'Baloo 2'
    font-weight: 500

.toolbar-title
    opacity: 0.85
    font-size: 18px
    font-family: 'Baloo 2'
    font-style: normal
</style>
