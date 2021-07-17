"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pause = void 0;
class Pause {
    constructor(_room, callback, waitTime) {
        this._room = _room;
        this.callback = callback;
        this._destroyed = false;
        if (waitTime) {
            setTimeout(() => {
                if (!this._destroyed)
                    this.unpause();
            }, waitTime);
        }
        _room.forcePause();
    }
    unpause(runCallback = true, time = 0) {
        if (time === 0) {
            const willUnpause = this._room.removePause(this);
            this._destroyed = true;
            if (runCallback && this.callback)
                this.callback(willUnpause);
            return willUnpause;
        }
        else {
            setTimeout(() => {
                const willUnpause = this._room.removePause(this);
                this._destroyed = true;
                if (runCallback && this.callback)
                    this.callback(willUnpause);
            }, time);
            return false;
        }
    }
}
exports.Pause = Pause;
//# sourceMappingURL=Pause.js.map