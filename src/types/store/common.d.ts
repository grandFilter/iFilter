import { Computed, Action, Thunk } from 'easy-peasy';

export interface ICommonModel {
    base64: string;
    setBase64: Action<ICommonModel, string>;
}