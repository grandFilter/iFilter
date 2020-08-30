import { createStore, createTypedHooks } from 'easy-peasy';

import common from './common';
import effect from './effect';
import SVG from './SVG';

export const storeModel = {
    common,
    effect,
    SVG,
};

export const store = createStore(storeModel);

// hook
const typedHooks = createTypedHooks<typeof storeModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStore = typedHooks.useStore;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
