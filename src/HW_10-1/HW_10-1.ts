// Вам потрібно створити тип DeepReadonly який буде робити доступними тільки для читання навіть властивості вкладених обʼєктів.
// Вам потрібно створити тип DeepRequireReadonly який буде робити доступними тільки для читання навіть властивості вкладених обʼєктів та ще й робити їх обовʼязковими.
// Вам потрібно створити тип UpperCaseKeys, який буде приводити всі ключі до верхнього регістру.
// І саме цікаве. Створіть тип ObjectToPropertyDescriptor, який перетворює звичайний обʼєкт на обʼєкт де кожне value є дескриптором.


type DeepReadonly<T> =
    T extends (...args: any[]) => any
        ? T
        : T extends object
            ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
            : T;

type DeepRequireReadonly<T> =
    T extends (...args: any[]) => any
        ? T
        : T extends object
            ? { readonly [K in keyof T]-?: DeepRequireReadonly<T[K]> }
            : T;

type UpperCaseKeys<T> = {
    [K in keyof T as K extends string ? Uppercase<K> : never]: T[K];
};

type ObjectToPropertyDescriptor<T> = {
    [K in keyof T]: {
        value: T[K];
        writable?: boolean;
        configurable?: boolean;
        enumerable?: boolean;
    };
};