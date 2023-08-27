import "./headless";
import { Room } from "./Room";
import { Settings } from "./Settings";

/** Abstract class representing a generic disc. */
export abstract class AbstractDisc {
    /**
     * The room object.
     */
    protected _room: Room;

    /**
     * Custom settings.
     */
    abstract settings: Settings;

    /**
     * Creates a disc.
     * 
     * @param room The room object.
     */
    constructor(room: Room) {
        this._room = room;
    }

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
    distanceTo(disc: AbstractDisc): number | null {
        if (isNaN(parseInt(this.x + "")) || isNaN(parseInt(this.y + ""))) return null;
        if (isNaN(parseInt(disc.x + "")) || isNaN(parseInt(disc.y + ""))) return null;
        if (isNaN(parseInt(this.radius + "")) || isNaN(parseInt(disc.x + ""))) return null;

        const x1 = this.x as number;
        const y1 = this.y as number;
        const r1 = this.radius as number;

        const x2 = disc.x as number;
        const y2 = disc.y as number;
        const r2 = disc.radius as number;

        const dx = x1 - x2;
        const dy = y1 - y2;

        const c = Math.sqrt(dx * dx + dy * dy);

        return Math.max(0, c - r1 - r2);
    }

    /**
     * Whether two discs are colliding.
     * 
     * @param disc A disc.
     */
    collidingWith(disc: AbstractDisc): boolean {
        const distance = this.distanceTo(disc);
        return distance ? distance <= 0 : false;
    }

    /**
     * The x coordinate of the disc's position.
     */
    get x(): number | null | undefined {
        return this._discObject?.x;
    }

    set x(value: number | null | undefined) {
        this._discObject = { x: value };
    }

    /**
     * The y coordinate of the disc's position.
     */
    get y(): number | null | undefined {
        return this._discObject?.y;
    }

    set y(value: number | null | undefined) {
        this._discObject = { y: value };
    }

    /**
     * The x coordinate of the disc's speed vector.
     */
    get xspeed(): number | null | undefined {
        return this._discObject?.xspeed;
    }

    set xspeed(value: number | null | undefined) {
        this._discObject = { xspeed: value };
    }

    /**
     * The y coordinate of the disc's speed vector.
     */
    get yspeed(): number | null | undefined {
        return this._discObject?.yspeed;
    }

    set yspeed(value: number | null | undefined) {
        this._discObject = { yspeed: value };
    }

    /**
     * The x coordinate of the disc's gravity vector.
     */
    get xgravity(): number | null | undefined {
        return this._discObject?.xgravity;
    }

    set xgravity(value: number | null | undefined) {
        this._discObject = { xgravity: value };
    }

    /**
     * The y coordinate of the disc's gravity vector.
     */
    get ygravity(): number | null | undefined {
        return this._discObject?.ygravity;
    }

    set ygravity(value: number | null | undefined) {
        this._discObject = { ygravity: value };
    }

    /**
     * The disc's radius.
     */
    get radius(): number | null | undefined {
        return this._discObject?.radius;
    }

    set radius(value: number | null | undefined) {
        this._discObject = { radius: value };
    }

    /**
     * The disc's bouncing coefficient.
     */
    get bCoeff(): number | null | undefined {
        return this._discObject?.bCoeff;
    }

    set bCoeff(value: number | null | undefined) {
        this._discObject = { bCoeff: value };
    }
    
    /**
     * The inverse of the disc's mass.
     */
    get invMass(): number | null | undefined {
        return this._discObject?.invMass;
    }
    
    set invMass(value: number | null | undefined) {
        this._discObject = { invMass: value };
    }

    /**
     * The disc's damping factor.
     */
    get damping(): number | null | undefined {
        return this._discObject?.damping;
    }

    set damping(value: number | null | undefined) {
        this._discObject = { damping: value };
    }

    /**
     * The disc's collision mask.
     * 
     * Represents which groups the disc can collide with.
     */
    get cMask(): number | null | undefined {
        return this._discObject?.cMask;
    }

    set cMask(value: number | null | undefined) {
        this._discObject = { cMask: value };
    }

    /**
     * The disc's collision groups.
     */
    get cGroup(): number | null | undefined {
        return this._discObject?.cGroup;
    }

    set cGroup(value: number | null | undefined) {
        this._discObject = { cGroup: value };
    }
}