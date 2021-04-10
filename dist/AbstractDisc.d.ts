import "./headless";
import { Room } from "./Room";
/** Abstract class representing a generic disc. */
export declare abstract class AbstractDisc {
    /**
     * The room object.
     */
    protected _room: Room;
    /**
     * Creates a disc.
     *
     * @param room The room object.
     */
    constructor(room: Room);
    /**
     * The DiscObject of the disc.
     */
    protected abstract get _discObject(): DiscPropertiesObject;
    protected abstract set _discObject(properties: DiscPropertiesObject);
    /**
     * The distance between two discs.
     *
     * Returns null if one of the discs is not in game.
     *
     * @param disc A disc.
     */
    distanceTo(disc: AbstractDisc): number | null;
    /**
     * Whether two discs are colliding.
     *
     * @param disc A disc.
     */
    collidingWith(disc: AbstractDisc): boolean;
    /**
     * The x coordinate of the disc's position.
     */
    get x(): number | null | undefined;
    set x(value: number | null | undefined);
    /**
     * The y coordinate of the disc's position.
     */
    get y(): number | null | undefined;
    set y(value: number | null | undefined);
    /**
     * The x coordinate of the disc's speed vector.
     */
    get xspeed(): number | null | undefined;
    set xspeed(value: number | null | undefined);
    /**
     * The y coordinate of the disc's speed vector.
     */
    get yspeed(): number | null | undefined;
    set yspeed(value: number | null | undefined);
    /**
     * The x coordinate of the disc's gravity vector.
     */
    get xgravity(): number | null | undefined;
    set xgravity(value: number | null | undefined);
    /**
     * The y coordinate of the disc's gravity vector.
     */
    get ygravity(): number | null | undefined;
    set ygravity(value: number | null | undefined);
    /**
     * The disc's radius.
     */
    get radius(): number | null | undefined;
    set radius(value: number | null | undefined);
    /**
     * The disc's bouncing coefficient.
     */
    get bCoeff(): number | null | undefined;
    set bCoeff(value: number | null | undefined);
    /**
     * The inverse of the disc's mass.
     */
    get invMass(): number | null | undefined;
    set invMass(value: number | null | undefined);
    /**
     * The disc's damping factor.
     */
    get damping(): number | null | undefined;
    set damping(value: number | null | undefined);
    /**
     * The disc's collision mask.
     *
     * Represents which groups the disc can collide with.
     */
    get cMask(): number | null | undefined;
    set cMask(value: number | null | undefined);
    /**
     * The disc's collision groups.
     */
    get cGroup(): number | null | undefined;
    set cGroup(value: number | null | undefined);
}
