"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerList = void 0;
require("./types");
const Global_1 = require("./Global");
/** Class representing a list of players. */
class PlayerList {
    /**
     * Creates a PlayerList object.
     *
     * @param items An array of players.
     */
    constructor(...items) {
        items.forEach(p => this.add(p));
    }
    [Symbol.iterator]() {
        let i = 0;
        const arr = this.values();
        return {
            next: () => ({
                value: arr[i++],
                done: i > arr.length
            })
        };
    }
    /**
     * How many players are on the list.
     */
    get size() {
        return this.values().length;
    }
    /**
     * Adds a player to the list.
     *
     * @param player A player.
     */
    add(player) {
        this[player.id] = player;
    }
    /**
     * Removes a player from the list.
     *
     * @param player A player, a PlayerObject or a player ID.
     */
    remove(player) {
        delete this[typeof player === "number" ? player : player.id];
    }
    /**
     * Gets a player from the list.
     *
     * If you're using this to find players by their ID, consider using `players[id]` instead.
     *
     * @param predicate A player ID or a function.
     */
    get(predicate) {
        if (typeof predicate === "undefined")
            return;
        if (typeof predicate === "number")
            return this[predicate];
        for (const player of this) {
            if (predicate(player))
                return player;
        }
    }
    /**
     * Gets multiple players based on a filtering function.
     *
     * @param predicate A function.
     */
    getAll(predicate) {
        const players = new PlayerList();
        for (const player of this) {
            if (predicate(player)) {
                players.add(player);
            }
        }
        return players;
    }
    /**
     * Gets an array of all players.
     */
    values() {
        return Object.values(this);
    }
    /**
     * Gets the players according to their order in the room list.
     *
     * @param room A room object.
     */
    order(room) {
        const orderedList = this.values();
        const playerList = room.native.getPlayerList();
        orderedList.sort((a, b) => playerList.findIndex(p => p.id === a.id) - playerList.findIndex(p => p.id === b.id));
        return new PlayerList(...orderedList);
    }
    /**
     * Gets the first player on the list.
     */
    first() {
        return this.values()[0];
    }
    /**
     * Gets the last player on the list.
     */
    last() {
        return this.values().pop();
    }
    /**
     * Gets a player by their name.
     *
     * @param name The name of the player.
     */
    getByName(name) {
        return this.getAll(player => player.name === name);
    }
    /**
     * Gets a player by their public ID.
     *
     * @param auth The Public ID of the player.
     */
    getByAuth(auth) {
        return this.get(player => player.auth === auth);
    }
    /**
     * Gets players by their conn or IP.
     *
     * @param connOrIP A conn value or IP.
     */
    getByConnOrIP(connOrIP) {
        var _a;
        return (_a = this.getAll(player => player.conn === connOrIP)) !== null && _a !== void 0 ? _a : this.getAll(player => player.ip === connOrIP);
    }
    /**
     * Kicks all players on the list.
     *
     * @param reason
     */
    kick(reason) {
        this.values().forEach(player => player.kick(reason));
    }
    /**
     * Bans all players on the list.
     *
     * @param reason
     */
    ban(reason) {
        this.values().forEach(player => player.ban(reason));
    }
    /**
     * Gets the room's spectators.
     */
    spectators() {
        return this.getAll(player => player.team === Global_1.Teams.Spectators);
    }
    /**
     * Gets the red team's players.
     */
    red() {
        return this.getAll(player => player.team === Global_1.Teams.Red);
    }
    /**
     * Gets the blue team's players.
     */
    blue() {
        return this.getAll(player => player.team === Global_1.Teams.Blue);
    }
    /**
     * Gets the red and blue teams' players.
     */
    teams() {
        return this.getAll(player => player.team !== Global_1.Teams.Spectators);
    }
    /**
     * Gets all players with admin status.
     */
    admins() {
        return this.getAll(player => player.admin);
    }
    /**
     * Sends a private message to all players on the list.
     *
     * @param message A message object.
     */
    reply(message) {
        for (const player of this) {
            player.reply(message);
        }
    }
    /**
     * String representation of a PlayerList.
     */
    toString() {
        return this.values().map(p => `${p.name} (${p.id})`).join(", ");
    }
}
exports.PlayerList = PlayerList;
//# sourceMappingURL=PlayerList.js.map