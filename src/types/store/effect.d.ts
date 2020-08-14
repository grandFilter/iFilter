import { Computed, Action } from 'easy-peasy';

export interface IEffectModel {
    active: number;
    CSSgramList: { name: string; className: string }[];

    activeFilter: Computed<IEffectModel, { name: string; className: string }>;

    setActive: Action<IEffectModel, number>;
}
