import { CommandArgument } from "./CommandArgument";
import { Player } from "./Player";
import { Role, AdminRole } from "./Role";
import { Room } from "./Room";

export type CommandFunc = (info: CommandExecInfo) => void;

export interface CommandOptions {
    readonly name: string;
    aliases?: string[];
    desc?: string;
    usage?: string;
    roles?: CommandRole[];
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

type CommandRole = Role | string;

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
     * If all the player's roles are below this, they will be blocked from running the command.
     */
    roles: CommandRole[] = [];
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
    deleteMessage: boolean = true;
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
        if (this.roles.includes(AdminRole) && player.admin) return true;
        if (player.roles.find(r => r.override)) return true;

        return this.roles.length > 0 ? this.roles.some(role => player.hasRole(role)) : true;
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