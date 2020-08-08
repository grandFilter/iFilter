export interface IDictionary<T = any> {
    [index: string]: T;
}

export type ICallback<T = any, R = void> = (e?: T) => R;
