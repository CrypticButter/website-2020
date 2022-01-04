import axios from 'axios';
import { TableOfContents } from 'src/utils/article-outline';

const featureImageBaseUrl = 'https://www.crypticbutter.com/postdata/feature-image/';

export interface PostData {
    author: string;
    publishDate: Date;
    modifiedDate: Date;
    featureImage: string;
    title: string;
    excerpt: string;
    path: string;
    content: string;
    toc: TableOfContents;
}
export enum FeatureImageSize {
    Full = 'full',
    Thumb = 'thumb'
}

const uriBase = 'https://www.crypticbutter.com/';
const postsJsonPath = `${uriBase}posts.json`;

let cachedPosts: PostData[];

async function fetchPosts(): Promise<PostData[]> {
    if (!cachedPosts) {
        try {
            const response = await axios.get(postsJsonPath);
            cachedPosts = response.data;
            cachedPosts.forEach((post: any) => {
                post.publishDate = new Date(post.publishDate);
                post.modifiedDate = new Date(post.modifiedDate);
            });
        } catch (error) {
            throw new Error('Unable to get posts');
        }
    }
    return cachedPosts;
}

function sortPostsByDate(posts: Array<any>) {
    posts.sort((a: any, b: any) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
}

export default {
    async getPost(path: string) {
        if (path.endsWith('/')) {
            path = path.slice(0, -1);
        }

        const posts = await fetchPosts();
        const matches = posts.filter((p: any) => p.path === path);
        if (matches.length !== 1) {
            throw new Error(`Found ${matches.length} matches for that path`);
        }

        return matches[0];
    },

    async getRecentPosts(limit = -1, start = 0) {
        limit += start;
        const posts = (await fetchPosts()).slice();
        if (!posts) {
            return [];
        }
        sortPostsByDate(posts);
        return posts.slice(start, limit);
    },

    async getRecentPostsFiltered(limit = -1, start = 0, filter: (post: PostData, index: number, array: object[]) => boolean) {
        limit += start;
        let posts: PostData[] = (await fetchPosts()).slice();
        if (!posts) {
            return [];
        }
        posts = posts.filter(filter);
        sortPostsByDate(posts);
        return posts.slice(start, limit);
    },

    async howManyPosts() {
        const posts = await fetchPosts();
        return posts.length;
    },

    featureImageUrl(featureImage: string, size = FeatureImageSize.Full) {
        return `${featureImageBaseUrl + size}/${featureImage}`;
    },
};
