import { AbstractDisc } from "./AbstractDisc";
import { Room } from "./Room";
import { Settings } from "./Settings";
/** A class representing a disc. */
export declare class Disc extends AbstractDisc {
    /**
     * The disc's index.
     */
    index: number;
    /**
     * Disc custom settings.
     */
    settings: Settings;
    /**
     * Creates a disc object.
     *
     * @param room The room object.
     * @param discIndex The disc's index.
     */
    constructor(room: Room, discIndex: number);
    /**
     * The DiscObject of the disc.
     */
    protected get _discObject(): DiscPropertiesObject;
    protected set _discObject(properties: DiscPropertiesObject);
    /**
     * The disc's color.
     *
     * Set the value to -1 to make the disc transparent.
     */
    get color(): number | null | undefined;
    set color(value: number | null | undefined);
}
