import { createStore, createTypedHooks } from 'easy-peasy';

export const storeModel = {};

export const store = createStore(storeModel);

// hook
const typedHooks = createTypedHooks<typeof storeModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStore = typedHooks.useStore;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
