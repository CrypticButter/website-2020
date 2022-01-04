<template>
    <q-page class="post-page-container">
        <article style="margin-bottom: 20px">
            <q-img
                :src="postData.featureImageUrl"
                no-default-spinner
                ratio="1.618"
                style="max-height:900px"
            >
                <div class="absolute-full flex flex-center text-center">
                    <span>
                        <mark class="title-text">{{ postData.title }}</mark>
                        <br>
                        <mark class="subtitle-text">
                            By <span class="text-weight-bold">{{ postData.author }}</span> on
                            <span class="text-weight-bold">
                                {{ Intl.DateTimeFormat('default', { year: 'numeric', month: 'long', day: 'numeric' })
                                    .format(postData.publishDate) }}
                            </span>
                            <br>
                            <span v-if="postData.modifiedDate && postData.modifiedDate > postData.publishDate">
                                Updated on
                                <span class="text-weight-bold">
                                    {{ Intl.DateTimeFormat('default', { year: 'numeric', month: 'long', day: 'numeric' })
                                        .format(postData.modifiedDate) }}
                                </span>
                            </span>
                        </mark>
                        <div>
                            <q-icon
                                v-if="showScrollHint"
                                name="keyboard_arrow_down"
                                class="scroll-hint-icon"
                                style="margin: 6rem 0 0 0; height: 0"
                                size="6rem"
                            /></div>
                    </span>
                </div>
            </q-img>
            <div
                class="text-center"
            >
                <div class="excerpt-text page-content-container">
                    {{ postData.excerpt }}
                </div>
                <div style="color: lightgrey; margin-bottom:12px">
                    <em>This page may contain affiliate/referral links.</em>
                </div>
            </div>
            <div class="cb-post-content-container-full page-content-container">
                <!-- eslint-disable vue/no-v-html -->
                <div
                    ref="postcontent"
                    v-html="postData.content"
                />
            </div>
        </article>
        <div
            class="row justify-center"
            style="margin: 0 0 24px 0"
        >
            <div class="column">
                <div
                    class="text-center"
                    style="margin-top:4px; margin-bottom: 32px; font-family: 'baloo 2'; font-weight: 500; font-size: 2.2rem"
                >
                    <mark style="background-color: #fff056;">&nbsp;&nbsp;Spread the butter!&nbsp;&nbsp;</mark>
                </div>
                <div
                    class="q-gutter-md"
                >
                    <a
                        style="text-decoration: none"
                        target="_blank"
                        :href="twitterShareUrl"
                    >
                        <q-btn
                            label="Twitter"
                            icon="eva-twitter"
                            style="background:#00B6F1"
                            text-color="white"
                            no-caps
                        /></a>
                    <a
                        style="text-decoration: none"
                        target="_blank"
                        :href="facebookShareUrl"
                    >
                        <q-btn
                            label="Facebook"
                            icon="eva-facebook"
                            style="background:#3B5998"
                            text-color="white"
                            no-caps
                        /></a>
                </div>
            </div>
        </div>
        <about-author class="cb-post-content-container-full page-content-container author-box" />
        <div
            class="text-center"
            style="margin-top:24px; font-family: 'baloo 2'; font-weight: 500; font-size: 2.6rem"
        >
            <mark style="background-color: #fff056;">&nbsp;&nbsp;Recent Posts&nbsp;&nbsp;</mark>
        </div>
        <post-grid
            v-if="postLoaded"
            id="key"
            :maximum-posts="3"
            :exclude-path="postData.path"
        />
        <div
            class="text-center"
            style="margin: 10px 0 28px 0; font-size:2rem"
        >
            <q-btn
                to="/blog/"
                color="primary"
                size="lg"
                no-caps
            >
                See all posts
            </q-btn>
        </div>
    </q-page>
</template>

<script lang="ts">
import {
    defineComponent, ref, reactive, onBeforeUnmount,
} from '@vue/composition-api';
import postsManager, { PostData } from 'api/posts';
import PostGrid from 'components/widgets/PostGrid.vue';
import AboutAuthor from 'components/widgets/AboutAuthor.vue';

export default defineComponent({
    name: 'Post',

    components: {
        PostGrid,
        AboutAuthor,
    },
    setup(props, ctx) {
        ctx.root.$store.commit('style/setLayoutStyle', { dark: true });

        const showScrollHint = ref(false);

        function onWindowResize() {
            showScrollHint.value = window.innerHeight > 900 && window.innerWidth > 1200;
        }
        window.addEventListener('resize', onWindowResize);
        onWindowResize();
        onBeforeUnmount(() => {
            ctx.root.$store.commit('style/setLayoutStyle', { dark: false });
        });


        const facebookShareUrl = ref('');
        const twitterShareUrl = ref('');

        const postLoaded = ref(false);

        const postData = reactive({
            content: '',
            featureImageUrl: '',
            author: '',
            publishDate: new Date(),
            modifiedDate: new Date(),
            title: '',
            excerpt: '',
            path: '',
        });

        async function updatePost(post: PostData) {
            postData.content = post.content;
            postData.author = post.author;
            postData.publishDate = post.publishDate;
            postData.modifiedDate = post.modifiedDate;
            postData.featureImageUrl = postsManager.featureImageUrl(post.featureImage);
            postData.title = post.title;
            postData.excerpt = post.excerpt;
            postData.path = post.path;
            ctx.root.$store.dispatch('currentContent/setTableOfContents', post.toc);
            postLoaded.value = true;

            const urlHash = ctx.root.$route.hash.slice(1);
            if (urlHash) {
                await new Promise((resolve) => setTimeout(resolve, 0));
                const element = document.getElementById(urlHash);
                await new Promise((resolve) => setTimeout(resolve, 0));
                if (element) {
                    element.scrollIntoView();
                }
            }

            document.title = post.title;
            // eslint-disable-next-line max-len
            facebookShareUrl.value = `https://www.facebook.com/sharer/sharer.php?u=https://www.crypticbutter.com${ctx.root.$route.path}&display=popup`;
            // eslint-disable-next-line max-len
            twitterShareUrl.value = `https://twitter.com/share?url=https://www.crypticbutter.com${ctx.root.$route.path}&text=${encodeURIComponent(postData.title)}`;

            postLoaded.value = true;
        }

        postsManager.getPost(ctx.root.$route.params.pathMatch)
            .then(updatePost);


        return {
            postData, showScrollHint, facebookShareUrl, twitterShareUrl, postLoaded,
        };
    },
});
</script>

<style lang="sass">
figure
    margin: 0

img
    max-width: 100%
</style>

<style lang="sass" scoped>

.post-page-container

.scroll-hint-icon
    text-shadow: 0px -1px 12px black
    color: lightgrey

.title-text
    background-color: rgba(0,0,0,0.85)
    color: #fff056
    font-family: "Baloo 2"
    font-size: 5rem
    font-weight: 600
    line-height: 1.6

.subtitle-text
    background-color: rgba(0,0,0,0.85)
    color: #fff056
    font-size: 1.6rem

.excerpt-text
    color: white
    font-size: 2.2rem
    font-style: italic
    font-family: "PT Sans"
    padding: 20px

// Gutenberg

.has-medium-font-size
    font-size: 2.8rem

// Custom elements

.cb-post-content-container, .cb-post-content-container-full
    background-color: #ffffff

.cb-post-content-container-full
    padding: 10px 30px
    font-size: 1.8rem
    border-radius: 4px

.cb-post-after-content
    color: #BF7C00
    text-align: center

.cb-post-content-aside
    font-style: italic
    background-color: #f4f4f4
    padding: 10px 15px 5px 15px
    margin: 0 0 10px 0
    border-width: 2px
    border-color: #f4f4f4
    border-radius: 3px

.cb-post-content-aside-text

.cb-post-content-prenotice
    background-color: #fccb4e
    padding: 20px 30px 8px 20px
    margin: 0 0 5px 0

.cb-post-content-prenotice-text
    color: #3a2a00

.cb-post-content-postnotice
    background-color: #fccb4e
    padding: 20px 30px 8px 20px
    margin: 5px 0 0 0

.cb-post-content-postnotice-text
    color: #3a2a00

.cb-has-background-secondary
    background-color: #f9f9f9

.cb-post-widget-container
    font-size: 0.85em
    max-width: 300px

.cb-static-sidebar-container
    background-color: #ffffff
    margin: -10px
    padding: 6px 8px

.cb-post-sidebar-widget
    background-color: #fffbd2
    margin: 0 -10px
    padding: 10px

.cb-post-focus-container
    background-color: #fcfbef
    padding: 10px 15px 5px 15px
    margin: 0 0 10px 0
    border-style: solid
    border-width: 2px
    border-color: #c69900
    border-radius: 3px
    color: #5e4800

.cb-button-buy-container
    width: 80%
    margin: auto

.cb-button-buy
    background-color: #67c21c
    -moz-border-radius: 2px
    -webkit-border-radius: 2px
    border-radius: 2px
    display: inline-block
    cursor: pointer
    color: #ffffff
    padding: 18px 34px
    text-decoration: none
    text-align: center
    vertical-align: baseline
    width: 100%

    &:hover
        text-decoration: none
        background-color: #6bcc1c

    &:active
        background-color: #8224e3


.author-box
    background: #f0f0f0
</style>
