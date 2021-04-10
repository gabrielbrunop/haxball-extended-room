import { Command } from "./Command";

/** A class representing a list of commands. */
export class CommandList {
    /**
     * Command list array.
     */
    private _list: Command[] = [];
    /**
     * The commands' prefix.
     */
    private _prefix: string;

    /**
     * Creates a list of commands.
     * 
     * @param prefix The commands' prefix.
     * @param items A list of commands to start with.
     */
    constructor(prefix: string, ...items: Command[]) {
        this._prefix = prefix;

        items.forEach(c => this._list.push(c));
    }

    /**
     * An array with the commands.
     */
    get list(): Command[] {
        return this._list;
    }

    /**
     * The prefix to which the command will listen.
     */
    get prefix(): string {
        return this._prefix;
    }

    set prefix(value: string)  {
        this._prefix = value;
    }

    /**
     * Adds a command to the list.
     * 
     * If the command name or aliases is already being used by another command, it will replace them.
     * 
     * @param command 
     */
    add(command: Command): void {
        command.aliases.forEach(a => {
            this.remove(a);
        });

        this.remove(command.name);

        this._list.push(command);
    }

    /**
     * Gets a command.
     * 
     * @param search Command name or alias.
     */
    get(search: string): Command | undefined {
		return this._list.find(cmd => cmd.name === search) || this._list.find(cmd => cmd.aliases?.indexOf(search) !== -1);
	}

    /**
     * Removes a command.
     * 
     * @param command Command name or alias.
     */
    remove(command: string | Command): void {
        this._list = this._list.filter(cmd => cmd.name !== command && cmd.name !== (command as Command)?.name);
    }
}