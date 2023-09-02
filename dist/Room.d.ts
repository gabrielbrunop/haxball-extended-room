/// <reference types="node" />
import '@abraham/reflection';
import "./types";
import { Player } from "./Player";
import { Command, CommandExecInfo, CommandOptions } from "./Command";
import { Disc } from "./Disc";
import { PlayerList } from "./PlayerList";
import { HERModule, ModuleList, ModuleOptions } from './Module';
import { Settings } from './Settings';
import { EventEmitter } from 'events';
/** Class representing a Haxball room. */
export declare class Room<T extends {} = {}> {
    /**
     * The Haxball room object from HBIinit.
     * @private
     */
    private _room;
    /**
     * The list of online players.
     * @private
     */
    private _players;
    /**
     * The list of commands.
     * @private
     */
    private _commands;
    /**
     * The list of Haxball discs.
     * @private
     */
    private _discs;
    /**
     * The list of modules.
     */
    private _modules;
    /**
     * The room's name.
     */
    readonly name: string;
    /**
     * The name of the host player.
     */
    readonly playerName: string | undefined;
    /**
     * The max number of players.
     */
    readonly maxPlayers: number;
    /**
     * The room's geolocation override.
     */
    readonly geo: RoomGeoLocation | undefined;
    /**
     * The room's token (used to avoid solving the captcha).
     */
    readonly token: string | undefined;
    /**
     * Whether the room should have a host player.
     */
    readonly noPlayer: boolean;
    /**
     * Contains flag constants that are used as helpers for reading and writing collision flags.
     */
    readonly CollisionFlags: {
        all: number;
        ball: number;
        blue: number;
        blueKO: number;
        c0: number;
        c1: number;
        c2: number;
        c3: number;
        kick: number;
        red: number;
        redKO: number;
        score: number;
        wall: number;
    };
    /**
     * Room shared state.
     *
     * This is useful if you want to have a shared state between modules.
     *
     * @example
     * room.state.chatmuted = true;
     *
     * room.onPlayerChat = function (player, message) {
     *  if (room.state.chatmuted) return false;
     * }
     */
    state: Settings<T>;
    /**
     * Node.js event emitter for the implementation of custom events.
     */
    customEvents: EventEmitter;
    /**
     * Whether to use the room's own extended logger.
     */
    logging: boolean;
    /**
     * Message thrown when a player uses a command without having permission to do that.
     */
    private _insufficientPermissionsMessage;
    /**
     * Message thrown when a player uses a command too fast.
     */
    private _playerCommandCooldownMessage;
    /**
     * The default prefix.
     * @private
     */
    private _defaultPrefix;
    /**
     * Room's password.
     */
    private _password;
    /**
     * Whether the game is paused or not.
     */
    private _paused;
    /**
     * Function for the kicking event.
     *
     * Separates the kicking and banning events.
     * @private
     */
    private _onPlayerKickedFunction;
    /**
     * Function for the banning event.
     *
     * Separates the kicking and banning events.
     * @private
     */
    private _onPlayerBannedFunction;
    private _onPlayerRunCommandFunction;
    /**
     * Starts the room.
     *
     * @param roomConfig
     * @param HBInit
     */
    constructor(roomConfig: RoomConfigObject, HBInit: typeof window.HBInit);
    /**
     * Updates the onPlayerBanned and onPlayerKicked events.
     */
    private _setKickEvent;
    /**
     * Set all events to an empty function so the changes made to the native events will work.
     * @private
     */
    private _setAllEvents;
    private _runEvent;
    /**
     * Sends an informative message.
     *
     * This method is called once when the room is started.
     */
    private _initialMessage;
    /**
     * Event called when a player kicks the ball.
     *
     * @event
     */
    set onPlayerBallKick(func: (player: Player) => void);
    /**
     * Event called when a player is kicked from the room.
     *
     * This event is always called after the onPlayerLeave event.
     *
     * **Warning: bans have been moved to onPlayerBanned.**
     *
     * @event
     */
    set onPlayerKicked(func: (kickedPlayer: PlayerObject, reason?: string, byPlayer?: Player) => void);
    /**
     * Event called when a player is banned from the room.
     *
     * This event is always called after the onPlayerLeave event.
     *
     * @event
     */
    set onPlayerBanned(func: (bannedPlayer: PlayerObject, reason?: string, byPlayer?: Player) => void);
    /**
     * Event called when the game ticks (60 ticks per second).
     *
     * This event will not be called if no game is in progress or the game is paused.
     *
     * @event
     */
    set onGameTick(func: () => void);
    /**
     * Event called when a team scores a goal.
     *
     * @event
     */
    set onTeamGoal(func: (team: TeamID) => void);
    /**
     * Event called when the discs' positions are reset after a goal.
     *
     * @event
     */
    set onPositionsReset(func: () => void);
    /**
     * Event called when a player gives signs of activity, such as pressing a key.
     *
     * This event is useful for detecting inactive players.
     *
     * @event
     */
    set onPlayerActivity(func: (player: Player) => void);
    /**
     * Event called when a player gets the room's link.
     *
     * @event
     */
    set onRoomLink(func: (link: string) => void);
    /**
     * Event called when the kick rate is set.
     *
     * @event
     */
    set onKickRateLimitSet(func: (min: number, rate: number, burst: number, byPlayer?: Player) => void);
    /**
     * Event called when a player joins the room.
     *
     * `geolocation` is not available here and will return `undefined`. Use the `onPlayerGeoLocationFetch` event instead.
     *
     * @event
     */
    set onPlayerJoin(func: (player: Player) => void);
    /**
     * Event called when a player leaves the room.
     *
     * @event
     */
    set onPlayerLeave(func: (player: Player) => void);
    /**
     * Event called when a team wins the game.
     *
     * @event
     */
    set onTeamVictory(func: (scores: ScoresObject) => void);
    /**
     * Event called when a player sends a message.
     *
     * If the event function returns `false` the message will not be sent.
     *
     * @event
     */
    set onPlayerChat(func: (player: Player, message: string) => boolean | void);
    /**
     * Event called when the game is started.
     *
     * `byPlayer` will be null if the game is started programmatically (such as the `start()` method).
     *
     * @event
     */
    set onGameStart(func: (byPlayer?: Player) => void);
    /**
     * Event called when the game is stopped.
     *
     * `byPlayer` will be null if the game is started programmatically (such as the `stop()` method).
     *
     * @event
     */
    set onGameStop(func: (byPlayer?: Player) => void);
    /**
     * Event called when a player's admin status is changed.
     *
     * `byPlayer` will be null if the player's admin status is changed programmatically (such as the `player.admin` property).
     *
     * @event
     */
    set onPlayerAdminChange(func: (changedPlayer: Player, byPlayer?: Player) => void);
    /**
     * Event called when a player is moved to another team.
     *
     * `byPlayer` will be null if the player is moved programmatically (such as the `player.team` property).
     *
     * @event
     */
    set onPlayerTeamChange(func: (changedPlayer: Player, byPlayer?: Player) => void);
    /**
     * Event called when the game is paused.
     *
     * `byPlayer` will be null if the game is paused programmatically (such as the `pause()` method).
     *
     * @event
     */
    set onGamePause(func: (byPlayer?: Player) => void);
    /**
     * Event called when the game is unpaused.
     *
     * `byPlayer` will be null if the game is unpaused programmatically (such as the `pause()` method).
     *
     * @event
     */
    set onGameUnpause(func: (byPlayer?: Player) => void);
    /**
     * Event called when the room stadium is changed.
     *
     * `byPlayer` will be null if the stadium is changed programmatically (such as the `setStadium()` method).
     *
     * @event
     */
    set onStadiumChange(func: (newStadiumName: string, byPlayer?: Player) => void);
    set onPlayerRunCommand(func: (player: Player, command: Command, info: CommandExecInfo) => void);
    /**
     * Gets a message command structure.
     *
     * The first item of the array is the command name, while the rest are the arguments.
     *
     * @param message The player message.
     * @returns The message structure.
     * @private
     */
    private _desconstructMessage;
    /**
     * Retrieves the command name from a message command.
     *
     * @param message The player message.
     * @returns The command name.
     */
    private _getCommandName;
    /**
     * Retrieves the command arguments from a message command.
     *
     * @param message The player message.
     * @returns The command arguments.
     */
    private _getArguments;
    /**
     * The message you receive when you don't have enough permissions to run a command.
     */
    set noPermissionMessage(message: MessageObject);
    /**
     * The message you receive when you type commands too fast (`Player.commandsCooldown`).
     */
    set commandCooldownMessage(message: MessageObject);
    /**
     * The list of online players.
     *
     * Each player is represented by a number property, which is their ID.
     *
     * When a player leaves the room, this property is deleted.
     *
     * @example
     * players[1].name; // Gets the name of the player whose ID is 1.
     * players[5].admin = true; // Gives admin to the player whose ID is 5.
     */
    get players(): PlayerList;
    /**
     * The list of discs in current map.
     */
    get discs(): Disc[];
    /**
     * The scores object.
     *
     * If no game is in progress then this will return `null`.
     */
    get scores(): ScoresObject;
    /**
     * The ball disc.
     */
    get ball(): Disc;
    /**
     * The total number of discs.
     */
    get discCount(): number;
    /**
     * The list of commands.
     */
    get commands(): Command[];
    /**
     * The room's password.
     *
     * Returns null if no password is set.
     */
    get password(): string | null;
    /**
     * The room's command prefix.
     */
    get prefix(): string;
    set prefix(value: string);
    /**
     * The room's modules.
     */
    get modules(): ModuleList;
    /**
     * Gets the room's native object.
     */
    get native(): RoomObject;
    /**
     * Whether the game is paused or not.
     */
    get paused(): boolean;
    /**
     * Adds a command to the room.
     *
     * @param options Command options.
     */
    command(options: CommandOptions): void;
    /**
     * Deletes a command.
     *
     * @param name Command name.
     */
    removeCommand(name: string): void;
    /**
     * Adds a module to the room.
     *
     * Modules are classes with the `@Module` decorator.
     *
     * @param Module A module class.
     * @param options
     */
    module<T>(Module: HERModule<T>, options?: ModuleOptions): this;
    /**
     * Removes a module from the room.
     *
     * @param moduleOrName The module's name or the module itself (or any class with the same name).
     */
    removeModule<T>(moduleOrName: string | HERModule<T>): void;
    /**
     * Checks whether a game is in progress.
     */
    isGameInProgress(): boolean;
    /**
     * @deprecated
     *
     * Deprecated since 29/07/2019
     *
     * This method was intended to work with noPlayer: false,
     * but nowadays noPlayer: false is not recommended anymore
     * and is only maintained due to backwards compatibility
     * by the Haxball API.
     *
     * Messages sent using this method won't be logged.
     *
     * Use `send()` instead.
     */
    chat(message: string, playerID?: number): void;
    /**
     * Unbans a player based on their past ID.
     *
     * @param id The player's ID.
     */
    unban(id: number): void;
    /**
     * Unbans all banned players.
     */
    unbanAll(): void;
    /**
     * Changes the score limit of the room.
     *
     * If a game is in progress this method does nothing.
     *
     * @param limit Score limit.
     */
    setScoreLimit(limit: number): void;
    /**
     * Changes the time limit of the room.
     *
     * If a game is in progress this method does nothing.
     *
     * @param limit Time limit.
     */
    setTimeLimit(limit: number): void;
    /**
     * Changes the room stadium.
     *
     * If a game is in progress then this method does nothing.
     *
     * This method combines both setCustomStadium and setDefaultStadium in one place.
     *
     * @param stadium Either an HBS map in JSON or a default stadium name.
     */
    setStadium(stadium: {} | DefaultStadiums): void;
    /**
     * Locks the teams.
     *
     * When teams are locked players cannot move themselves unless an admin moves them.
     */
    lockTeams(): void;
    /**
     * Unlock the teams.
     *
     * When teams are locked players cannot move themselves unless an admin moves them.
     */
    unlockTeams(): void;
    /**
     * Changes the uniform of a team.
     *
     * @param team The team ID or "all" to both teams.
     * @param teamColors The color.
     */
    setTeamColors(team: TeamID | "all", teamColors: TeamColors): void;
    /**
     * Starts the game if none is in progress.
     */
    start(): void;
    /**
     * Stops the game in progress.
     */
    stop(): void;
    /**
     * Pauses the game.
     */
    pause(): void;
    /**
     * Unpauses the game.
     */
    unpause(): void;
    /**
     * Starts recording a Haxball Replay.
     *
     * Don't forget to call stopRecording() to prevent a memory leak.
     */
    startRecording(): void;
    /**
     * Stops the recording.
     *
     * @returns The file content as a Uint8Array or null if no recording is in progress.
     */
    stopRecording(): Uint8Array;
    /**
     * Locks the room with a password.
     *
     * @param password A password for the room.
     */
    setPassword(password: string): void;
    /**
     * Clears the room password.
     */
    clearPassword(): void;
    /**
     * Forces players to solve a captcha before joining the room.
     */
    enableCaptcha(): void;
    /**
     * Disables the captcha requirement.
     */
    disableCaptcha(): void;
    /**
     * First all players listed are removed, then they are reinserted in the same order they appear in the list.
     *
     * @param ids ID list.
     * @param moveToTop Whether players should be inserted at the top or at the bottom of the list .
     */
    reorderPlayers(ids: Array<number>, moveToTop: boolean): void;
    /**
     * Sends an announcement.
     *
     * @example
     * room.send({ message: "Hello world!" });
     *
     * @example
     * room.send({ message: "What a beautiful day!", color: Colors.Yellow, style: ChatStyle.Bold });
     *
     * @param options Message options.
     */
    send(options: MessageObject): void;
    /**
     * Limits the number of kicks in a period of time.
     *
     * Good to prevent cheating.
     *
     * @param min The minimum number of logic-frames between two kicks. It is impossible to kick faster than this.
     * @param rate Similar to min but lets players save up extra kicks to use them later depending on the value of burst.
     * @param burst Determines how many extra kicks the player is able to save up.
     */
    setKickRateLimit(min: number, rate: number, burst: number): void;
}
