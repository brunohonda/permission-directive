type OneOf<T extends Record<string, any>> = {
  [K in keyof T]: {
    [P in K]: T[K];
  } & {
    [P in Exclude<keyof T, K>]?: never;
  }
}[keyof T];

type ExprMap = {
  and: Array<string | BooleanExpression>;
  or: Array<string | BooleanExpression>;
};

export type BooleanExpression = OneOf<ExprMap> | string;
