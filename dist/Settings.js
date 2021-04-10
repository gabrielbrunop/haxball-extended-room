"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
/** Class represeting custom settings for game objects. */
class Settings {
    [Symbol.iterator]() {
        let i = 0;
        const arr = Object.values(this);
        return {
            next: () => ({
                value: arr[i++],
                done: i > arr.length
            })
        };
    }
}
exports.Settings = Settings;
//# sourceMappingURL=Settings.js.map