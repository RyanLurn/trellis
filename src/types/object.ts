export type OmitKnownKeys<T, K extends keyof T> = Omit<T, K>;

export type ValueOf<T extends object> = T[keyof T];
