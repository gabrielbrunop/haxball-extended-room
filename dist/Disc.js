"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Disc = void 0;
const AbstractDisc_1 = require("./AbstractDisc");
const Settings_1 = require("./Settings");
/** A class representing a disc. */
class Disc extends AbstractDisc_1.AbstractDisc {
    /**
     * Creates a disc object.
     *
     * @param room The room object.
     * @param discIndex The disc's index.
     */
    constructor(room, discIndex) {
        super(room);
        /**
         * Disc custom settings.
         */
        this.settings = new Settings_1.Settings();
        this.index = discIndex;
    }
    /**
     * The DiscObject of the disc.
     */
    get _discObject() {
        return this._room.native.getDiscProperties(this.index);
    }
    set _discObject(properties) {
        this._room.native.setDiscProperties(this.index, properties);
    }
    /**
     * The disc's color.
     *
     * Set the value to -1 to make the disc transparent.
     */
    get color() {
        return this._discObject.color;
    }
    set color(value) {
        this._discObject = { color: value };
    }
}
exports.Disc = Disc;
//# sourceMappingURL=Disc.js.map