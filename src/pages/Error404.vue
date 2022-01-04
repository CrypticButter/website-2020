<template>
    <q-page>
        <div class="text-center error-container">
            <p>
                <img
                    src="~assets/sad.svg"
                    style="width:30vw;max-width:150px;"
                >
            </p>
            <p class="text-faded">
                Sorry, nothing here...<strong>(404)</strong>
            </p>
            <q-btn
                color="secondary"
                style="width:200px;"
                to="/"
                label="Go home"
            />
        </div>
    </q-page>
</template>

<script lang="ts">
export default {
    name: 'Error404',
};
</script>

<style lang="sass" scoped>
.error-container
    margin: 40px 0
</style>
