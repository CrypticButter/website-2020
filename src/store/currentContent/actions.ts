import { ActionTree } from 'vuex';
import { StoreInterface } from '../index';
import { CurrentContentStateInterface } from './state';

const actions: ActionTree<CurrentContentStateInterface, StoreInterface> = {
    setTableOfContents(context, tableOfContents) {
        context.commit('setTableOfContents', tableOfContents);
    },
};

export default actions;
