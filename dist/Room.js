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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
require("@abraham/reflection");
require("./types");
const Logger = __importStar(require("./Logger"));
const Player_1 = require("./Player");
const Command_1 = require("./Command");
const Disc_1 = require("./Disc");
const PlayerList_1 = require("./PlayerList");
const CommandList_1 = require("./CommandList");
const CommandArgument_1 = require("./CommandArgument");
const ConnHistory = __importStar(require("./ConnectionHistory"));
const Global_1 = require("./Global");
const Settings_1 = require("./Settings");
const events_1 = require("events");
/** Class representing a Haxball room. */
class Room {
    /**
     * Starts the room and stores it in the window object.
     *
     * @param roomConfig
     */
    constructor(roomConfig) {
        var _a, _b;
        /**
         * The list of Haxball discs.
         * @private
         */
        this._discs = [];
        /**
         * The list of plugins.
         */
        this._plugins = [];
        /**
         * Contains flag constants that are used as helpers for reading and writing collision flags.
         */
        this.CollisionFlags = {
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
         * Room custom settings.
         *
         * This is useful if you want to have global variables (especially in plugins).
         *
         * @example
         * room.settings.chatmuted = true;
         *
         * room.onPlayerChat = function (player, message) {
         *  if (room.settings.chatmuted) return false;
         * }
         */
        this.settings = new Settings_1.Settings();
        /**
         * NodeJS event emitter for the implementation of custom events.
         */
        this.customEvents = new events_1.EventEmitter();
        /**
         * Whether to use the room's own extended logger.
         */
        this.logging = true;
        /**
         * Message thrown when a player uses a command without having permission to do that.
         */
        this._insufficientPermissionsMessage = {
            message: "You're not allowed to use this command!",
            color: Global_1.Colors.Red,
            style: Global_1.ChatStyle.Bold,
            sound: Global_1.ChatSounds.Notification
        };
        /**
         * Message thrown when a player uses a command too fast.
         */
        this._playerCommandCooldownMessage = {
            message: "Don't type commands too fast!",
            color: Global_1.Colors.Red,
            style: Global_1.ChatStyle.Bold,
            sound: Global_1.ChatSounds.Notification
        };
        /**
         * The default prefix.
         * @private
         */
        this._defaultPrefix = "!";
        /**
         * Gets a message command structure.
         *
         * The first item of the array is the command name, while the rest are the arguments.
         *
         * @param message The player message.
         * @returns The message structure.
         * @private
         */
        this._desconstructMessage = (message) => {
            return message.slice(this.prefix.length).trim().split(/ +/);
        };
        /**
         * Retrieves the command name from a message command.
         *
         * @param message The player message.
         * @returns The command name.
         */
        this._getCommandName = (message) => {
            return this._desconstructMessage(message)[0].toLowerCase();
        };
        /**
         * Retrieves the command arguments from a message command.
         *
         * @param message The player message.
         * @returns The command arguments.
         */
        this._getArguments = (message) => {
            return this._desconstructMessage(message).slice(1);
        };
        if (window["room"] !== undefined)
            throw new Error("Cannot instantiate twice!");
        if (roomConfig.noPlayer == null)
            roomConfig.noPlayer = true;
        this._room = window.HBInit(roomConfig);
        this.name = roomConfig.roomName;
        this.playerName = roomConfig.playerName;
        this.maxPlayers = roomConfig.maxPlayers;
        this.geo = roomConfig.geo;
        this.token = roomConfig.token;
        this.noPlayer = (_a = roomConfig.noPlayer) !== null && _a !== void 0 ? _a : true;
        this._password = (_b = roomConfig.password) !== null && _b !== void 0 ? _b : null;
        this._players = new PlayerList_1.PlayerList();
        this._commands = new CommandList_1.CommandList(this._defaultPrefix);
        this.prefix = this._defaultPrefix;
        this._setAllEvents();
        this._initialMessage();
        window["room"] = this;
        window["Colors"] = Global_1.Colors;
        window["ChatSounds"] = Global_1.ChatSounds;
        window["ChatStyle"] = Global_1.ChatStyle;
        window["Teams"] = Global_1.Teams;
        window["Stadiums"] = Global_1.Stadiums;
    }
    /**
     * Updates the onPlayerBanned and onPlayerKicked events.
     */
    _setKickEvent() {
        this._room.onPlayerKicked = (kickedPlayer, reason, ban, byPlayer) => {
            if (this.logging) {
                Logger.log({ message: `${kickedPlayer.name} was ${ban ? "banned" : "kicked"} ${byPlayer ? `by ${byPlayer.name} ` : ``}${reason ? `(${reason})` : ``}`, color: Global_1.Colors.Haxball });
            }
            if (ban) {
                this._runEvent("onPlayerBanned", this._onPlayerBannedFunction, kickedPlayer, reason, byPlayer);
            }
            else {
                this._runEvent("onPlayerKicked", this._onPlayerKickedFunction, kickedPlayer, reason, byPlayer);
            }
        };
    }
    /**
     * Set all events to a empty function so the changes made to the native events will work.
     * @private
     */
    _setAllEvents() {
        this.onGamePause = () => { };
        this.onGameStart = () => { };
        this.onGameStop = () => { };
        this.onGameTick = () => { };
        this.onGameUnpause = () => { };
        this.onKickRateLimitSet = () => { };
        this.onPlayerActivity = () => { };
        this.onPlayerAdminChange = () => { };
        this.onPlayerBallKick = () => { };
        this.onPlayerBanned = () => { };
        this.onPlayerChat = () => true;
        this.onPlayerJoin = () => { };
        this.onPlayerKicked = () => { };
        this.onPlayerLeave = () => { };
        this.onPlayerTeamChange = () => { };
        this.onPositionsReset = () => { };
        this.onRoomLink = () => { };
        this.onStadiumChange = () => { };
        this.onTeamGoal = () => { };
        this.onTeamVictory = () => { };
        this.onPlayerGeoLocationFetch = () => { };
    }
    _runEvent(name, func, ...args) {
        this._plugins.forEach(plugin => {
            plugin.events.forEach(event => {
                if (event.name === name)
                    event.func(...args);
            });
        });
        func(...args);
    }
    /**
     * Sends an informative message.
     *
     * This method is called once when the room is started.
     */
    _initialMessage() {
        Logger.anonymous("%cHaxball Extended Room", "color:#233E82; display: block;font-weight:bold; font-size:38px; background:#fff;");
        Logger.anonymous("%cA better API for Haxball", "color:#222; font-family:'Ubuntu'; font-weight:100; font-size:24px; background:#fff;");
    }
    /**
     * Event called when a player kicks the ball.
     *
     * @event
     */
    set onPlayerBallKick(func) {
        this._room.onPlayerBallKick = (p) => this._runEvent("onPlayerBallKick", func, this.players[p.id]);
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
    set onPlayerKicked(func) {
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
    set onPlayerBanned(func) {
        this._onPlayerBannedFunction = func;
        this._setKickEvent();
    }
    /**
     * Event called when the game ticks (60 ticks per second).
     *
     * This event will not called if no game is in progress or the game is paused.
     *
     * @event
     */
    set onGameTick(func) {
        this._room.onGameTick = () => this._runEvent("onGameTick", func);
    }
    /**
     * Event called when a team scores a goal.
     *
     * @event
     */
    set onTeamGoal(func) {
        this._room.onTeamGoal = (team) => this._runEvent("onTeamGoal", func, team);
    }
    /**
     * Event called when the discs' positions are reset after a goal.
     *
     * @event
     */
    set onPositionsReset(func) {
        this._room.onPositionsReset = () => this._runEvent("onPositionsReset", func);
    }
    /**
     * Event called when a player gives signs of activity, such as pressing a key.
     *
     * This event is useful for detecting inactive players.
     *
     * @event
     */
    set onPlayerActivity(func) {
        this._room.onPlayerActivity = (p) => this._runEvent("onPlayerActivity", func, this.players[p.id]);
    }
    /**
     * Event called when a player gets the room's link.
     *
     * @event
     */
    set onRoomLink(func) {
        this._room.onRoomLink = (link) => this._runEvent("onRoomLink", func, link);
    }
    /**
     * Event called when the kick rate is set.
     *
     * @event
     */
    set onKickRateLimitSet(func) {
        this._room.onKickRateLimitSet = (m, r, b, bP) => this._runEvent("onKickRateLimitSet", func, m, r, b, this.players[bP === null || bP === void 0 ? void 0 : bP.id]);
    }
    /**
     * Event called when a player joins the room.
     *
     * `geolocation` is not available here and will return `undefined`. Use the `onPlayerGeoLocationFetch` event instead.
     *
     * @event
     */
    set onPlayerJoin(func) {
        this._room.onPlayerJoin = (p) => {
            const player = new Player_1.Player(this, p);
            this.players.add(player);
            player.fetchGeoLocation().then(() => {
                const playerInfo = {
                    id: player.id,
                    auth: player.auth,
                    name: player.name,
                    joinedAt: new Date(Date.now())
                };
                ConnHistory.get(player.ip).then(history => {
                    if (history) {
                        history.players.push(playerInfo);
                        ConnHistory.set(history);
                    }
                    else {
                        ConnHistory.set({
                            ip: player.ip,
                            geo: player.geolocation,
                            players: [playerInfo]
                        });
                    }
                });
                this._onPlayerGeoLocationFetchFunction(player);
            }).catch(e => {
                console.error("Unable to fetch player's geolocation", e);
            });
            if (this.logging) {
                Logger.log({ message: `${player.name} has joined`, color: Global_1.Colors.Haxball });
            }
            this._runEvent("onPlayerJoin", func, player);
        };
    }
    /**
     * Event called when a player leaves the room.
     *
     * @event
     */
    set onPlayerLeave(func) {
        this._room.onPlayerLeave = (p) => {
            const player = this.players[p.id];
            this.players.remove(player);
            if (this.logging) {
                Logger.log({ message: `${player.name} has left`, color: Global_1.Colors.Haxball });
            }
            this._runEvent("onPlayerLeave", func, player);
        };
    }
    /**
     * Event called when a team wins the game.
     *
     * @event
     */
    set onTeamVictory(func) {
        this._room.onTeamVictory = (scores) => {
            if (this.logging) {
                const teamWon = scores.red > scores.blue ? "Red" : "Blue";
                Logger.log({ message: `${teamWon} team won the match`, color: Global_1.Colors.Haxball });
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
    set onPlayerChat(func) {
        this._room.onPlayerChat = (p, msg) => {
            const player = this.players[p.id];
            const command = this._commands.get(this._getCommandName(msg));
            let commandRun = null;
            if (msg[0] === this.prefix && command && player.canUseCommands) {
                if (!player.canRunCommandsCooldown()) {
                    player.reply(this._playerCommandCooldownMessage);
                    return false;
                }
                if (!command.isAllowed(player)) {
                    player.reply(this._insufficientPermissionsMessage);
                    return false;
                }
                const args = this._getArguments(msg).map(arg => new CommandArgument_1.CommandArgument(arg));
                commandRun = () => {
                    command.run({
                        player: player,
                        at: new Date(Date.now()),
                        message: msg,
                        room: this,
                        arguments: args
                    });
                };
                player.updateCooldown();
                if (command.deleteMessage) {
                    commandRun();
                    return false;
                }
            }
            for (const plugin of this._plugins) {
                for (const event of plugin.events) {
                    if (event.name === "onPlayerChat") {
                        if (event.func(player, msg) === false) {
                            if (commandRun)
                                commandRun();
                            return false;
                        }
                    }
                }
            }
            if (func(player, msg) === false) {
                if (commandRun)
                    commandRun();
                return false;
            }
            if (this.logging) {
                if (player.admin) {
                    Logger.admin({ message: msg }, player);
                }
                else {
                    Logger.chat({ message: msg }, player);
                }
            }
            if (commandRun)
                commandRun();
        };
    }
    /**
     * Event called when the a game is started.
     *
     * `byPlayer` will be null if the game is started programatically (such as the `start()` method).
     *
     * @event
     */
    set onGameStart(func) {
        this._room.onGameStart = (p) => {
            const player = this.players[p === null || p === void 0 ? void 0 : p.id];
            if (this.logging)
                Logger.log({ message: `Game started ${player ? `by ${player.name}` : ``}`, color: Global_1.Colors.Haxball });
            for (let i = 0; i < this.discCount; i++) {
                this._discs.push(new Disc_1.Disc(this, i));
            }
            this._runEvent("onGameStart", func, player);
        };
    }
    /**
     * Event called when the game is stopped.
     *
     * `byPlayer` will be null if the game is started programatically (such as the `stop()` method).
     *
     * @event
     */
    set onGameStop(func) {
        this._room.onGameStop = (bP) => {
            const player = this.players[bP === null || bP === void 0 ? void 0 : bP.id];
            if (this.logging)
                Logger.log({ message: `Game stopped ${player ? `by ${player.name}` : ``}`, color: Global_1.Colors.Haxball });
            this._discs = [];
            this._runEvent("onGameStop", func, player);
        };
    }
    /**
     * Event called when a player's admin status is changed.
     *
     * `byPlayer` will be null if the player's admin status is changed programatically (such as the `player.admin` property).
     *
     * @event
     */
    set onPlayerAdminChange(func) {
        this._room.onPlayerAdminChange = (cP, bP) => {
            const changedPlayer = this.players[cP.id];
            const byPlayer = this.players[bP === null || bP === void 0 ? void 0 : bP.id];
            if (this.logging) {
                if (changedPlayer.admin) {
                    Logger.log({ message: `${changedPlayer.name} was given admin rights ${byPlayer ? `by ${byPlayer.name}` : ``}`, color: Global_1.Colors.Haxball });
                }
                else {
                    Logger.log({ message: `${changedPlayer.name}'s admin rights were taken away ${byPlayer ? `by ${byPlayer.name}` : ``}`, color: Global_1.Colors.Haxball });
                }
            }
            this._runEvent("onPlayerAdminChange", func, changedPlayer, byPlayer);
        };
    }
    /**
     * Event called when a player is moved to another team.
     *
     * `byPlayer` will be null if the player is moved programatically (such as the `player.team` property).
     *
     * @event
     */
    set onPlayerTeamChange(func) {
        this._room.onPlayerTeamChange = (cP, bP) => {
            const changedPlayer = this.players[cP.id];
            const byPlayer = this.players[bP === null || bP === void 0 ? void 0 : bP.id];
            if (this.logging) {
                let team = "";
                if (changedPlayer.team === Global_1.Teams.Red)
                    team = "Red";
                if (changedPlayer.team === Global_1.Teams.Blue)
                    team = "Blue";
                if (changedPlayer.team === Global_1.Teams.Spectators)
                    team = "Spectators";
                Logger.log({ message: `${changedPlayer.name} was moved to ${team} ${byPlayer ? `by ${byPlayer.name}` : ``}`, color: Global_1.Colors.Haxball });
            }
            this._runEvent("onPlayerTeamChange", func, changedPlayer, byPlayer);
        };
    }
    /**
     * Event called when the game is paused.
     *
     * `byPlayer` will be null if the game is paused programatically (such as the `pause()` method).
     *
     * @event
     */
    set onGamePause(func) {
        this._room.onGamePause = (bP) => {
            const byPlayer = this.players[bP === null || bP === void 0 ? void 0 : bP.id];
            if (this.logging) {
                Logger.log({ message: `Game paused ${byPlayer ? `by ${byPlayer.name}` : ``}`, color: Global_1.Colors.Haxball });
            }
            this._runEvent("onGamePause", func, byPlayer);
        };
    }
    /**
     * Event called when the game is unpaused.
     *
     * `byPlayer` will be null if the game is unpaused programatically (such as the `pause()` method).
     *
     * @event
     */
    set onGameUnpause(func) {
        this._room.onGameUnpause = (bP) => this._runEvent("onGameUnpause", func, this.players[bP === null || bP === void 0 ? void 0 : bP.id]);
    }
    /**
     * Event called when the room stadium is changed.
     *
     * `byPlayer` will be null if the stadium is changed programatically (such as the `setStadium()` method).
     *
     * @event
     */
    set onStadiumChange(func) {
        this._room.onStadiumChange = (newStadiumName, bP) => {
            const byPlayer = this.players[bP === null || bP === void 0 ? void 0 : bP.id];
            if (this.logging) {
                Logger.log({ message: `Stadium "${newStadiumName}" loaded ${byPlayer ? `by ${byPlayer.name}` : ``}`, color: Global_1.Colors.Haxball });
            }
            this._runEvent("onStadiumChange", func, newStadiumName, byPlayer);
        };
    }
    /**
     * Event called when a player's geolocation is fetched.
     *
     * The player's geolocation can be accessed by the `geolocation` property.
     *
     * If it is `null` then the fetching operation failed.
     *
     * @event
     */
    set onPlayerGeoLocationFetch(func) {
        this._onPlayerGeoLocationFetchFunction = (player) => this._runEvent("onPlayerGeoLocationFetch", func, player);
    }
    /**
     * The message you receive when you don't have enough permissions to run a command.
     */
    set noPermissionMessage(message) {
        this._insufficientPermissionsMessage = message;
    }
    /**
     * The message you receive when you type commands too fast (`Player.commandsCooldown`).
     */
    set commandCooldownMessage(message) {
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
    get players() {
        return this._players;
    }
    /**
     * The list of discs in current map.
     */
    get discs() {
        return this._discs;
    }
    /**
     * The scores object.
     *
     * If no game is in progress then this will return `null`.
     */
    get scores() {
        return this._room.getScores();
    }
    /**
     * The ball disc.
     */
    get ball() {
        return this.discs[0];
    }
    /**
     * The total number of discs.
     */
    get discCount() {
        return this._room.getDiscCount();
    }
    /**
     * The list of commands.
     */
    get commands() {
        return this._commands.list;
    }
    /**
     * The room's password.
     *
     * Returns null if no password is set.
     */
    get password() {
        return this._password;
    }
    /**
     * The room's command prefix.
     */
    get prefix() {
        return this._commands.prefix;
    }
    set prefix(value) {
        this._commands.prefix = value;
    }
    /**
     * The room's plugins.
     */
    get plugins() {
        return this._plugins;
    }
    /**
     * Gets the room's native object.
     */
    get native() {
        return this._room;
    }
    /**
     * Adds a command to the room.
     *
     * @param options Command options.
     */
    command(options) {
        this._commands.add(new Command_1.Command(options));
    }
    /**
     * Deletes a command.
     *
     * @param name Command name.
     */
    removeCommand(name) {
        this._commands.remove(name);
    }
    /**
     * Adds a plugin to the room.
     *
     * Plugins are classes with the `@createPlugin` decorator.
     *
     * @param Plugin A plugin class.
     */
    plugin(Plugin, options) {
        if (!Reflect.getMetadata('her:plugin', Plugin)) {
            throw new Error("The given argument is not a valid plugin.");
        }
        const translate = (original, name, ...params) => {
            if (options === null || options === void 0 ? void 0 : options.languagePack) {
                for (const [strName, str] of Object.entries(options.languagePack)) {
                    if (strName === name) {
                        return [str, ...params].reduce((p, c) => p.replace(/%%/, c));
                    }
                }
            }
            return [original, ...params].reduce((p, c) => p.replace(/%%/, c));
        };
        const plugin = new Plugin(this, options === null || options === void 0 ? void 0 : options.settings, translate);
        const commands = Reflect.getMetadata('her:commands', Plugin.prototype) || [];
        const events = Reflect.getMetadata('her:events', Plugin.prototype) || [];
        events.map(e => {
            e.func = e.func.bind(plugin);
            return e;
        });
        commands.forEach(command => {
            command.func = command.func.bind(plugin);
            this.command(command);
        });
        this._plugins.push({
            name: Plugin.name,
            commands: commands,
            events: events
        });
        return this;
    }
    /**
     * Removes a plugin from the room.
     *
     * @param pluginOrName The plugin's name or the plugin itself (or any class with the same name).
     */
    removePlugin(pluginOrName) {
        var _a;
        const name = typeof pluginOrName !== "string" ? pluginOrName.name : pluginOrName;
        (_a = this._plugins.find(p => p.name === name)) === null || _a === void 0 ? void 0 : _a.commands.forEach(c => {
            const cmd = this._commands.get(c.name);
            if (cmd) {
                if (c.name === (cmd === null || cmd === void 0 ? void 0 : cmd.name) && c.func === (cmd === null || cmd === void 0 ? void 0 : cmd.func)) {
                    this._commands.remove(c.name);
                }
            }
        });
        this._plugins = this._plugins.filter(p => p.name !== name);
    }
    /**
     * Checks whether a game is in progress.
     */
    isGameInProgress() {
        return this.scores != null;
    }
    /**
     * @deprecated
     *
     * Deprecated since 29/07/2019
     *
     * This method was intended to work with noPlayer: false,
     * but nowadays noPlayer: false is not recommended anymore
     * and is only mantained due to backwards compatibility
     * by the Haxball API.
     *
     * Messages sent using this method won't be logged.
     *
     * Use `send()` instead.
     */
    chat(message, playerID) {
        var _a;
        if (playerID && ((_a = this.players[playerID]) === null || _a === void 0 ? void 0 : _a.canReadChat)) {
            this._room.sendChat(message, playerID);
        }
        if (!playerID) {
            for (const player of this.players) {
                if (!player.canReadChat)
                    continue;
                this._room.sendChat(message, player.id);
            }
        }
    }
    /**
     * Unbans a player based on their past ID.
     *
     * @param id The player's ID.
     */
    unban(id) {
        this._room.clearBan(id);
    }
    /**
     * Unbans all banned players.
     */
    unbanAll() {
        this._room.clearBans();
    }
    /**
     * Changes the score limit of the room.
     *
     * If a game is in progress this method does nothing.
     *
     * @param limit Score limit.
     */
    setScoreLimit(limit) {
        this._room.setScoreLimit(limit);
    }
    /**
     * Changes the time limit of the room.
     *
     * If a game is in progress this method does nothing.
     *
     * @param limit Time limit.
     */
    setTimeLimit(limit) {
        this._room.setTimeLimit(limit);
    }
    /**
     * Changes the room stadium.
     *
     * If a game is in progress then this method does nothing.
     *
     * This method combines both setCustomStadium and setDefaultStadium in one place.
     *
     * @param stadium Either a HBS map in JSON or a default stadium name.
     */
    setStadium(stadium) {
        if (typeof stadium === "object")
            this._room.setCustomStadium(JSON.stringify(stadium));
        if (typeof stadium === "string")
            this._room.setDefaultStadium(stadium);
    }
    /**
     * Locks the teams.
     *
     * When teams are locked players cannot move themselves unless an admin moves them.
     */
    lockTeams() {
        this._room.setTeamsLock(true);
    }
    /**
     * Unlock the teams.
     *
     * When teams are locked players cannot move themselves unless an admin moves them.
     */
    unlockTeams() {
        this._room.setTeamsLock(false);
    }
    /**
     * Changes the uniform of a team.
     *
     * @param team The team ID or "all" to both teams.
     * @param teamColors The color.
     */
    setTeamColors(team, teamColors) {
        if (team === "all") {
            this._room.setTeamColors(Global_1.Teams.Red, teamColors.angle, teamColors.textColor, teamColors.colors);
            this._room.setTeamColors(Global_1.Teams.Blue, teamColors.angle, teamColors.textColor, teamColors.colors);
        }
        else {
            this._room.setTeamColors(team, teamColors.angle, teamColors.textColor, teamColors.colors);
        }
    }
    /**
     * Starts the game if none is in progress.
     */
    start() {
        this._room.startGame();
    }
    /**
     * Stops the game in progress.
     */
    stop() {
        this._room.stopGame();
    }
    /**
     * Pauses the game.
     */
    pause() {
        this._room.pauseGame(true);
    }
    /**
     * Unpauses the game.
     */
    unpause() {
        this._room.pauseGame(false);
    }
    /**
     * Starts recording a Haxball Replay.
     *
     * Don't forget to call stopRecording() to prevent a memory leak.
     */
    startRecording() {
        this._room.startRecording();
    }
    /**
     * Stops the recording.
     *
     * @returns The file content as a Uint8Array or null if no recording is in progress.
     */
    stopRecording() {
        return this._room.stopRecording();
    }
    /**
     * Locks the room with a password.
     *
     * @param password A password for the room.
     */
    setPassword(password) {
        this._password = password;
        this._room.setPassword(password);
    }
    /**
     * Clears the room password.
     */
    clearPassword() {
        this._password = null;
        this._room.setPassword(null);
    }
    /**
     * Forces players to solve a captcha before joining the room.
     */
    enableCaptcha() {
        this._room.setRequireRecaptcha(true);
    }
    /**
     * Disables the captcha requirement.
     */
    disableCaptcha() {
        this._room.setRequireRecaptcha(false);
    }
    /**
     * First all players listed are removed, then they are reinserted in the same order they appear in the list.
     *
     * @param ids ID list.
     * @param moveToTop Whether players should be inserted at the top or at the bottom of the list .
     */
    reorderPlayers(ids, moveToTop) {
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
    send(options) {
        var _a, _b;
        if (options.targetID && ((_a = this.players[options.targetID]) === null || _a === void 0 ? void 0 : _a.canReadChat)) {
            this._room.sendAnnouncement(options.message, options.targetID, options.color, options.style, options.sound);
        }
        if (!options.targetID) {
            for (const player of this.players) {
                if (!player.canReadChat)
                    continue;
                this._room.sendAnnouncement(options.message, player.id, options.color, options.style, options.sound);
            }
        }
        if (this.logging) {
            if (options.targetID && ((_b = this.players[options.targetID]) === null || _b === void 0 ? void 0 : _b.canReadChat)) {
                Logger.direct(options, this.players[options.targetID]);
            }
            else {
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
    setKickRateLimit(min, rate, burst) {
        this._room.setKickRateLimit(min, rate, burst);
    }
}
exports.Room = Room;
//# sourceMappingURL=Room.js.map