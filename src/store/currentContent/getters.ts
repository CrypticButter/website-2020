import { GetterTree } from 'vuex';
import { StoreInterface } from '../index';
import { CurrentContentStateInterface } from './state';

const getters: GetterTree<CurrentContentStateInterface, StoreInterface> = {
    tableOfContents(state) {
        return state.tableOfContents;
    },
};

export default getters;
