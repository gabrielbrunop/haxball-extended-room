import { CommandArgument } from "./CommandArgument";
import { Player } from "./Player";
import { Role } from "./Role";
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
    player: Player;
    message: string;
    room: Room;
    at: Date;
    arguments: CommandArgument[];
}
type CommandRole = Role | string;
/** Class representing a command. */
export declare class Command implements CommandOptions {
    /**
     * The command's name.
     * @readonly
     */
    readonly name: string;
    /**
     * The command's aliases.
     */
    aliases: string[];
    /**
     * The permission roles.
     *
     * If all the player's roles are below this, they will be blocked from running the command.
     */
    roles: CommandRole[];
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
    deleteMessage: boolean;
    /**
     * The command's function.
     */
    func: CommandFunc;
    /**
     * Creates a command object.
     *
     * @param options Command configurations.
     */
    constructor(options: CommandOptions);
    /**
     * Whether the player is allowed to run this command based on their roles.
     *
     * @param player The player.
     */
    isAllowed(player: Player): boolean;
    /**
     * Runs the command.
     *
     * @param info The command's execution information.
     */
    run(info: CommandExecInfo): void;
}
export {};
