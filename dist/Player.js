"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
require("./types");
const AbstractDisc_1 = require("./AbstractDisc");
const Settings_1 = require("./Settings");
const ConnectionHistory = __importStar(require("./ConnectionHistory"));
/** A class representing a player */
class Player extends AbstractDisc_1.AbstractDisc {
    /**
     * Creates a Player object.
     *
     * @param room The room object.
     * @param playerObject The player basic information.
     */
    constructor(room, playerObject) {
        super(room);
        /**
         * The limit distance to a disc that prevents it from being kicked by the player.
         *
         * The ball will be kickable at any distance shorter than this.
         * @private
         */
        this._kickLimitDistance = 4;
        /**
         * The users' permission roles.
         *
         * Roles are used as a permission system by commands.
         *
         * If a command has been defined with a certain role, it'll check whether the player has it too.
         *
         * The "admin" role is restricted and will be automatically assigned to players with admin status.
         * @private
         */
        this._roles = [];
        /**
         * Player custom settings.
         *
         * This is useful if you want to create your own properties for your players.
         *
         * @example
         * // Create prefixes for your players' messages
         *
         * room.onPlayerJoin = function (player) {
         *      // Set up prefix setting
         *      player.settings.prefix = "[Top 1]";
         * }
         *
         * room.onPlayerChat = function (player, message) {
         *      // Override the player's message with the new prefix setting
         *      room.send({ message: `${player.settings.prefix} ${player.name}: ${message}` });
         *      return false;
         * }
         */
        this.settings = new Settings_1.Settings();
        this.name = playerObject.name;
        this.id = playerObject.id;
        this.auth = playerObject.auth;
        this.conn = playerObject.conn;
        this.ip = this._decodeConn(this.conn);
    }
    /**
     * Fetches the player's geolocation based on their IP, stores it on the `geolocation` property and returns it.
     *
     * This can fail if the fetch operation fails.
     */
    fetchGeoLocation() {
        return __awaiter(this, void 0, void 0, function* () {
            const connHistory = yield ConnectionHistory.get(this.ip);
            if (connHistory) {
                if (connHistory.geo) {
                    this._geo = connHistory.geo;
                    return this._geo;
                }
            }
            const request = yield fetch(`https://ipapi.co/${this.ip}/json/`);
            const response = yield request.json();
            this._geo = {
                city: response.city,
                continent: response.continent_code,
                country: response.country,
                language: response.languages.split(",")[0],
                org: response.org,
                region: response.region,
                timezone: response.timezone,
            };
            return this._geo;
        });
    }
    /**
     * Decodes the `conn` property to get the player's IP.
     *
     * @param hex The string to be decoded.
     */
    _decodeConn(str) {
        return decodeURIComponent(str.replace(/(..)/g, '%$1'));
    }
    /**
     * Overrides the player's avatar.
     *
     * @param avatar The new avatar.
     */
    setAvatar(avatar) {
        this._room.native.setPlayerAvatar(this.id, avatar);
    }
    /**
     * Removes the overrider for the player's avatar.
     */
    clearAvatar() {
        this._room.native.setPlayerAvatar(this.id, null);
    }
    /**
     * Kicks the player from the room.
     */
    kick(reason) {
        this._room.native.kickPlayer(this.id, reason !== null && reason !== void 0 ? reason : "", false);
    }
    /**
     * Bans the player from joining again.
     *
     * Haxball bans are IP bans, so if the player changes their IP, they will be able to join the room again.
     */
    ban(reason) {
        this._room.native.kickPlayer(this.id, reason !== null && reason !== void 0 ? reason : "", true);
    }
    /**
     * Sends a private message to the player.
     *
     * @param message The message object.
     */
    reply(message) {
        message.targetID = this.id;
        this._room.send(message);
    }
    /**
     * Checks whether a player is in a kickable distance relative to the specified disc.
     *
     * @param disc A disc in the map.
     */
    canKick(disc) {
        const distance = disc.distanceTo(this);
        return distance ? distance < this._kickLimitDistance : false;
    }
    /**
     * Attaches a new role to the player.
     *
     * @param role
     */
    addRole(role) {
        this._roles.push(role);
    }
    /**
     * Removes a player's role.
     *
     * @param role
     */
    removeRole(role) {
        this._roles = this._roles.filter(r => r !== role);
    }
    /**
     * Checks whether a player has the specified role.
     *
     * @param role
     */
    hasRole(role) {
        if (role === "admin" && this.admin)
            return true;
        return this._roles.includes(role);
    }
    /**
     * The PlayerObject of the player.
     */
    get _playerObject() {
        return this._room.native.getPlayer(this.id);
    }
    /**
     * The DiscObject of the player.
     */
    get _discObject() {
        return this._room.native.getPlayerDiscProperties(this.id);
    }
    set _discObject(properties) {
        this._room.native.setPlayerDiscProperties(this.id, properties);
    }
    /**
     * The player's team.
     */
    get team() {
        var _a;
        return (_a = this._playerObject) === null || _a === void 0 ? void 0 : _a.team;
    }
    set team(team) {
        this._room.native.setPlayerTeam(this.id, team);
    }
    /**
     * The player's roles.
     *
     * Roles are used as a permission system by commands.
     *
     * If a command has been defined with a certain role, it'll check whether the player has it too.
     *
     * The "admin" role is restricted and will be automatically assigned to players with admin status.
     */
    get roles() {
        return this.admin ? ["admin", ...this._roles] : this._roles;
    }
    /**
     * The player's admin status.
     */
    get admin() {
        var _a;
        return (_a = this._playerObject) === null || _a === void 0 ? void 0 : _a.admin;
    }
    set admin(value) {
        this._room.native.setPlayerAdmin(this.id, value);
    }
    /**
     * The player's position in the map.
     */
    get position() {
        var _a;
        return (_a = this._playerObject) === null || _a === void 0 ? void 0 : _a.position;
    }
    set position(pos) {
        this._discObject = { x: pos.x, y: pos.y };
    }
    /**
     * The player's tag (name #id).
     */
    get tag() {
        return `${this.name} #${this.id}`;
    }
    /**
     * The player's mention (`@player`).
     */
    get mention() {
        return `@${this.name.replace(/ /g, "_")}`;
    }
    /**
     * The player's geolocation based on their IP.
     *
     * This value is not set at the `onPlayerJoin` event and will be null until it is fetched.
     *
     * Once fetched, the `onPlayerGeoLocationFetch` event will be called.
     */
    get geolocation() {
        if (!this._geo) {
            throw new Error("Geolocation has not been fetched yet.");
        }
        return this._geo;
    }
}
exports.Player = Player;
//# sourceMappingURL=Player.js.map