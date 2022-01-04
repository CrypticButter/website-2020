import { MutationTree } from 'vuex';
import { CurrentContentStateInterface } from './state';

const mutation: MutationTree<CurrentContentStateInterface> = {
    setTableOfContents(state: CurrentContentStateInterface, tableOfContents) {
        state.tableOfContents = tableOfContents;
    },
};

export default mutation;
