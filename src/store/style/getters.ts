import { GetterTree } from 'vuex';
import { StoreInterface } from '../index';
import { StyleStateInterface } from './state';

const getters: GetterTree<StyleStateInterface, StoreInterface> = {
    darkLayoutEnabled(state) {
        return state.darkLayout;
    },
};

export default getters;
