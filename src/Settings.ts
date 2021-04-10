/** Class represeting custom settings for game objects. */
export class Settings {
    [setting: string]: string | boolean | number;

    [Symbol.iterator] (): Iterator<string | boolean | number> {
        let i = 0;
        const arr = Object.values(this);

        return {
            next: () => ({
                value: arr[i++],
                done: i > arr.length
            })
        }
    }
}