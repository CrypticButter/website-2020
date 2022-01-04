import { store } from 'quasar/wrappers';
import Vuex from 'vuex';

import style from './style';
import { StyleStateInterface } from './style/state';
import currentContent from './currentContent';
import { CurrentContentStateInterface } from './currentContent/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export interface StoreInterface {
    // Define your own store structure, using submodules if needed
    // example: ExampleStateInterface;
    // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
    style: StyleStateInterface;
    currentContent: CurrentContentStateInterface;
}

export default store(({ Vue }) => {
    Vue.use(Vuex);

    const Store = new Vuex.Store<StoreInterface>({
        modules: {
            style,
            currentContent,
        },

        // enable strict mode (adds overhead!)
        // for dev mode only
        strict: !!process.env.DEV,
    });

    return Store;
});
