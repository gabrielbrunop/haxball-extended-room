import { AbstractDisc } from "./AbstractDisc";
import { Room } from "./Room";
import { Settings } from "./Settings";

/** A class representing a disc. */
export class Disc extends AbstractDisc {
    /**
     * The disc's index.
     */
    index: number;
    
    /**
     * Disc custom settings.
     */
    settings: Settings = {};

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