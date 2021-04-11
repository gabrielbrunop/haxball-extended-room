import "./types";
import { AbstractDisc } from "./AbstractDisc";
import { Disc } from "./Disc";
import { Room } from "./Room";
import { Settings } from "./Settings";
/**
 * Player's geolocation information.
 */
export interface PlayerGeoLocation {
    /**
     * The player's approximate city. This is often not accurate.
     */
    city: string;
    /**
     * The player's continent. Very accurate.
     */
    continent: string;
    /**
     * The player's country. Mostly accurate.
     */
    country: string;
    /**
     * The player's language.
     */
    language: string;
    /**
     * The player's ISP.
     */
    org: string;
    /**
     * The player's region (such as a state or province).
     */
    region: string;
    /**
     * The player's timezone.
     */
    timezone: string;
}
/** A class representing a player */
export declare class Player extends AbstractDisc implements PlayerObject {
    /**
     * The limit distance to a disc that prevents it from being kicked by the player.
     *
     * The ball will be kickable at any distance shorter than this.
     * @private
     */
    private readonly _kickLimitDistance;
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
    private _roles;
    /**
     * The player's name.
     * @readonly
     */
    readonly name: string;
    /**
     * The player's ID.
     *
     * Each time a player joins the room, a new ID will be assigned. IDs never change.
     * @readonly
     */
    readonly id: number;
    /**
     * The player's public ID. Players can view their own IDs [here](https://www.haxball.com/playerauth).
     *
     * The public ID is useful to validate whether a player is who they claim to be, but can't be used to verify whether that player isn't someone else.
     *
     * Which means it's useful for implementing user accounts, but not useful for implementing a banning system.
     *
     * Can be null if the ID validation fails.
     * @readonly
     */
    readonly auth?: string;
    /**
     * A string that uniquely identifies the player's connection.
     *
     * If two players are in the same network then they will have equal conns.
     *
     * This property is based on the player's IP. A decoded version with the full IP can be found in the `ip` property.
     * @readonly
     */
    readonly conn: string;
    /**
     * The player's IP, decoded from the `conn` property.
     */
    readonly ip: string;
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
    settings: Settings;
    /**
     * The player's geolocation.
     */
    private _geo;
    /**
     * Creates a Player object.
     *
     * @param room The room object.
     * @param playerObject The player basic information.
     */
    constructor(room: Room, playerObject: PlayerObject);
    /**
     * Fetches the player's geolocation based on their IP, stores it on the `geolocation` property and returns it.
     *
     * This can fail if the fetch operation fails.
     */
    fetchGeoLocation(): Promise<PlayerGeoLocation>;
    /**
     * Decodes the `conn` property to get the player's IP.
     *
     * @param hex The string to be decoded.
     */
    private _decodeConn;
    /**
     * Overrides the player's avatar.
     *
     * @param avatar The new avatar.
     */
    setAvatar(avatar: string): void;
    /**
     * Removes the overrider for the player's avatar.
     */
    clearAvatar(): void;
    /**
     * Kicks the player from the room.
     */
    kick(reason?: string): void;
    /**
     * Bans the player from joining again.
     *
     * Haxball bans are IP bans, so if the player changes their IP, they will be able to join the room again.
     */
    ban(reason?: string): void;
    /**
     * Sends a private message to the player.
     *
     * @param message The message object.
     */
    reply(message: MessageObject): void;
    /**
     * Checks whether a player is in a kickable distance relative to the specified disc.
     *
     * @param disc A disc in the map.
     */
    canKick(disc: Disc): boolean;
    /**
     * Attaches a new role to the player.
     *
     * @param role
     */
    addRole(role: string): void;
    /**
     * Removes a player's role.
     *
     * @param role
     */
    removeRole(role: string): void;
    /**
     * Checks whether a player has the specified role.
     *
     * @param role
     */
    hasRole(role: string): boolean;
    /**
     * The PlayerObject of the player.
     */
    private get _playerObject();
    /**
     * The DiscObject of the player.
     */
    protected get _discObject(): DiscPropertiesObject;
    protected set _discObject(properties: DiscPropertiesObject);
    /**
     * The player's team.
     */
    get team(): TeamID;
    set team(team: TeamID);
    /**
     * The player's roles.
     *
     * Roles are used as a permission system by commands.
     *
     * If a command has been defined with a certain role, it'll check whether the player has it too.
     *
     * The "admin" role is restricted and will be automatically assigned to players with admin status.
     */
    get roles(): string[];
    /**
     * The player's admin status.
     */
    get admin(): boolean;
    set admin(value: boolean);
    /**
     * The player's position in the map.
     */
    get position(): Position;
    set position(pos: Position);
    /**
     * The player's tag (name #id).
     */
    get tag(): string;
    /**
     * The player's mention (`@player`).
     */
    get mention(): string;
    /**
     * The player's geolocation based on their IP.
     *
     * This value is not set at the `onPlayerJoin` event and will be null until it is fetched.
     *
     * Once fetched, the `onPlayerGeoLocationFetch` event will be called.
     */
    get geolocation(): PlayerGeoLocation;
}
