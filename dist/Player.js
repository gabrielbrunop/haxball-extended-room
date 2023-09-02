"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
require("./types");
const AbstractDisc_1 = require("./AbstractDisc");
const RoleList_1 = require("./RoleList");
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
         * @private
         */
        this._roles = new RoleList_1.RoleList();
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
        this.settings = {};
        /**
         * Cooldown in seconds between commands.
         */
        this.commandsCooldown = 0;
        /**
         * Whether the player is able to read the room chat.
         *
         * If this is false, the `Room.send` and `Room.chat` methods will ignore this player.
         *
         * This won't have any effect on the native `sendAnnouncement` and `sendChat` methods, though.
         */
        this.canReadChat = true;
        /**
         * Whether the player is able to use commands.
         *
         * If this is false, commands will be ignored for this player.
         */
        this.canUseCommands = true;
        /**
         * The last time the player ran a command.
         */
        this._lastCommandTime = 0;
        this.name = playerObject.name;
        this.id = playerObject.id;
        this.auth = playerObject.auth;
        this.conn = playerObject.conn;
        this.ip = this._decodeConn(this.conn);
    }
    /**
     * Decodes the `conn` property to get the player's IP.
     *
     * @param str The string to be decoded.
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
        if (!this.canReadChat)
            return;
        message.targetID = this.id;
        this._room.send(message);
    }
    /**
     * Checks whether the player is in a kickable distance relative to the specified disc.
     *
     * @param disc A disc in the map.
     */
    canKick(disc) {
        const distance = disc.distanceTo(this);
        return distance ? distance < this._kickLimitDistance : false;
    }
    /**
     * Checks whether the player can execute commands now based on their command cooldown settings.
     */
    canRunCommandsCooldown() {
        return Date.now() - this._lastCommandTime > this.commandsCooldown * 1000;
    }
    /**
     * Updates the command cooldown last command time.
     */
    updateCooldown() {
        this._lastCommandTime = Date.now();
    }
    /**
     * Attaches a new role to the player.
     *
     * @param role
     */
    addRole(role) {
        this._roles.add(role);
    }
    /**
     * Removes a player's role.
     *
     * @param role
     */
    removeRole(role) {
        this._roles.remove(role);
    }
    /**
     * Checks whether a player has the specified role.
     *
     * @param role
     */
    hasRole(role) {
        return this._roles.has(role);
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
     */
    get roles() {
        return this._roles.roles;
    }
    get topRole() {
        return this.roles.sort((a, b) => b.position - a.position)[0];
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
}
exports.Player = Player;
//# sourceMappingURL=Player.js.map