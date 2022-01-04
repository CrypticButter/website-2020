import { MutationTree } from 'vuex';
import { StyleStateInterface } from './state';

export interface LayoutStyleOptionsInterface {
    dark?: boolean;
}

const mutation: MutationTree<StyleStateInterface> = {
    setLayoutStyle(state: StyleStateInterface, options: LayoutStyleOptionsInterface) {
        if (options.dark != null) {
            state.darkLayout = options.dark;
        }
    },
};

export default mutation;
