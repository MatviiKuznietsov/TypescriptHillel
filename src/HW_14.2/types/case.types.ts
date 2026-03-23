export type SnakeToCamel<T extends string> =
  T extends `${infer First}_${infer Second}${infer Rest}`
    ? `${First}${Uppercase<Second>}${SnakeToCamel<Rest>}`
    : T;

export type CamelToSnake<T extends string> =
  T extends `${infer First}${infer Rest}`
    ? Rest extends Uncapitalize<Rest>
      ? `${Lowercase<First>}${CamelToSnake<Rest>}`
      : `${Lowercase<First>}_${CamelToSnake<Rest>}`
    : T;

export type MapToSnakeCaseDTO<T> = {
  [K in keyof T as CamelToSnake<K & string>]: T[K];
};

export type MapToCamelCaseDomain<T> = {
  [K in keyof T as SnakeToCamel<K & string>]: T[K];
};