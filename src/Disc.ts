import { AbstractDisc } from "./AbstractDisc";
import { Room } from "./Room";

/** A class representing a disc. */
export class Disc extends AbstractDisc {
    /**
     * The disc's index.
     */
    readonly index: number;

    /**
     * Creates a disc object.
     * 
     * @param room The room object.
     * @param discIndex The disc's index.
     */
    constructor(room: Room, discIndex: number) {
        super(room);

        this.index = discIndex;
    }

    /**
     * The number of discs of the map.
     */
    get size(): number {
        return this._room.discCount;
    }

    /**
     * The DiscObject of the disc.
     */
    protected get _discObject(): DiscPropertiesObject {
        return this._room.native.getDiscProperties(this.index);
    }

    protected set _discObject(properties: DiscPropertiesObject) {
        this._room.native.setDiscProperties(this.index, properties);
    }

    /**
     * The disc's color.
     * 
     * Set the value to -1 to make the disc transparent.
     */
    get color(): number | null | undefined {
        return this._discObject.color;
    }

    set color(value: number | null | undefined) {
        this._discObject = { color: value };
    }
}