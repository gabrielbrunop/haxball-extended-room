import "./types";
import { Player } from "./Player";
import { Room } from "./Room";
/** Class representing a list of players. */
export declare class PlayerList {
    [id: number]: Player;
    /**
     * Creates a PlayerList object.
     *
     * @param items An array of players.
     */
    constructor(...items: Player[]);
    [Symbol.iterator](): Iterator<Player>;
    /**
     * How many players are on the list.
     */
    get size(): number;
    /**
     * Adds a player to the list.
     *
     * @param player A player.
     */
    add(player: Player): void;
    /**
     * Removes a player from the list.
     *
     * @param player A player, a PlayerObject or a player ID.
     */
    remove(player: Player | PlayerObject | number): void;
    /**
     * Gets a player from the list.
     *
     * If you're using this to find players by their ID, consider using `players[id]` instead.
     *
     * @param predicate A player ID or a function.
     */
    get(predicate: number | ((player: Player) => boolean)): Player | undefined;
    /**
     * Gets multiple players based on a filtering function.
     *
     * @param predicate A function.
     */
    getAll(predicate: (player: Player) => boolean): PlayerList;
    /**
     * Gets an array of all players.
     */
    values(): Array<Player>;
    /**
     * Gets the players according to their order in the room list.
     *
     * @param room A room object.
     */
    order(room: Room): PlayerList;
    /**
     * Gets the first player on the list.
     */
    first(): Player;
    /**
     * Gets the last player on the list.
     */
    last(): Player | undefined;
    /**
     * Gets a player by their name.
     *
     * @param name The name of the player.
     */
    getByName(name: string): PlayerList;
    /**
     * Gets a player by their public ID.
     *
     * @param auth The Public ID of the player.
     */
    getByAuth(auth: string): Player | undefined;
    /**
     * Gets players by their conn or IP.
     *
     * @param connOrIP A conn value or IP.
     */
    getByConnOrIP(connOrIP: string): PlayerList;
    /**
     * Kicks all players on the list.
     *
     * @param reason
     */
    kick(reason?: string): void;
    /**
     * Bans all players on the list.
     *
     * @param reason
     */
    ban(reason?: string): void;
    /**
     * Gets the room's spectators.
     */
    spectators(): PlayerList;
    /**
     * Gets the red team's players.
     */
    red(): PlayerList;
    /**
     * Gets the blue team's players.
     */
    blue(): PlayerList;
    /**
     * Gets the red and blue teams' players.
     */
    teams(): PlayerList;
    /**
     * Gets all players with admin status.
     */
    admins(): PlayerList;
    /**
     * Sends a private message to all players on the list.
     *
     * @param message A message object.
     */
    reply(message: MessageObject): void;
    /**
     * String representation of a PlayerList.
     */
    toString(): string;
}
