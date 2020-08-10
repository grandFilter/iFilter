import { Computed, Action, Thunk } from 'easy-peasy';

export interface IEffectModel {
    active: number;
    CSSgramList: { name: string; filter: name }[];

    activeFilter: Computed<IEffectModel, string>;

    setActive: Action<IEffectModel, number>;
}
