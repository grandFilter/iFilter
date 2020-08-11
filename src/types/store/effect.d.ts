import { Computed, Action, Thunk } from 'easy-peasy';
import { IDictionary } from '@/types';

export interface IEffectModel {
    active: number;
    CSSgramList: { name: string; filter: name; after?: any; before?: any }[];

    activeFilter: Computed<IEffectModel, IDictionary>;

    setActive: Action<IEffectModel, number>;
}
