import { Command } from "./Command";
/** A class representing a list of commands. */
export declare class CommandList {
    /**
     * Command list array.
     */
    private _list;
    /**
     * The commands' prefix.
     */
    private _prefix;
    /**
     * Creates a list of commands.
     *
     * @param prefix The commands' prefix.
     * @param items A list of commands to start with.
     */
    constructor(prefix: string, ...items: Command[]);
    /**
     * An array with the commands.
     */
    get list(): Command[];
    /**
     * The prefix to which the command will listen.
     */
    get prefix(): string;
    set prefix(value: string);
    /**
     * Adds a command to the list.
     *
     * If the command name or aliases is already being used by another command, it will replace them.
     *
     * @param command
     */
    add(command: Command): void;
    /**
     * Gets a command.
     *
     * @param search Command name or alias.
     */
    get(search: string): Command | undefined;
    /**
     * Removes a command.
     *
     * @param command Command name or alias.
     */
    remove(command: string | Command): void;
}
