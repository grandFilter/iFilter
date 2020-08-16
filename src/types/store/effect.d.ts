import { Computed, Action } from 'easy-peasy';

export interface IEffectModel {
    active: number;
    CSSgramList: { name: string; className: string; opacity: number }[];

    activeFilter: Computed<IEffectModel, { name: string; className: string; opacity: number }>;

    setActive: Action<IEffectModel, number>;
    setOpacity: Action<IEffectModel, number>;
}
