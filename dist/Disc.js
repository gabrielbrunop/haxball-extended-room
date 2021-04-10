"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Disc = void 0;
const AbstractDisc_1 = require("./AbstractDisc");
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
        this.index = discIndex;
    }
    /**
     * The number of discs of the map.
     */
    get size() {
        return this._room.discCount;
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