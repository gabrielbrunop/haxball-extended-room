/** Type representing custom settings for game objects. */
export type Settings<T extends {} = {}> = Partial<T> & {
    [setting: string]: any;
};