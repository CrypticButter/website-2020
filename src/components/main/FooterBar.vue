<template>
    <q-footer class="bg-dark footer-container">
        <div class="row">
            <div class="text-section">
                Copyright © 2018—{{ new Date().getFullYear() }} Luis Thiam-Nye
            </div>
            <q-btn
                stretch
                flat
                no-caps
                to="/privacy-policy/"
            >
                Privacy Policy
            </q-btn>
            <q-btn
                stretch
                flat
                no-caps
                to="/contact/"
            >
                Contact
            </q-btn>
        </div>
        <div class="text-section">
            Disclaimer: any opinions expressed on this site are those of the author, unless a third-party is explicitly quoted.
        </div>
    </q-footer>
</template>

<script lang="ts">
export default {

};
</script>

<style lang="sass" scoped>
.footer-container
    font-size: 1.4rem
    color: #a9a9a9

.text-section
    display: flex
    align-items: center
    padding: 0 1.6rem
    min-height: 3.6rem
    color: #808080
</style>
