import { ActionTree } from 'vuex';
import { StoreInterface } from '../index';
import { StyleStateInterface } from './state';

const actions: ActionTree<StyleStateInterface, StoreInterface> = {
    someAction(/* context */) {
    // your code
    },
};

export default actions;
