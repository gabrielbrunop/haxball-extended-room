import '@abraham/reflection';
import "./types";
import * as Logger from "./Logger";
import { Player } from "./Player";
import { Command, CommandExecInfo, CommandOptions } from "./Command";
import { Disc } from "./Disc";
import { PlayerList } from "./PlayerList";
import { CommandList } from "./CommandList";
import { CommandArgument } from "./CommandArgument";
import { ChatSounds, ChatStyle, Colors, Teams } from "./Global";
import { CustomEventList, EventList, HERModule, ModuleList, ModuleOptions } from './Module';
import { Settings } from './Settings';
import { EventEmitter } from 'events';

/** Class representing a Haxball room. */
export class Room<T extends {} = {}> {
    /**
     * The Haxball room object from HBIinit.
     * @private
     */
    private _room: RoomObject;

    /**
     * The list of online players.
     * @private
     */
    private _players: PlayerList;

    /**
     * The list of commands.
     * @private
     */
    private _commands: CommandList;

    /**
     * The list of Haxball discs.
     * @private
     */
    private _discs: Disc[] = [];

    /**
     * The list of modules.
     */
    private _modules: ModuleList = [];

    /**
     * The room's name.
     */
    public readonly name: string;

    /**
     * The name of the host player.
     */
    public readonly playerName: string | undefined;

    /**
     * The max number of players.
     */
    public readonly maxPlayers: number;

    /**
     * The room's geolocation override.
     */
    public readonly geo: RoomGeoLocation | undefined;

    /**
     * The room's token (used to avoid solving the captcha).
     */
    public readonly token: string | undefined;

    /**
     * Whether the room should have a host player.
     */
    public readonly noPlayer: boolean;

    /**
     * Contains flag constants that are used as helpers for reading and writing collision flags.
     */
    public readonly CollisionFlags = {
        all: 63,
        ball: 1,
        blue: 4,
        blueKO: 16,
        c0: 268435456,
        c1: 536870912,
        c2: 1073741824,
        c3: -2147483648,
        kick: 64,
        red: 2,
        redKO: 8,
        score: 128,
        wall: 32,
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
    public state: Settings<T> = {};

    /**
     * Node.js event emitter for the implementation of custom events.
     */
    public customEvents: EventEmitter = new EventEmitter();

    /**
     * Whether to use the room's own extended logger.
     */
    public logging = true;

    /**
     * Message thrown when a player uses a command without having permission to do that.
     */
    private _insufficientPermissionsMessage: MessageObject = {
        message: "You're not allowed to use this command!",
        color: Colors.Red,
        style: ChatStyle.Bold,
        sound: ChatSounds.Notification
    }

    /**
     * Message thrown when a player uses a command too fast.
     */
     private _playerCommandCooldownMessage: MessageObject = {
        message: "Don't type commands too fast!",
        color: Colors.Red,
        style: ChatStyle.Bold,
        sound: ChatSounds.Notification
    }

    /**
     * The default prefix.
     * @private
     */
    private _defaultPrefix = "!";
    
    /**
     * Room's password.
     */
    private _password: string | null;

    /**
     * Whether the game is paused or not.
     */
    private _paused: boolean = false;

    /**
     * Function for the kicking event.
     * 
     * Separates the kicking and banning events.
     * @private
     */
    private _onPlayerKickedFunction!: (kickedPlayer: PlayerObject, reason: string, byPlayer: Player | undefined) => void;

    /**
     * Function for the banning event.
     * 
     * Separates the kicking and banning events.
     * @private
     */
    private _onPlayerBannedFunction!: (bannedPlayer: PlayerObject, reason: string, byPlayer: Player | undefined) => void;

    private _onPlayerRunCommandFunction!: (player: Player, command: Command, info: CommandExecInfo) => void;

    /**
     * Starts the room.
     *
     * @param roomConfig
     * @param HBInit
     */
    constructor (roomConfig: RoomConfigObject, HBInit: typeof window.HBInit) {
        if (roomConfig.noPlayer == null) roomConfig.noPlayer = true;

        this._room = HBInit(roomConfig);

        this.name = roomConfig.roomName;
        this.playerName = roomConfig.playerName;
        this.maxPlayers = roomConfig.maxPlayers;
        this.geo = roomConfig.geo;
        this.token = roomConfig.token;
        this.noPlayer = roomConfig.noPlayer ?? true;
        this._password = roomConfig.password ?? null;

        this._players = new PlayerList();
        this._commands = new CommandList(this._defaultPrefix);

        this.prefix = this._defaultPrefix;

        this._setAllEvents();
        this._initialMessage();
    }

    /**
     * Updates the onPlayerBanned and onPlayerKicked events.
     */
    private _setKickEvent() {
        this._room.onPlayerKicked = (kickedPlayer: PlayerObject, reason: string, ban: boolean, byPlayer: PlayerObject) => {
            if (this.logging) {
                Logger.log({ message: `${kickedPlayer.name} was ${ban ? "banned" : "kicked"} ${byPlayer ? `by ${byPlayer.name} ` : ``}${reason ? `(${reason})` : ``}`, color: Colors.Haxball });
            }

            if (ban) {
                this._runEvent("onPlayerBanned", this._onPlayerBannedFunction, kickedPlayer, reason, byPlayer);
            } else {
                this._runEvent("onPlayerKicked", this._onPlayerKickedFunction, kickedPlayer, reason, byPlayer);
            }
        };
    }

    /**
     * Set all events to an empty function so the changes made to the native events will work.
     * @private 
     */
    private _setAllEvents() {
        this.onGamePause         = () => { /** Empty function. */ };
        this.onGameStart         = () => { /** Empty function. */ };
        this.onGameStop          = () => { /** Empty function. */ };
        this.onGameTick          = () => { /** Empty function. */ };
        this.onGameUnpause       = () => { /** Empty function. */ };
        this.onKickRateLimitSet  = () => { /** Empty function. */ };
        this.onPlayerActivity    = () => { /** Empty function. */ };
        this.onPlayerAdminChange = () => { /** Empty function. */ };
        this.onPlayerBallKick    = () => { /** Empty function. */ };
        this.onPlayerBanned      = () => { /** Empty function. */ };
        this.onPlayerChat        = () => true;
        this.onPlayerJoin        = () => { /** Empty function. */ };
        this.onPlayerKicked      = () => { /** Empty function. */ };
        this.onPlayerLeave       = () => { /** Empty function. */ };
        this.onPlayerTeamChange  = () => { /** Empty function. */ };
        this.onPositionsReset    = () => { /** Empty function. */ };
        this.onRoomLink          = () => { /** Empty function. */ };
        this.onStadiumChange     = () => { /** Empty function. */ };
        this.onTeamGoal          = () => { /** Empty function. */ };
        this.onTeamVictory       = () => { /** Empty function. */ };
        this.onPlayerRunCommand = () => { /** Empty function. */ };
    }

    private _runEvent (name: string, func: Function, ...args: any): void {
        this._modules.forEach(module => {
            module.events.forEach(event => {
                if (event.name === name) event.func(...args);
            });
        });

        func (...args);
    }

    /**
     * Sends an informative message.
     * 
     * This method is called once when the room is started.
     */
    private _initialMessage() {
        Logger.anonymous("%cHaxball Extended Room", "color:#233E82; display: block;font-weight:bold; font-size:38px; background:#fff;");
        Logger.anonymous("%cA better API for Haxball", "color:#222; font-family:'Ubuntu'; font-weight:100; font-size:24px; background:#fff;");
    }

    /**
     * Event called when a player kicks the ball.
     * 
     * @event
     */
    set onPlayerBallKick(func: (player: Player) => void) {
        this._room.onPlayerBallKick = (p: PlayerObject) => this._runEvent("onPlayerBallKick", func, this.players[p.id]);
    }

    /**
     * Event called when a player is kicked from the room.
     * 
     * This event is always called after the onPlayerLeave event.
     * 
     * **Warning: bans have been moved to onPlayerBanned.**
     * 
     * @event
     */
    set onPlayerKicked(func: (kickedPlayer: PlayerObject, reason?: string, byPlayer?: Player) => void) {
        this._onPlayerKickedFunction = func;
        this._setKickEvent();
    }

    /**
     * Event called when a player is banned from the room.
     * 
     * This event is always called after the onPlayerLeave event.
     * 
     * @event
     */
    set onPlayerBanned(func: (bannedPlayer: PlayerObject, reason?: string, byPlayer?: Player) => void) {
        this._onPlayerBannedFunction = func;
        this._setKickEvent();
    }

    /**
     * Event called when the game ticks (60 ticks per second). 
     * 
     * This event will not be called if no game is in progress or the game is paused.
     * 
     * @event
     */
    set onGameTick(func: () => void) {
        this._room.onGameTick = () => this._runEvent("onGameTick", func);
    }

    /**
     * Event called when a team scores a goal.
     * 
     * @event
     */
    set onTeamGoal(func: (team: TeamID) => void) {
        this._room.onTeamGoal = (team) => this._runEvent("onTeamGoal", func, team);
    }

    /**
     * Event called when the discs' positions are reset after a goal.
     * 
     * @event
     */
    set onPositionsReset(func: () => void) {
        this._room.onPositionsReset = () => this._runEvent("onPositionsReset", func);
    }

    /**
     * Event called when a player gives signs of activity, such as pressing a key.
     * 
     * This event is useful for detecting inactive players.
     * 
     * @event
     */
    set onPlayerActivity(func: (player: Player) => void) {
        this._room.onPlayerActivity = (p: PlayerObject) => this._runEvent("onPlayerActivity", func, this.players[p.id]);
    }

    /**
     * Event called when a player gets the room's link.
     * 
     * @event
     */
    set onRoomLink(func: (link: string) => void) {
        this._room.onRoomLink = (link) => this._runEvent("onRoomLink", func, link);
    }

    /**
     * Event called when the kick rate is set.
     * 
     * @event
     */
    set onKickRateLimitSet(func: (min: number, rate: number, burst: number, byPlayer?: Player) => void) {
        this._room.onKickRateLimitSet = (m: number, r: number, b: number, bP: PlayerObject) => this._runEvent("onKickRateLimitSet", func, m, r, b, this.players[bP?.id]);
    }

    /**
     * Event called when a player joins the room.
     * 
     * `geolocation` is not available here and will return `undefined`. Use the `onPlayerGeoLocationFetch` event instead.
     * 
     * @event
     */
    set onPlayerJoin(func: (player: Player) => void) {
        this._room.onPlayerJoin = (p: PlayerObject) => {
            const player = new Player(this, p);

            this.players.add(player);

            if (this.logging) {
                Logger.log({ message: `${player.name} has joined`, color: Colors.Haxball });
            }

            this._runEvent("onPlayerJoin", func, player);
        };
    }

    /**
     * Event called when a player leaves the room.
     * 
     * @event
     */
    set onPlayerLeave(func: (player: Player) => void) {
        this._room.onPlayerLeave = (p: PlayerObject) => {
            const player = this.players[p.id];

            this.players.remove(player);

            if (this.logging) {
                Logger.log({ message: `${player.name} has left`, color: Colors.Haxball });
            }

            this._runEvent("onPlayerLeave", func, player);
        };
    }

    /**
     * Event called when a team wins the game.
     * 
     * @event
     */
    set onTeamVictory(func: (scores: ScoresObject) => void) {
        this._room.onTeamVictory = (scores: ScoresObject) => {
            if (this.logging) {
                const teamWon = scores.red > scores.blue ? "Red" : "Blue";

                Logger.log({ message: `${teamWon} team won the match`, color: Colors.Haxball });
            }

            this._runEvent("onTeamVictory", func, scores);
        };
    }

    /**
     * Event called when a player sends a message.
     * 
     * If the event function returns `false` the message will not be sent.
     * 
     * @event
     */
    set onPlayerChat(func: (player: Player, message: string) => boolean | void) {
        this._room.onPlayerChat = (p: PlayerObject, msg: string): boolean | void => {
            const player = this.players[p.id];

            const command = this._commands.get(this._getCommandName(msg));

            let commandRun: Function | null = null;

            if (msg[0] === this.prefix && command && player.canUseCommands) {
                if (!player.canRunCommandsCooldown()) {
                    player.reply(this._playerCommandCooldownMessage);
                    return false;
                }

                if (!command.isAllowed(player)) {
                    player.reply(this._insufficientPermissionsMessage);
                    return false;
                }

                const args = this._getArguments(msg).map(arg => new CommandArgument(arg));

                commandRun = () => {
                    const execInfo = {
                        player: player,
                        at: new Date(Date.now()),
                        message: msg,
                        room: this,
                        arguments: args
                    };

                    command.run(execInfo);

                    this._onPlayerRunCommandFunction(player, command, execInfo);
                };

                player.updateCooldown();

                if (command.deleteMessage) {
                    commandRun();

                    return false;
                }
            }

            for (const module of this._modules) {
                for (const event of module.events) {
                    if (event.name === "onPlayerChat") {
                        if (event.func(player, msg) === false) {
                            if (commandRun) commandRun();

                            return false;
                        }
                    }
                }
            }
    
            if (func (player, msg) === false) {
                if (commandRun) commandRun();

                return false;
            }

            if (this.logging) {
                if (player.admin) {
                    Logger.admin({ message: msg }, player);
                } else {
                    Logger.chat({ message: msg }, player);
                }
            }

            if (commandRun) commandRun();
        };
    }

    /**
     * Event called when the game is started.
     * 
     * `byPlayer` will be null if the game is started programmatically (such as the `start()` method).
     * 
     * @event
     */
    set onGameStart(func: (byPlayer?: Player) => void) {
        this._room.onGameStart = (p: PlayerObject) => {
            const player = this.players[p?.id];

            if (this.logging) Logger.log({ message: `Game started ${player ? `by ${player.name}` : ``}`, color: Colors.Haxball });

            for (let i = 0; i < this.discCount - this.players.teams().size; i++) {
                this._discs.push(new Disc(this, i)); 
            }

            this._runEvent("onGameStart", func, player);
        };
    }

    /**
     * Event called when the game is stopped.
     * 
     * `byPlayer` will be null if the game is started programmatically (such as the `stop()` method).
     * 
     * @event
     */
    set onGameStop(func: (byPlayer?: Player) => void) {
        this._room.onGameStop = (bP: PlayerObject) => {
            this._paused = false;

            const player = this.players[bP?.id];

            if (this.logging) Logger.log({ message: `Game stopped ${player ? `by ${player.name}` : ``}`, color: Colors.Haxball });

            this._discs = [];

            this._runEvent("onGameStop", func, player);
        }
    }

    /**
     * Event called when a player's admin status is changed.
     * 
     * `byPlayer` will be null if the player's admin status is changed programmatically (such as the `player.admin` property).
     * 
     * @event
     */
    set onPlayerAdminChange(func: (changedPlayer: Player, byPlayer?: Player) => void) {
        this._room.onPlayerAdminChange = (cP: PlayerObject, bP: PlayerObject) => {
            const changedPlayer = this.players[cP.id];
            const byPlayer = this.players[bP?.id];

            if (this.logging) {
                if (changedPlayer.admin) {
                    Logger.log({ message: `${changedPlayer.name} was given admin rights ${byPlayer ? `by ${byPlayer.name}` : ``}`, color: Colors.Haxball });
                } else {
                    Logger.log({ message: `${changedPlayer.name}'s admin rights were taken away ${byPlayer ? `by ${byPlayer.name}` : ``}`, color: Colors.Haxball });
                }
            }

            this._runEvent("onPlayerAdminChange", func, changedPlayer, byPlayer);
        }
    }

    /**
     * Event called when a player is moved to another team.
     * 
     * `byPlayer` will be null if the player is moved programmatically (such as the `player.team` property).
     * 
     * @event
     */
    set onPlayerTeamChange(func: (changedPlayer: Player, byPlayer?: Player) => void) {
        this._room.onPlayerTeamChange = (cP: PlayerObject, bP: PlayerObject) => {
            const changedPlayer = this.players[cP.id];
            const byPlayer = this.players[bP?.id];

            if (this.logging) {
                let team = "";

                if (changedPlayer.team === Teams.Red) team = "Red";
                if (changedPlayer.team === Teams.Blue) team = "Blue";
                if (changedPlayer.team === Teams.Spectators) team = "Spectators";

                Logger.log({ message: `${changedPlayer.name} was moved to ${team} ${byPlayer ? `by ${byPlayer.name}` : ``}`, color: Colors.Haxball });
            }

            this._runEvent("onPlayerTeamChange", func, changedPlayer, byPlayer);
        }
    }

    /**
     * Event called when the game is paused.
     * 
     * `byPlayer` will be null if the game is paused programmatically (such as the `pause()` method).
     * 
     * @event
     */
    set onGamePause(func: (byPlayer?: Player) => void) {
        this._room.onGamePause = (bP: PlayerObject) => {
            this._paused = true;

            const byPlayer = this.players[bP?.id];

            if (this.logging) {
                Logger.log({ message: `Game paused ${byPlayer ? `by ${byPlayer.name}` : ``}`, color: Colors.Haxball });
            }

            this._runEvent("onGamePause", func, byPlayer);
        }
    }

    /**
     * Event called when the game is unpaused.
     * 
     * `byPlayer` will be null if the game is unpaused programmatically (such as the `pause()` method).
     * 
     * @event
     */
    set onGameUnpause(func: (byPlayer?: Player) => void) {
        this._room.onGameUnpause = (bP: PlayerObject) => {
            this._paused = false;

            this._runEvent("onGameUnpause", func, this.players[bP?.id]);
        }
    }

    /**
     * Event called when the room stadium is changed.
     * 
     * `byPlayer` will be null if the stadium is changed programmatically (such as the `setStadium()` method).
     * 
     * @event
     */
    set onStadiumChange(func: (newStadiumName: string, byPlayer?: Player) => void) {
        this._room.onStadiumChange = (newStadiumName: string, bP: PlayerObject) => {
            const byPlayer = this.players[bP?.id];

            if (this.logging) {
                Logger.log({ message: `Stadium "${newStadiumName}" loaded ${byPlayer ? `by ${byPlayer.name}` : ``}`, color: Colors.Haxball });
            }

            this._runEvent("onStadiumChange", func, newStadiumName, byPlayer);
        };
    }

    set onPlayerRunCommand(func: (player: Player, command: Command, info: CommandExecInfo) => void) {
        this._onPlayerRunCommandFunction = (player, command, info) => this._runEvent("onPlayerRunCommand", func, player, command, info);
    }

    /**
     * Gets a message command structure.
     * 
     * The first item of the array is the command name, while the rest are the arguments.
     * 
     * @param message The player message.
     * @returns The message structure.
     * @private
     */
    private _desconstructMessage = (message: string): string[] => {
        return message.slice(this.prefix.length).trim().split(/ +/);
    }
    
    /**
     * Retrieves the command name from a message command.
     * 
     * @param message The player message.
     * @returns The command name.
     */
    private _getCommandName = (message: string): string => {
        return this._desconstructMessage(message)[0].toLowerCase();
    }
    
    /**
     * Retrieves the command arguments from a message command.
     * 
     * @param message The player message.
     * @returns The command arguments.
     */
    private _getArguments = (message: string): string[] => {	
        return this._desconstructMessage(message).slice(1);
    }

    /**
     * The message you receive when you don't have enough permissions to run a command.
     */
    set noPermissionMessage (message: MessageObject) {
        this._insufficientPermissionsMessage = message;
    }

    /**
     * The message you receive when you type commands too fast (`Player.commandsCooldown`).
     */
     set commandCooldownMessage (message: MessageObject) {
        this._playerCommandCooldownMessage = message;
    }

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
    get players(): PlayerList {
        return this._players;
    }

    /**
     * The list of discs in current map.
     */
    get discs(): Disc[] {
        return this._discs;
    }

    /**
     * The scores object.
     * 
     * If no game is in progress then this will return `null`.
     */
    get scores(): ScoresObject {
        return this._room.getScores();
    }

    /**
     * The ball disc.
     */
    get ball(): Disc {
        return this.discs[0];
    }

    /**
     * The total number of discs.
     */
    get discCount(): number {
        return this._room.getDiscCount();
    }

    /**
     * The list of commands.
     */
    get commands(): Command[] {
        return this._commands.list;
    }

    /**
     * The room's password.
     * 
     * Returns null if no password is set.
     */
    get password(): string | null {
        return this._password;
    }

    /**
     * The room's command prefix.
     */
    get prefix(): string {
        return this._commands.prefix;
    }

    set prefix(value: string) {
        this._commands.prefix = value;
    }

    /**
     * The room's modules.
     */
    get modules(): ModuleList {
        return this._modules;
    }

    /**
     * Gets the room's native object.
     */
    get native(): RoomObject {
        return this._room;
    }

    /**
     * Whether the game is paused or not.
     */
    get paused(): boolean {
        return this._paused;
    }

    /**
     * Adds a command to the room.
     * 
     * @param options Command options.
     */
    command(options: CommandOptions): void {
        this._commands.add(new Command(options));
    }

    /**
     * Deletes a command.
     * 
     * @param name Command name.
     */
    removeCommand(name: string): void {
        this._commands.remove(name);
    }
    /**
     * Adds a module to the room.
     *
     * Modules are classes with the `@Module` decorator.
     *
     * @param Module A module class.
     * @param options
     */
    module<T>(Module: HERModule<T>, options?: ModuleOptions): this {
        if (!Reflect.getMetadata('her:module', Module)) {
            throw new Error("The given argument is not a valid module.");
        }

        const translate = (original: string, name: string, ...params: string[]) => {
            if (options?.languagePack) {
                for (const [strName, str] of Object.entries(options.languagePack)) {
                    if (strName === name) {
                        return [str, ...params].reduce((p: string, c: string) => p.replace(/%%/, c));
                    }
                }
            }
        
            return [original, ...params].reduce((p: string, c: string) => p.replace(/%%/, c));
        }

        const module = new Module(this, options?.settings, translate);

        const commands: CommandOptions[] = Reflect.getMetadata('her:commands', Module.prototype) || [];
        const events: EventList = Reflect.getMetadata('her:events', Module.prototype) || [];
        let customEvents: CustomEventList = Reflect.getMetadata('her:custom_events', Module.prototype) || [];

        customEvents = customEvents.map(e => {
            e.func = e.func.bind(module);
            const fn = (...args: any[]) => e.func(...args);
            this.customEvents.on(e.name, fn);

            return { name: e.name, func: fn };
        });

        events.map(e => {
            e.func = e.func.bind(module);
            return e;
        });

        commands.forEach(command => {
            command.func = command.func.bind(module);
            this.command(command);
        });

        this._modules.push({
            name: Module.name,
            commands: commands,
            events: events,
            customEvents: customEvents
        });

        return this;
    }

    /**
     * Removes a module from the room.
     * 
     * @param moduleOrName The module's name or the module itself (or any class with the same name).
     */
    removeModule<T>(moduleOrName: string | HERModule<T>): void {
        const name = typeof moduleOrName !== "string" ? moduleOrName.name : moduleOrName;

        const module = this._modules.find(p => p.name === name);
        
        module?.commands?.forEach(c => {
            const cmd = this._commands.get(c.name);

            if (cmd) {
                if (c.name === cmd?.name && c.func === cmd?.func) {
                    this._commands.remove(c.name);
                }
            }
        });

        module?.customEvents?.forEach(e => {
            this.customEvents.removeListener(e.name, e.func);
        })

        this._modules = this._modules.filter(p => p.name !== name);
    }
    
    /**
     * Checks whether a game is in progress.
     */
    isGameInProgress(): boolean {
        return this.scores != null;
    }

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
    chat(message: string, playerID?: number): void {
        if (playerID && this.players[playerID]?.canReadChat) {
            this._room.sendChat(message, playerID);
        }
        
        if (!playerID) {
            for (const player of this.players) {
                if (!player.canReadChat) continue;

                this._room.sendChat(message, player.id);
            }
        }
    }

    /**
     * Unbans a player based on their past ID.
     * 
     * @param id The player's ID.
     */
    unban(id: number): void {
        this._room.clearBan(id);
    }

    /**
     * Unbans all banned players.
     */
    unbanAll(): void {
        this._room.clearBans();
    }

    /**
     * Changes the score limit of the room.
     * 
     * If a game is in progress this method does nothing.
     * 
     * @param limit Score limit.
     */
    setScoreLimit(limit: number): void {
        this._room.setScoreLimit(limit);
    }

    /**
     * Changes the time limit of the room.
     * 
     * If a game is in progress this method does nothing.
     * 
     * @param limit Time limit.
     */
    setTimeLimit(limit: number): void {
        this._room.setTimeLimit(limit);
    }

    /**
     * Changes the room stadium.
     * 
     * If a game is in progress then this method does nothing.
     * 
     * This method combines both setCustomStadium and setDefaultStadium in one place.
     * 
     * @param stadium Either an HBS map in JSON or a default stadium name.
     */
    setStadium(stadium: {} | DefaultStadiums): void {
        if (typeof stadium === "object") this._room.setCustomStadium(JSON.stringify(stadium));
        if (typeof stadium === "string") this._room.setDefaultStadium(stadium as DefaultStadiums);
    }

    /**
     * Locks the teams.
     * 
     * When teams are locked players cannot move themselves unless an admin moves them.
     */
    lockTeams(): void {
        this._room.setTeamsLock(true);
    }

    /**
     * Unlock the teams.
     * 
     * When teams are locked players cannot move themselves unless an admin moves them.
     */
    unlockTeams(): void {
        this._room.setTeamsLock(false);
    }

    /**
     * Changes the uniform of a team.
     * 
     * @param team The team ID or "all" to both teams.
     * @param teamColors The color.
     */
    setTeamColors(team: TeamID | "all", teamColors: TeamColors): void {
        if (team === "all") {
            this._room.setTeamColors(Teams.Red, teamColors.angle, teamColors.textColor, teamColors.colors);
            this._room.setTeamColors(Teams.Blue, teamColors.angle, teamColors.textColor, teamColors.colors);
        } else {
            this._room.setTeamColors(team, teamColors.angle, teamColors.textColor, teamColors.colors);
        }
    }

    /**
     * Starts the game if none is in progress.
     */
    start(): void {
        this._room.startGame();
    }

    /**
     * Stops the game in progress.
     */
    stop(): void {
        this._room.stopGame();
    }

    /**
     * Pauses the game.
     */
    pause(): void {
        this._room.pauseGame(true);
    }

    /**
     * Unpauses the game.
     */
    unpause(): void {
        this._room.pauseGame(false);
    }

    /**
     * Starts recording a Haxball Replay.
     * 
     * Don't forget to call stopRecording() to prevent a memory leak.
     */
    startRecording(): void {
        this._room.startRecording();
    }

    /**
     * Stops the recording.
     * 
     * @returns The file content as a Uint8Array or null if no recording is in progress.
     */
    stopRecording(): Uint8Array {
        return this._room.stopRecording();
    }

    /**
     * Locks the room with a password.
     * 
     * @param password A password for the room.
     */
    setPassword(password: string): void {
        this._password = password;
        this._room.setPassword(password);
    }

    /**
     * Clears the room password.
     */
    clearPassword(): void {
        this._password = null;
        this._room.setPassword(null);
    }

    /**
     * Forces players to solve a captcha before joining the room.
     */
    enableCaptcha(): void {
        this._room.setRequireRecaptcha(true);
    }

    /**
     * Disables the captcha requirement.
     */
    disableCaptcha(): void {
        this._room.setRequireRecaptcha(false);
    }

    /**
     * First all players listed are removed, then they are reinserted in the same order they appear in the list.
     * 
     * @param ids ID list.
     * @param moveToTop Whether players should be inserted at the top or at the bottom of the list .
     */
    reorderPlayers(ids: Array<number>, moveToTop: boolean): void {
        this._room.reorderPlayers(ids, moveToTop);
    }

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
    send(options: MessageObject): void {
        if (options.targetID && this.players[options.targetID]?.canReadChat) {
            this._room.sendAnnouncement(options.message, options.targetID, options.color, options.style, options.sound);
        }
        
        if (!options.targetID) {
            for (const player of this.players) {
                if (!player.canReadChat) continue;

                this._room.sendAnnouncement(options.message, player.id, options.color, options.style, options.sound);
            }
        }

        if (this.logging) {
            if (options.targetID && this.players[options.targetID]?.canReadChat) {
                Logger.direct(options, this.players[options.targetID]);
            } else {
                Logger.announcement(options);
            }
        }
    }

    /**
     * Limits the number of kicks in a period of time.
     * 
     * Good to prevent cheating.
     * 
     * @param min The minimum number of logic-frames between two kicks. It is impossible to kick faster than this.
     * @param rate Similar to min but lets players save up extra kicks to use them later depending on the value of burst.
     * @param burst Determines how many extra kicks the player is able to save up.
     */
    setKickRateLimit(min: number, rate: number, burst: number): void {
        this._room.setKickRateLimit(min, rate, burst);
    }
}