<template>
    <div>
        <div
            v-if="showPagination"
            class="flex flex-center"
        >
            <q-pagination
                v-model="currentPage"
                color="accent"
                :max="pageCount"
                :max-pages="7"
                :boundary-numbers="true"
                style="margin: 25px 0 0 0"
                @input="newPageSelected"
            />
        </div>
        <div class="q-pa-md row justify-center items-start q-gutter-md">
            <q-card
                v-for="post in recentPosts"
                :key="post.path"
                class="post-card"
            >
                <q-btn
                    flat
                    no-caps
                    padding="0 0 12px 0"
                    color="primary"
                    :to="'/'+post.path+'/'"
                >
                    <q-img
                        :src="post.featureImageUrl"
                        no-default-spinner
                        transition="jump-up"
                        class="feature-image"
                        style="border-radius: 4px 4px 0 0"
                    />
                    <q-card-section class="">
                        <div class="post-title">
                            {{ post.title }}
                        </div>
                        <div class="post-excerpt">
                            {{ post.excerpt }}
                        </div>
                        <div class="text-overline meta-text">
                            {{ Intl.DateTimeFormat('default', { year: 'numeric', month: 'long', day: 'numeric' })
                                .format(post.publishDate) }}
                        </div>
                    </q-card-section>
                    <span class="action-text">
                        Read more →
                    </span>
                </q-btn>
            </q-card>
            <q-banner
                v-if="fetchError"
                class="text-white bg-red"
                rounded
            >
                <template v-slot:avatar>
                    <q-icon name="error" />
                </template>
                We were unable to get you the recent posts.
            </q-banner>
        </div>
        <div
            v-if="showPagination"
            class="flex flex-center"
        >
            <q-pagination
                v-model="currentPage"
                color="accent"
                :max="pageCount"
                :max-pages="7"
                :boundary-numbers="true"
                style="margin: 0 0 30px 0"
                @input="newPageSelected"
            />
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent, ref, computed,
} from '@vue/composition-api';
import postsApi, { PostData, FeatureImageSize } from 'api/posts';

export default defineComponent({
    name: 'PostGrid',
    props: {
        maximumPosts: {
            type: Number,
            default: 60,
        },
        usePages: {
            type: Boolean,
            default: false,
        },
        excludePath: {
            type: String,
        },
    },
    setup(props, ctx) {
        const recentPosts = ref<Array<any>>([]);
        const fetchError = ref(false);

        const numberOfPosts = ref(0);
        const pageCount = ref(1);
        const showPagination = computed(() => props.usePages && numberOfPosts.value > props.maximumPosts && pageCount.value > 1);

        const currentPage = ref(1);

        function visit(path: string) {
            ctx.root.$router.push({ path: `/${path}/` });
        }

        async function populateRecentPosts() {
            const pageIndex = currentPage.value - 1;
            let posts: any[] = [];
            if (props.excludePath) {
                const filter = (post: PostData) => post.path !== props.excludePath;
                posts = await postsApi.getRecentPostsFiltered(props.maximumPosts,
                    pageIndex * props.maximumPosts, filter);
            } else {
                posts = await postsApi.getRecentPosts(props.maximumPosts, pageIndex * props.maximumPosts);
            }
            numberOfPosts.value = await postsApi.howManyPosts();
            if (posts) {
                pageCount.value = Math.floor(numberOfPosts.value / props.maximumPosts) + 1;
                posts.forEach((post) => {
                    post.featureImageUrl = postsApi.featureImageUrl(post.featureImage, FeatureImageSize.Thumb);
                });
            } else {
                fetchError.value = true;
            }
            recentPosts.value = posts;
        }
        populateRecentPosts();

        function newPageSelected() {
            recentPosts.value = [];
            populateRecentPosts();
        }

        return {
            recentPosts, visit, fetchError, currentPage, showPagination, pageCount, newPageSelected, postsApi,
        };
    },
});
</script>

<style lang="sass" scoped>
.post-card
    max-width: 30rem
    border-radius: 7px 7px 4px 4px

.meta-text
    color: #505050
    margin: 6px 0 0 0

.action-text
    font-style: italic
    margin: -12px 0 0 0

.post-title
    font-size: 1.8rem
    font-weight: 700
    color: black
    margin: 0 0 4px 0

.post-excerpt
    font-size: 1.4rem
    color: #404040

.feature-image
    pointer-events: none
</style>
