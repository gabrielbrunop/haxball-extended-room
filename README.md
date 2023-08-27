# Haxball Extended Room

**Haxball Extended Room** works on top of the standard Haxball API, adding new features such as modulation, types and common functionalities.

- No need to create your own command handler -- add new **commands** for your room with ease.

- Players are now organized into classes. Changing someone's admin status is as simple as setting `player.admin` to true. Make players bigger or smaller changing the `player.radius` property. The same is true for discs!

- Pretty logging system with CSS. Logs are automatically handled by the API.

- Simplified names.

- A convenient module system. Stop working with a single massive Javascript file -- modularize your Haxball room.

## Installation

### Using NPM

```bash
npm install haxball-extended-room
```
Importing (ES6):
```js
import { Room } from "haxball-extended-room";
```

## Usage

Rooms made with Haxball Extended Room can be either coupled with Haxball.js and run from Node.js, or compiled using a bundler into a browser JS file. Here I'll be compiling it using ESBuild.

This section will use JavaScript, but elsewhere TypeScript will be used.

### Setting up our project

First make sure you have [npm](https://www.npmjs.com/get-npm "npm") installed.
Create a folder and start a new project with:
```
npm init
```
Create a **src** folder where we'll insert our code and make a new **bot.js** file there.
Install ESBuild:
```bash
npm install --save-exact esbuild
```
Install Haxball Extended Room if you haven't done it yet:
```bash
npm install haxball-extended-room
```
The structure of our project should look like this:
```
📦 project-name
 ┣ 📂src
 ┃ ┗ 📜bot.js
 ┣ 📂node_modules
 ┣ 📜package-lock.json
 ┗ 📜package.json
```
6. Change your `package.json` scripts to this:
```json
"scripts": {
  "build": "esbuild ./src/bot.js --bundle --outfile=./dist/bundle.js"
}
```

### Creating our first room

Now we can get up and running with Haxball development. Open the **bot.js** file and write this:

```js
const HER = require("haxball-extended-room");

const Room = HER.Room;

new Room({
    roomName: "My room",
    maxPlayers: 16,
    public: false
});
```

Now let's compile it:

```bash
npm run build
```
Now you can now copy the results from `dist/bundle.js` and paste them onto the [Haxball Headless site](https://www.haxball.com/headless "Haxball Headless site").

### Node.js & Typescript

For performance reasons, I recommended running your room with Node.js using the [Haxball.js](https://github.com/mertushka/haxball.js) package.

First we install TypeScript and Haxball.js:

```bash
npm install typescript haxball.js
```

And write a main.ts file like this:

```typescript
import HaxballJS from "haxball.js";
import { Room } from "haxball-extended-room";

const token = process.argv[2];

HaxballJS.then((HBInit) => {
    const room = new Room({
        roomName: "My room",
        maxPlayers: 16,
        public: false,
        token
    }, HBInit);
    
    room.onRoomLink = link => console.log(link);
});
```

## Features

### Commands

What all rooms in Haxball have in common is commands, but most of them aren't more than a bunch of if and elses. Commands in HER are real classes with many options such as:

- name, aliases, description, usage
- roles for a permission system
- decide whether delete the user's message
- advanced argument system for commands

An example of a command:

```typescript
room.command({
    name: "kick",
    aliases: ["disconnect", "out"],
    desc: "Kicks a player from the room",
    usage: "leave #id reason",
    roles: ["admin"],
    deleteMessage: true, // this is default
    func: ($: CommandExecInfo) => {
        const playerID = $.arguments[0].replace("#", "").toNumber();
        const reason = $.arguments[1] ?? "";

        const player = room.players[arg];
             
        if (player) player.kick(reason);
    }
});
```

### Extended player

Player is a class that extends AbstractDisc -- the class from which both the Player and Disc classes are derived. Therefore, it contains options to change the player's disc such as `player.radius` as well as specific player options like `player.admin` and even some very helpful methods -- `player.ban()` and `player.kick()` summarize it pretty well.

If that weren't enough, it also contains ways by which you can get the player's IP (`player.ip`) and even location (`player.geolocation`)!

Some of the features are:

- get conn (`player.conn`) and IP (`player.ip`)
- special permission roles with `player.roles` (also `addRole`, `hasRole` and `removeRole` methods) as well as settings with the `player.settings` property
- get the player's continent, country, region, city, language and much more with `player.geolocation`
- set a player's avatar using `player.setAvatar()`
- send a private message to a player using `player.reply()`
- get a player's team (`player.team`) and make them admin (`player.admin = true`)
- change the player's disc with many disc properties such as `radius`, `xgravity`, `xspeed`, `cGroup`, `position` and much more

### Plugins

Modularize your room to the extreme with Plugins.

They are self-contained and reusable. You can use the same plugin in many different projects!

Plugins are classes with a `@createPlugin` decorator (you may need to allow decorators in your compiler to make them work). The room object is passed when the plugin is instantiated. You can create events and commands inside a plugin.

Events are created with a `@createEvent` decorator and a class method with the same name as the event. Commands are made of `@createCommand()` decorators and the name of the class method they precede will be the command's name.

An example of a welcome plugin:

```typescript
import { createPlugin, Room, createEvent, Player, Colors, ChatStyle } from "haxball-extended-room";

/**
 * Sends a welcome message.
 */
@createPlugin
export class WelcomePlugin {
    constructor(private $: Room) { }

    /** Events */

    @createEvent
    onPlayerGeoLocationFetch(player: Player) {
        this.$.send({
            message: `Hey ${player.name}! How are things going in ${player.geolocation.country}?`,
            color: Colors.MediumSeaGreen,
            style: ChatStyle.Bold
        });
    }
}
```

And a leave command plugin:

```typescript
import { createPlugin, Room, createCommand, CommandExecInfo } from "haxball-extended-room";

/**
 * Adds a good-bye command to the room.
 */
@createPlugin
export class ByePlugin {
    constructor(private $: Room) { }

    /** Commands */

    @createCommand({
        aliases: ["cya", "gn"]
    })
    bb($: CommandExecInfo) {
        $.player.kick("Bye!");
    }
}
```

## Browser support

This API should work on modern browsers like Chrome, Firefox, Safari and other browsers based on them. IE is not supported.

## API

Check the [Haxball official API documentation](https://github.com/haxball/haxball-issues/wiki/Headless-Host) for more information.

### Room

This is the main class by which you can control the room, the players, the events, the map as well as add commands and plugins to the room.

Once instantiated, it will be added to the `window` object.

#### `new (roomConfig: RoomConfigObject): Room`

Creates the room with the Haxball's [`RoomConfigObject`](https://github.com/haxball/haxball-issues/wiki/Headless-Host#roomconfigobject) properties. The only difference here is that `noPlayer` is true by default.

```js
new Room({
    roomName: "My room",
    maxPlayers: 16,
    public: false,
});

const room = window["Room"];
```

#### `Room.name: string`

> This property is defined when instantiating the room and is read-only.

 Gets the name of the room.

#### `Room.playerName: string | undefined`

> This property is defined when instantiating the room and is read-only.

Gets the name of the host player. This will be `undefined` if the `noPlayer` property is set to `true`.

#### `Room.maxPlayers: number`

> This property is defined when instantiating the room and is read-only.

Gets the maximum number of players that can join the room.

#### `Room.geo: RoomGeoLocation | undefined`

> This property is defined when instantiating the room and is read-only.
>
> This will be `undefined` if the  `geo` property has not been set at instantiation.

Gets the Room's geolocation.

#### `Room.token: string | undefined`

> This property is defined when instantiating the room and is read-only.
>
> This will be `undefined` if the `token` property has not been set at instantiation.

Gets the room's token.

#### `Room.noPlayer: boolean`

> This property is defined when instantiating the room and is read-only.
>
> Defaults to `true`.

Whether the room has a bot player. In Haxball's API this is `false` by default but it's recommended to set it to `true`. In the Haxball Extended Room's API it's `true` by default and it's not only strongly recommended but a `false` noPlayer is also deprecated. [Learn more here](https://github.com/haxball/haxball-issues/wiki/Headless-Host#noplayer--bool).

#### `Room.settings: Settings`

Room's custom settings.

This is useful if you want to have global variables (especially in plugins).

Example:

```js
room.settings.chatmuted = true;

room.onPlayerChat = function (player, message) {
    if (room.settings.chatmuted) return false;   
}
```

#### `Room.customEvents: EventEmitter`

NodeJS event emitter for the implementation of custom events.

Example:

```js
room.customEvents.emit('playerAFK', player);

room.customEvents.on('playerAFK', (player: Player) => onPlayerAFK(player));
```

#### `Room.logging: boolean`

> Defaults to `true`.

Whether to use the room's own extended logger.

#### `Room.noPermissionMessage: MessageObject`

> This is setter only.

The message a player receives when they don't have enough permissions to run a command.

#### `Room.players: PlayerList`

> This is getter only.

The list of online players.

Each player is represented by a number property in the PlayerList object, which is their ID.

When a player leaves the room, the property is deleted.

Example:

```js
// Gets the name of the player whose ID is 1.
room.players[1].name;

// Gives admin to the player whose ID is 5.
room.players[5].admin = true;
```

#### `Room.discs: Disc[]`

> This is getter only.

The list of discs in the current map. Excludes the players' discs.

#### `Room.scores: ScoresObject`

> This is getter only.
>
> This will be `null` if no game is in progress.

The room's scores object.

#### `Room.CollisionFlags: CollisionFlagsObject`

> This is read only.

A list of all Haxball's collision flags.

#### `Room.ball: DiscPropertiesObject`

> This is getter only.
>
> This will be `null` if no game is in progress.

The ball disc.

#### `Room.discCount: number`

> This is getter only.
>
> This will be `null` if no game is in progress.

The total number of discs in game.

#### `Room.commands: Command[]`

> This is getter only.
>

The list of commands.

To add or remove commands use `room.command()` and `room.removeCommand()`.

#### `Room.password: string | null`

> This will be `null` if not password is set at the moment.

Gets the room's password.

Lock the room with a password using `room.setPassword()`.

#### `Room.prefix: string`

> Defaults to "!".

The prefix for the room's commands.

#### `Room.plugins: PluginList`

> This is getter only.

The list of plugins loaded to the room.

#### `Room.native: RoomObject`

> This is getter only.

Gets the Haxball's native room object.

#### `Room.paused: boolean`

> This is getter only.

Whether the room is paused or not.

#### `Room.command(options: CommandOptions): void`

Adds a command to the room.

#### `Room.removeCommand(name: string): void`

Deletes a command from the room.

#### `Room.plugin<T>(Plugin: HERPlugin<T>, options?: PluginOptions): this`

Adds a plugin to the room.

#### `Room.removePlugin<T>(pluginOrName: string | HERPlugin<T>): void`

Removes a plugin from the room.

#### `Room.isGameInProgress(): boolean`

Returns whether a game is in progress.

#### `Room.chat(message: string, playerID?: number): void`

> This is deprecated!

This method was intended to work with `noPlayer: false`, but nowadays `noPlayer: false` is not recommended anymore and is only mantained due to backwards compatibility by the Haxball API. Use `send()` instead.

#### `Room.unban(id: number): void`

Unbans a player based on their past ID.

#### `Room.unbanAll(): void`

Unbans all banned players.

#### `Room.setScoreLimit(limit: number): void`

> If a game is in progress this method does nothing.

Changes the score limit of the room.

#### `Room.setTimeLimit(limit: number): void`

> If a game is in progress this method does nothing.

Changes the time limit of the room.

#### `Room.setStadium(stadium: {} | DefaultStadiums): void`

> If a game is in progress this method does nothing.

Changes the room stadium.

This method combines both setCustomStadium and setDefaultStadium.

`stadium` should be either an HBS map in JSON or a default stadium name.

#### `Room.lockTeams(): void`

Locks the teams.

When teams are locked players cannot move themselves unless an admin moves them.

#### `Room.unlockTeams(): void`

Unlock the teams.

#### `Room.setTeamColors(team: TeamID | "all", teamColors: TeamColors): void`

Changes the uniform of a team.

The `team` property can be set to `"all"` to set colors for both teams.

#### `Room.start(): void`

> If a game is in progress this method does nothing.

Starts the game if none is in progress.

#### `Room.stop(): void`

> If a game is **not** in progress this method does nothing.

Stops the game in progress.

#### `Room.pause(): void`

> If a game is **not** in progress this method does nothing.

Pauses the game.

#### `Room.unpause(): void`

> If a game is **not** in progress this method does nothing.

Unpauses the game.

#### `Room.startRecording(): void`

Starts recording a Haxball Replay. Don't forget to call `stopRecording()` to prevent a memory leak.

#### `Room.stopRecording(): Uint8Array`

>Returns null if no recording is in progress.

Stops the recording.

#### `Room.setPassword(password: string): void`

Locks the room with a password.

#### `Room.clearPassword(): void`

Clears the room password.

#### `Room.enableCaptcha(): void`

Forces players to solve a captcha before joining the room. Good to prevent automated attacks.

#### `Room.disableCaptcha(): void`

Disables the captcha requirement.

#### `Room.reorderPlayers(ids: Array<number>, moveToTop: boolean): void`

First all players listed are removed, then they are reinserted in the same order they appear in the list.

`moveToTop` is whether players should be inserted at the top or at the bottom of the list.

#### `Room.send(options: MessageObject): void`

Sends an announcement.

Example:

```js
room.send({ message: "Hello world!" });
room.send({ message: "What a beautiful day!", color: Colors.Yellow, style: ChatStyle.Bold });
```

#### `Room.setKickRateLimit(min: number, rate: number, burst: number): void`

Limits the number of kicks in a period of time. Good to prevent cheating.

`min` is the minimum number of logic-frames between two kicks. It is impossible to kick faster than this.

`rate` is similar to min but lets players save up extra kicks to use them later depending on the value of burst.

`burst` determines how many extra kicks the player is able to save up.

#### `Room.onPlayerJoin(player: Player): void`

> This is a room event and is setter only.

Event called when a player joins the room.

`geolocation` is not available here and will return `undefined`. Use the `onPlayerGeoLocationFetch` event instead.

#### `Room.onPlayerLeave(player: Player): void`

> This is a room event and is setter only.

Event called when a player leaves the room.

#### `Room.onTeamVictory(scores: ScoresObject): void`

> This is a room event and is setter only.

Event called when a team wins the game.

#### `Room.onPlayerChat(player: Player, message: string): boolean | void`

> This is a room event and is setter only.

Event called when a player sends a message.

If the event function returns `false` the message will not be sent.

#### `Room.onPlayerBallKick(player: Player): void`

> This is a room event and is setter only.

Event called when a player kicks the ball.

#### `Room.onTeamGoal(team: TeamID): void`

> This is a room event and is setter only.

Event called when a team scores a goal.

#### `Room.onGameStart(byPlayer?: Player): void`

> This is a room event and is setter only.
>
> `byPlayer` will be null if the game is started programatically (such as the `Room.start()` method).

Event called when the a game is started.

#### `Room.onGameStop(byPlayer?: Player): void`

> This is a room event and is setter only.
>
> `byPlayer` will be null if the game is started programatically (such as the `Room.stop()` method).

Event called when the game is stopped.

#### `Room.onPlayerAdminChange(changedPlayer: Player, byPlayer?: Player): void`

> This is a room event and is setter only.
>
> `byPlayer` will be null if the player's admin status is changed programatically (such as the `Player.admin` property).

Event called when a player's admin status is changed.

#### `Room.onPlayerTeamChange(changedPlayer: Player, byPlayer?: Player): void`

> This is a room event and is setter only.
>
> `byPlayer` will be null if the player is moved programatically (such as the `player.team` property).

Event called when a player is moved to another team.

#### `Room.onPlayerKicked: (kickedPlayer: PlayerObject, reason?: string, byPlayer?: Player): void`

> This is a room event and is setter only.
>
> `byPlayer` will be null if the player is kicked programatically (such as the `Player.kick()` method).

Event called when a player has been kicked from the room.

This event is always called after the onPlayerLeave event.

**Warning: bans have been moved to onPlayerBanned!**

#### `Room.onPlayerBanned: (bannedPlayer: PlayerObject, reason?: string, byPlayer?: Player): void`

> This is a room event and is setter only.
>
> `byPlayer` will be null if the player is kicked programatically (such as the `Player.ban()` method).

Event called when a player is banned from the room.

This event is always called after the onPlayerLeave event.

#### `Room.onGameTick(): void`

> This is a room event and is setter only.

Event called when the game ticks (60 times per second). 

This event will not called if no game is in progress or the game is paused.

#### `Room.onGamePause(byPlayer?: Player): void`

> This is a room event and is setter only.
>
> `byPlayer` will be null if the game is paused programatically (such as the `pause()` method).

Event called when the game is paused.

#### `Room.onGameUnpause(byPlayer?: Player): void`

> This is a room event and is setter only.
>
> `byPlayer` will be null if the game is unpaused programatically (such as the `pause()` method).

Event called when the game is unpaused.

After this event there's a timer before the game is fully unpaused, to detect when the game has really resumed you can listen for the first `Room.onGameTick` event after this event is called.

#### `Room.onPositionsReset(): void`

> This is a room event and is setter only.

Event called when the discs' positions are reset after a goal.

#### `Room.onPlayerActivity(player: Player): void`

> This is a room event and is setter only.

Event called when a player gives signs of activity, such as pressing a key.

This is useful for detecting inactive players.

#### `Room.onStadiumChange(newStadiumName: string, byPlayer?: Player): void`

> This is a room event and is setter only.
>
> `byPlayer` will be null if the stadium is changed programatically (such as the `setStadium()` method).

Event called when the stadium is changed.

#### `Room.onRoomLink(link: string): void`

> This is a room event and is setter only.

Event called when the room link is obtained.

#### `Room.onKickRateLimitSet(min: number, rate: number, burst: number, byPlayer?: Player): void`

> This is a room event and is setter only.

Event called when the kick rate is set.

#### `Room.onPlayerGeoLocationFetch(player: Player): void` 

> This is a room event and is setter only.

Event called when a player's geolocation is fetched.

The player's geolocation can be accessed by the `Player.geolocation` property.

If it is `undefined` then the fetching operation failed.



------

### Player

This class represents a player in the room. You can get a list of all online players with `room.players`. To get a specific player, use `room.players[playerID]`.

**Players are discs, so all discs properties (except `Disc.color` and `Disc.index`) also applies to players. When the player is not in a game, the disc properties will return undefined.**

#### `Player.name: string`

> This property is read-only.

 Gets the player's name.

#### `Player.id: number`

> This property is read-only.

Gets the player's ID. Each time a player joins the room, a new ID will be assigned. IDs never change.

#### `Player.auth: string | undefined`

> This property is read-only.
>
> Can be null if the ID validation fails.

The player's public ID. Players can view their own IDs [here](https://www.haxball.com/playerauth).

The public ID is useful to validate whether a player is who they claim to be, but can't be used to verify whether that player isn't someone else.

Which means it's useful for implementing user accounts, but not useful for implementing a banning system.

#### `Player.conn: string`

> This property is read-only.

A string that uniquely identifies the player's connection.

If two players are in the same network then they will have equal conns.

This property is based on the player's IP. A decoded version with the full IP can be found in the `ip` property.

#### `Player.ip: string`

> This property is read-only.

The player's IP, decoded from the `conn` property.

#### `Player.settings: Settings`

Player custom settings.

This is useful if you want to create your own properties for your players.

Example:

```js
// Creates a prefix for your players' messages
room.onPlayerJoin = function (player) {
    // Set up prefix setting
    player.settings.prefix = "[Top 1]";
}

room.onPlayerChat = function (player, message) {
    // Override the player's message with the new prefix setting
    room.send({ message: `${player.settings.prefix} ${player.name}: ${message}` });
    return false;
}
```

#### `Player.fetchGeoLocation(): Promise<PlayerGeoLocation>`

Fetches the player's geolocation based on their IP, stores it on the `geolocation` property and returns it.

This can fail if the fetch operation fails.

#### `Player.setAvatar(avatar: string): void`

Overrides the player's avatar.

#### `Player.clearAvatar(): void`

Removes the overrider for the player's avatar.

#### `Player.kick(reason?: string): void`

Kicks the player from the room.

#### `Player.ban(reason?: string): void`

Bans the player from joining again.

Haxball bans are IP bans, so if the player changes their IP, they will be able to join the room again.

#### `Player.reply(message: MessageObject): void`

Sends a private message to the player.

#### `Player.canKick(disc: Disc): boolean`

Checks whether a player is in a kickable distance relative to the specified disc.

#### `Player.addRole(role: Role): void`

Attaches a new role to the player.

#### `Player.removeRole(role: Role): void`

Removes a player's role.

#### `Player.hasRole(role: Role): boolean`

Checks whether a player has the specified role.

#### `Player.roles: Role[]`

> This is getter only.

The player's roles.

Roles are used as a permission system by commands.

If a command has been defined with a certain role, it'll check whether the player has it too.

**The "admin" role is restricted and will be automatically assigned to players with admin status.**

#### `Player.team(): TeamID`

The player's team.

#### `Player.admin(): boolean`

The player's admin status.

#### `Player.position(): Position`

The player's position on the map.

#### `Player.tag(): string`

The player's tag (`name #id`).

#### `Player.mention(): string`

The player's mention (`@player`).

#### `Player.geolocation(): PlayerGeoLocation`

The player's geolocation based on their IP.

This value is not set at the `onPlayerJoin` event and will be null until it is fetched.

Once fetched, the `onPlayerGeoLocationFetch` event will be called.



------

### Disc

This class represents a disc on the map. You can get all available discs using `Room.discs`. 

Properties may return `number | null | undefined` depending on whether the disc is on the map at the moment. Generally, if they're not on the map they will return `undefined`.

**Players are discs, so all discs properties (except `Disc.color` and `Disc.index`) also applies to players. When the player is not in a game, the disc properties will return undefined.**

#### `Disc.x: number | null | undefined`

The x coordinate of the disc's position.

#### `Disc.y: number | null | undefined`

The y coordinate of the disc's position.

#### `Disc.xspeed: number | null | undefined`

The x coordinate of the disc's speed vector.

#### `Disc.yspeed: number | null | undefined`

The y coordinate of the disc's speed vector.

#### `Disc.xgravity: number | null | undefined`

The x coordinate of the disc's gravity vector.

#### `Disc.ygravity: number | null | undefined`

The y coordinate of the disc's gravity vector.

#### `Disc.radius: number | null | undefined`

The disc's radius.

#### `Disc.bCoeff: number | null | undefined`

The disc's bouncing coefficient.

#### `Disc.invMass: number | null | undefined`

The inverse of the disc's mass.

#### `Disc.damping: number | null | undefined`

The disc's damping factor.

#### `Disc.cMask: number | null | undefined`

The disc's collision mask.

Represents which groups the disc can collide with.

[More information here.](https://github.com/haxball/haxball-issues/wiki/Collision-Flags)

#### `Disc.cGroup: number | null | undefined`

The disc's collision groups.

[More information here.](https://github.com/haxball/haxball-issues/wiki/Collision-Flags)

#### `Disc.color: number | null | undefined`

The disc's color.

Set the value to -1 to make the disc transparent.

#### `Disc.distanceTo(disc: AbstractDisc): number | null`

> Returns null if one of the discs is not in the game.

The distance between two discs.

#### `Disc.collidingWith(disc: AbstractDisc): boolean`

Whether two discs are colliding.

#### `Disc.settings: Settings`

Same as `Player.settings`.



------

### Command

A class that represents a command. You can add a command to the room using `Room.command()` and remove it with `Room.removeCommand()`. To get all commands on the room use `Room.commands`.

#### `Command.name: string`

> This property is read-only.

 Gets the command's name.

#### `Command.aliases: string[]`

The command's aliases.

#### `Command.roles: (Role | string)[]`

The permission roles.

If a player doesn't have all the specified roles, they will be blocked from running the command.

#### `Command.desc: string`

The command's description.

Useful for a help command.

#### `Command.usage: string`

The command's usage.

Useful for a help command or an error message.

#### `Command.deleteMessage: boolean`

> Defaults to `true`.

Whether to delete the player's message.

#### `Command.func: CommandFunc`

The command's function.

A `CommandFunc` is a function with a `CommandExecInfo` parameter: `(info: CommandExecInfo) => void`.

#### `Command.isAllowed(player: Player): boolean`

Whether the player is allowed to run this command based on their roles.

#### `Command.run(info: CommandExecInfo): void`

Runs the command.



------

### PlayerList

A special class that works as a list of players. You can get the room's player list using `Room.players`.

Every property with a number as a key is a Player. The key is their ID: `[id: number]: Player`. When a player leaves the property is deleted.

You can also iterate over this object.

#### `PlayerList.size: number`

How many players are on the list.

#### `PlayerList.add(player: Player): void`

Adds a player to the list.

#### `PlayerList.remove(player: Player | PlayerObject | number): void`

Removes a player from the list.

`player` can be a Player, a native PlayerObject or a player ID.

#### `PlayerList.get(predicate: number | ((player: Player) => boolean)): Player | undefined`

Gets a player from the list.

If you're using this to find players by their ID, consider using `players[id]` instead.

`predicate` can be a player ID or a function.

#### `PlayerList.getAll(predicate: (player: Player) => boolean): PlayerList`

Gets multiple players based on a filtering function.

#### `PlayerList.values(): Array<Player>`

Gets an array with all players on the list.

#### `PlayerList.order(room: Room): PlayerList`

Gets the players according to their order in the native `getPlayerList()` method.

#### `PlayerList.first(): Player`

Gets the first player on the list.

#### `PlayerList.last(): Player | undefined`

Gets the last player on the list.

#### `PlayerList.getByName(name: string): PlayerList`

Gets a player by their name.

#### `PlayerList.getByAuth(auth: string): Player | undefined`

Gets a player by their public ID.

#### `PlayerList.getByConnOrIP(connOrIP: string): PlayerList`

Gets players by their conn or IP.

#### `PlayerList.kick(reason?: string): void`

Kicks all players on the list.

#### `PlayerList.ban(reason?: string): void`

Bans all players on the list.

#### `PlayerList.spectators(): PlayerList`

Gets the room's spectators.

#### `PlayerList.red(): PlayerList`

Gets the red team's players.

#### `PlayerList.blue(): PlayerList`

Gets the blue team's players.

#### `PlayerList.teams(): PlayerList`

Gets the red and blue teams' players.

#### `PlayerList.admins(): PlayerList`

Gets all players with admin status.

#### `PlayerList.reply(message: MessageObject): void`

Sends a private message to all players on the list.

#### `PlayerList.toString(): string`

String representation of a PlayerList.



------

### Plugin

Plugins are classes that contains a `@createPlugin` [decorator](https://www.typescriptlang.org/docs/handbook/decorators.html).

When a plugin is loaded using `Room.plugin()`, three arguments are passed in the constructor: the room object, a PluginSettings object and a Translator function.

Inside plugins you can create new commands using the `@createCommand()` decorator and assign new events with the `@createEvent` decorator.

#### PluginOptions

This should be passed as the second parameter of the `Room.plugin()` method.

It can contain two properties:

##### `PluginOptions.settings?: PluginSettings`

Some settings you want the plugin to have. For example, an AFK command plugin could be called like this:

```js
room.plugin(AFKPlugin, {
    settings: {
        blockAFKInGame: true,
    }
});
```

And in the AFK command:

```typescript
@createCommand({
    usage: "afk"
})
afk($: CommandExecInfo): void {
    if (this.settings.blockAFKInGame && $.room.isGameInProgress() && $.player.team !== Teams.Spectators) {
        return $.player.reply({ message: "You can't be AFK mid game!" });
    }
}
```

`PluginSettings` is defined as `[setting: string]: string | boolean | number | {}`.

##### `PluginOptions.languagePack?: { [key: string]: string }`

An option to translate a plugin's messages. Plugins that have a Translator function will replace the original string by a languagePack's property value if the property key matches the Translator name parameter.

For example:

Inside the plugin:

```js
$.room.send({ message: this.translate("%% is not AFK anymore!", "UN_AFK", $.player.name) });
```

When calling the `Room.plugin()` method:

```typescript
room.plugin(AFKPlugin, {
    languagePack: {
        "UN_AFK": "%% ya no es AFK!" // Now Spanish speakers will be able to understand our plugin!
    }
});
```

#### Translator

`(original: string, name: string, ...params: string[]) => string`

A function passed as a argument to the plugin's constructor.

With this you can create multilingual plugins.

An example:

```js
this.$.send({ message: this.translate("%% scored a goal! %% - %%", "GOAL_SCORED", player.name, scores.red, scores.blue) });
```

#### Decorators

Decorators are used to declare metadata information. There are three special decorators we can use to create plugins:

##### `@createPlugin`

Declares that a class is a plugin.

```js
@createPlugin
class AFKPlugin { }
```

##### `@createCommand(options?: Omit<CommandOptions, "func" | "name">)`

Transforms a Plugin class' method into a command. The method's name is the command's name and the method itself is the func property.

```typescript
@createCommand()
help($: CommandExecInfo): void {}
```

```typescript
@createCommand({
    usage: "afk"
    desc: "Becomes AFK."
})
help($: CommandExecInfo): void { }
```

##### `@createEvent`

The room event whose name matches a method's name with this decorator will execute that method. Methods are always executed before events defined in the Room object.

```typescript
@createEvent
onPlayerJoin () {
    this.updateAdmins();
}
```

#### A full example of a plugin

bot.ts

```typescript
import { Room } from "haxball-extended-room";
import { AFKPlugin } from "afk-command.plugin";

const room = new Room({
    roomName: "My room",
    maxPlayers: 16
});

room.plugin(AFKPlugin);
```

afk-command.plugin.ts

```typescript
import { createPlugin, Room, PluginSettings, Translator, createCommand, CommandExecInfo, Teams, createEvent, Player } from "haxball-extended-room";

@createPlugin
export class AFKPlugin {    
    constructor(private $: Room, private settings: PluginSettings, private translate: Translator) { }
    
    /** Commands */

    @createCommand({
        usage: "afk"
    })
    afk($: CommandExecInfo): void {
        if (this.settings.blockAFKInGame && $.room.isGameInProgress() && $.player.team !== Teams.Spectators) {
            return $.player.reply({ message: this.translate("You cannot be AFK mid-game!", "AFK_ERR_1") });
        }

        if ($.player.settings.afk) {
            $.player.settings.afk = false;
            
            $.room.send({ message: this.translate("%% is not AFK anymore!", "UN_AFK", $.player.name) });
            $.room.customEvents.emit('unafk', $.player);
        } else {
            if ($.room.settings.afkable === false) {
                return $.player.reply({ message: this.translate("You cannot be AFK now!", "AFK_ERR_3") });
            }
            
            $.player.settings.afk = true;
            
            $.room.send({ message: this.translate("%% is now AFK!", "AFK", $.player.name) });
            $.room.customEvents.emit('afk', $.player);

            if ($.player.team !== Teams.Spectators) $.player.team = Teams.Spectators;
        }
    }
    
    /** Events */

    @createEvent
    onPlayerTeamChange(changedPlayer: Player) {
        if (changedPlayer.team !== Teams.Spectators) {
            if (changedPlayer.settings.afk) {
                changedPlayer.team = Teams.Spectators;
                this.$.send({ message: this.translate("%% is AFK and cannot be moved!", "AFK_ERR_2", changedPlayer.name) });
            }
        }
    }
}
```



------

### CommandOptions

#### `readonly CommandOptions.name: string;`

The command's name.

#### `CommandOptions.aliases?: string[];`

The command's aliases.

#### `CommandOptions.desc?: string;`

The command's description. Useful for a help command.

#### `CommandOptions.usage?: string;`

The command's usage. Useful for a help command or an error message.

#### `CommandOptions.roles?: (string | Role)[];`

The permission roles.

If a player doesn't have all the specified roles, they will be blocked from running the command.

#### `CommandOptions.deleteMessage?: boolean;`

Whether to delete the player's message.

#### `CommandOptions.func: CommandFunc;`

The command's function.



------

### CommandExecInfo

#### `CommandExecInfo.player: Player`

The player who ran the command.

#### `CommandExecInfo.message: string`

The player's message.

#### `CommandExecInfo.room: Room`

The room object.

#### `CommandExecInfo.at: Date`

When the command was executed.

#### `CommandExecInfo.arguments: CommandArgument[]`

A list of arguments passed to the command.



------

### CommandArgument

#### `CommandArgument.number: boolean`

> RegExp: `/^\d+$/`

Whether it is a valid number.

#### `CommandArgument.yesno: boolean`

> RegExp: `/^(y(es)?|n(o)?)/i`

Whether it is a "yes" or a "no".

#### `CommandArgument.password: boolean`

> RegExp: `/^[a-zA-Z0-9_@.!*$?&%-]{1,16}$/i`

Whether it is a valid password string according to our standards.

#### `CommandArgument.extended: boolean`

>  RegExp: `/^[a-zA-Z0-9\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]*$/i`

Whether it is alphanumeric (with * and $ as exceptions).

#### `CommandArgument.specialExtended: boolean`

>  RegExp: `/^[a-zA-Z0-9\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F_@.!*$?&%-]*$/i`

Includes @.!?&%- to the extended option.

#### `CommandArgument.toNumber(): number`

Parses the argument to a number.

#### `CommandArgument.toString(): string`

Returns the argument itself.



------

### Settings

#### `[setting: string]: string | boolean | number`



------

### PlayerGeoLocation

A player's geolocation information.

#### `city: string`

The player's approximate city. This is often not accurate. 

#### `continent: string`

The player's continent.

#### `country: string`

The player's country.

#### `language: string`

The player's language.

#### `org: string`

The player's ISP.

#### `region: string`

The player's region (such as a state or a province).

#### `timezone: string`

The player's timezone.



------

### MessageObject

#### `message: string`

A message to be sent.

#### `targetID?: number`

The ID of the player this message is directed to. If undefined then it will be sent to every player in the room.

#### `color?: number | string`

The color of the message.

Preferably this should be a color integer. For example, `0xFFFFFF` (which returns `16777215`) is the white color.

#### `style?: ChatStyle`

The style of the message. It can be `"normal"`, `"bold"`, `"italic"`, `"small"`, `"small-bold"` or `"small-italic"`.

Default is `"normal"`.

#### `sound?: ChatSounds`

The sound the message will produce. `0` is none, `1` is normal and `2` is notification.



------

### TeamColors

The colors of a team.

[This site may help you with team colors.](https://haxcolors.com/)

#### `angle: number`

The angle of the stripes.

#### `textColor: number`

The color of the player's avatar.

#### `colors: number[]`

The colors of the stripes. It can contain up to 3 colors, which correspond to 3 stripes.



------

### Global

Helpful enums for Haxball development.

These are also available on the window object.

#### Teams

Red, Blue and Spectators teams.

#### Stadiums

Haxball's default stadiums.

#### ChatSounds

A list of sounds for room announcements.

#### ChatStyle

A list of styles for room announcements.

#### Colors

A huge list of colors.

#### RoomGeoList

A list of geolocation overrides for countries with a presence in the game's community.