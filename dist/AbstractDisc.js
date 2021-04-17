"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractDisc = void 0;
require("./headless");
/** Abstract class representing a generic disc. */
class AbstractDisc {
    /**
     * Creates a disc.
     *
     * @param room The room object.
     */
    constructor(room) {
        this._room = room;
    }
    /**
     * The distance between two discs.
     *
     * Returns null if one of the discs is not in game.
     *
     * @param disc A disc.
     */
    distanceTo(disc) {
        if (isNaN(parseInt(this.x + "")) || isNaN(parseInt(this.y + "")))
            return null;
        if (isNaN(parseInt(disc.x + "")) || isNaN(parseInt(disc.y + "")))
            return null;
        if (isNaN(parseInt(this.radius + "")) || isNaN(parseInt(disc.x + "")))
            return null;
        const x1 = this.x;
        const y1 = this.y;
        const r1 = this.radius;
        const x2 = disc.x;
        const y2 = disc.y;
        const r2 = disc.radius;
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
    collidingWith(disc) {
        const distance = this.distanceTo(disc);
        return distance ? distance <= 0 : false;
    }
    /**
     * The x coordinate of the disc's position.
     */
    get x() {
        var _a;
        return (_a = this._discObject) === null || _a === void 0 ? void 0 : _a.x;
    }
    set x(value) {
        this._discObject = { x: value };
    }
    /**
     * The y coordinate of the disc's position.
     */
    get y() {
        var _a;
        return (_a = this._discObject) === null || _a === void 0 ? void 0 : _a.y;
    }
    set y(value) {
        this._discObject = { y: value };
    }
    /**
     * The x coordinate of the disc's speed vector.
     */
    get xspeed() {
        var _a;
        return (_a = this._discObject) === null || _a === void 0 ? void 0 : _a.xspeed;
    }
    set xspeed(value) {
        this._discObject = { xspeed: value };
    }
    /**
     * The y coordinate of the disc's speed vector.
     */
    get yspeed() {
        var _a;
        return (_a = this._discObject) === null || _a === void 0 ? void 0 : _a.yspeed;
    }
    set yspeed(value) {
        this._discObject = { yspeed: value };
    }
    /**
     * The x coordinate of the disc's gravity vector.
     */
    get xgravity() {
        var _a;
        return (_a = this._discObject) === null || _a === void 0 ? void 0 : _a.xgravity;
    }
    set xgravity(value) {
        this._discObject = { xgravity: value };
    }
    /**
     * The y coordinate of the disc's gravity vector.
     */
    get ygravity() {
        var _a;
        return (_a = this._discObject) === null || _a === void 0 ? void 0 : _a.ygravity;
    }
    set ygravity(value) {
        this._discObject = { ygravity: value };
    }
    /**
     * The disc's radius.
     */
    get radius() {
        var _a;
        return (_a = this._discObject) === null || _a === void 0 ? void 0 : _a.radius;
    }
    set radius(value) {
        this._discObject = { radius: value };
    }
    /**
     * The disc's bouncing coefficient.
     */
    get bCoeff() {
        var _a;
        return (_a = this._discObject) === null || _a === void 0 ? void 0 : _a.bCoeff;
    }
    set bCoeff(value) {
        this._discObject = { bCoeff: value };
    }
    /**
     * The inverse of the disc's mass.
     */
    get invMass() {
        var _a;
        return (_a = this._discObject) === null || _a === void 0 ? void 0 : _a.invMass;
    }
    set invMass(value) {
        this._discObject = { invMass: value };
    }
    /**
     * The disc's damping factor.
     */
    get damping() {
        var _a;
        return (_a = this._discObject) === null || _a === void 0 ? void 0 : _a.damping;
    }
    set damping(value) {
        this._discObject = { damping: value };
    }
    /**
     * The disc's collision mask.
     *
     * Represents which groups the disc can collide with.
     */
    get cMask() {
        var _a;
        return (_a = this._discObject) === null || _a === void 0 ? void 0 : _a.cMask;
    }
    set cMask(value) {
        this._discObject = { cMask: value };
    }
    /**
     * The disc's collision groups.
     */
    get cGroup() {
        var _a;
        return (_a = this._discObject) === null || _a === void 0 ? void 0 : _a.cGroup;
    }
    set cGroup(value) {
        this._discObject = { cGroup: value };
    }
}
exports.AbstractDisc = AbstractDisc;
//# sourceMappingURL=AbstractDisc.js.map