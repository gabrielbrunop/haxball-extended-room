import { CommandArgument } from "./CommandArgument";
import { Player } from "./Player";
import { Room } from "./Room";

export type CommandFunc = (info: CommandExecInfo) => void;

export interface CommandOptions {
    readonly name: string;
    aliases?: string[];
    desc?: string;
    usage?: string;
    roles?: string[];
    deleteMessage?: boolean;
    func: CommandFunc;
}

export interface CommandExecInfo {
    player: Player,
    message: string,
    room: Room,
    at: Date,
    arguments: CommandArgument[]
}

/** Class representing a command. */
export class Command implements CommandOptions {
    /**
     * The command's name.
     * @readonly
     */
    readonly name: string;
    /**
     * The command's aliases.
     */
    aliases: string[] = [];
    /**
     * The permission roles.
     * 
     * If a player doesn't have all the specified roles, they will be blocked from running the command.
     */
    roles: string[] = [];
    /**
     * The command's description.
     * 
     * Useful for a help command.
     */
    desc: string;
    /**
     * The command's usage.
     * 
     * Useful for a help command or an error message.
     */
    usage: string;
    /**
     * Whether to delete the player's message.
     */
    deleteMessage = true;
    /**
     * The command's function.
     */
    func: CommandFunc;
    
    /**
     * Creates a command object.
     * 
     * @param options Command configurations.
     */
    constructor(options: CommandOptions) {
        this.name = options.name;
        this.aliases = options.aliases ?? this.aliases;
        this.desc = options.desc ?? "";
        this.usage = options.usage ?? "";
        this.roles = options.roles ?? this.roles;
        this.deleteMessage = options.deleteMessage ?? this.deleteMessage;
        this.func = options.func;
    }

    /**
     * Whether the player is allowed to run this command based on their roles.
     * 
     * @param player The player.
     */
    isAllowed(player: Player): boolean {
        return this.roles.every(role => player.hasRole(role));
    }

    /**
     * Runs the command.
     * 
     * @param info The command's execution information.
     */
    run(info: CommandExecInfo): void {
        try {
            this.func(info);
        } catch (e) {
            console.error(e);
        }
    }
}