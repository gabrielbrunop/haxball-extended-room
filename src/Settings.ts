/** Class representing custom settings for game objects. */
export class Settings {
    [setting: string]: any;

    [Symbol.iterator] (): Iterator<any> {
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