import "./types";
import { AbstractDisc } from "./AbstractDisc";
import { Room } from "./Room";
import { Settings } from "./Settings";
import { RoleList } from "./RoleList";
import { Role } from "./Role";

/** A class representing a player */
export class Player extends AbstractDisc implements PlayerObject {
    /**
     * The limit distance to a disc that prevents it from being kicked by the player.
     * 
     * The ball will be kickable at any distance shorter than this.
     * @private
     */
	private readonly _kickLimitDistance = 4;

    /**
     * The users' permission roles. 
     * 
     * Roles are used as a permission system by commands.
     * 
     * If a command has been defined with a certain role, it'll check whether the player has it too.
     * @private
     */
    private _roles: RoleList = new RoleList();

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
    settings = new Settings();

    /**
     * Cooldown in seconds between commands.
     */
    commandsCooldown: number = 0;

    /**
     * Whether the player is able to read the room chat.
     * 
     * If this is false, the `Room.send` and `Room.chat` methods will ignore this player.
     * 
     * This won't have any effect on the native `sendAnnouncement` and `sendChat` methods, though.
     */
    canReadChat = true;

    /**
     * Whether the player is able to use commands.
     * 
     * If this is false, commands will be ignored for this player.
     */
    canUseCommands = true;

    /**
     * The last time the player ran a command.
     */
    private _lastCommandTime: number = 0;

    /**
     * Creates a Player object.
     * 
     * @param room The room object.
     * @param playerObject The player basic information.
     */
    constructor(room: Room, playerObject: PlayerObject) {
        super(room);

        this.name = playerObject.name;
        this.id = playerObject.id;
        this.auth = playerObject.auth;
        this.conn = playerObject.conn;
        this.ip = this._decodeConn(this.conn);
    }

    /**
     * Decodes the `conn` property to get the player's IP.
     * 
     * @param hex The string to be decoded.
     */
    private _decodeConn(str: string): string {
        return decodeURIComponent(str.replace(/(..)/g,'%$1'));
    }

    /**
     * Overrides the player's avatar.
     * 
     * @param avatar The new avatar.
     */
    setAvatar(avatar: string): void {
		this._room.native.setPlayerAvatar(this.id, avatar);
	}

    /**
     * Removes the overrider for the player's avatar.
     */
    clearAvatar(): void {
		this._room.native.setPlayerAvatar(this.id, null);
	}

    /**
     * Kicks the player from the room.
     */
    kick(reason?: string): void {
		this._room.native.kickPlayer(this.id, reason ?? "", false);
	}

    /**
     * Bans the player from joining again.
     * 
     * Haxball bans are IP bans, so if the player changes their IP, they will be able to join the room again.
     */
	ban(reason?: string): void {
		this._room.native.kickPlayer(this.id, reason ?? "", true);
	}

    /**
     * Sends a private message to the player.
     * 
     * @param message The message object.
     */
	reply(message: MessageObject): void {
        if (!this.canReadChat) return;

		message.targetID = this.id;
		
		this._room.send(message);
	}

    /**
     * Checks whether the player is in a kickable distance relative to the specified disc.
     * 
     * @param disc A disc in the map.
     */
	canKick(disc: AbstractDisc): boolean {
        const distance = disc.distanceTo(this);
        return distance ? distance < this._kickLimitDistance : false;
	}

    /**
     * Checks whether the player can execute commands now based on their command cooldown settings.
     */
    canRunCommandsCooldown(): boolean {
        if (Date.now() - this._lastCommandTime > this.commandsCooldown * 1000) return true;

        return false;
	}

    /**
     * Updates the command cooldown last command time.
     */
    updateCooldown(): void {
        this._lastCommandTime = Date.now();
    }

    /**
     * Attaches a new role to the player.
     * 
     * @param role 
     */
    addRole(role: Role): void {
        this._roles.add(role);
    }

    /**
     * Removes a player's role.
     * 
     * @param role 
     */
    removeRole(role: Role | string): void {
        this._roles.remove(role);
    }

    /**
     * Checks whether a player has the specified role.
     * 
     * @param role 
     */
    hasRole(role: Role | string): boolean {
        return this._roles.has(role);
    }

    /**
     * The PlayerObject of the player.
     */
    private get _playerObject(): PlayerObject {
        return this._room.native.getPlayer(this.id);
    }

    /**
     * The DiscObject of the player.
     */
    protected get _discObject(): DiscPropertiesObject {
		return this._room.native.getPlayerDiscProperties(this.id);
	}

    protected set _discObject(properties: DiscPropertiesObject) {
		this._room.native.setPlayerDiscProperties(this.id, properties);
	}

    /**
     * The player's team.
     */
    get team(): TeamID {
        return this._playerObject?.team;
    }

	set team(team: TeamID) {
		this._room.native.setPlayerTeam(this.id, team);
	}

    /**
     * The player's roles.
     * 
     * Roles are used as a permission system by commands.
     * 
     * If a command has been defined with a certain role, it'll check whether the player has it too.
     */
    get roles(): Role[] {
        return this._roles.roles;
    }

    get topRole(): Role | undefined {
        return this.roles.sort((a, b) => b.position - a.position)[0];
    }

    /**
     * The player's admin status.
     */
    get admin(): boolean {
        return this._playerObject?.admin;
    }

	set admin(value: boolean) {
        this._room.native.setPlayerAdmin(this.id, value);
    }

    /**
     * The player's position in the map.
     */
    get position(): Position {
		return this._playerObject?.position;
	}

    set position (pos: Position) {
        this._discObject = { x: pos.x, y: pos.y };
	}

    /**
     * The player's tag (name #id).
     */
	get tag(): string {
        return `${this.name} #${this.id}`;
	}

    /**
     * The player's mention (`@player`).
     */
	get mention(): string {
		return `@${this.name.replace(/ /g, "_")}`
	}
}