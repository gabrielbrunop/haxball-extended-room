"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandList = void 0;
/** A class representing a list of commands. */
class CommandList {
    /**
     * Creates a list of commands.
     *
     * @param prefix The commands' prefix.
     * @param items A list of commands to start with.
     */
    constructor(prefix, ...items) {
        /**
         * Command list array.
         */
        this._list = [];
        this._prefix = prefix;
        items.forEach(c => this._list.push(c));
    }
    /**
     * An array with the commands.
     */
    get list() {
        return this._list;
    }
    /**
     * The prefix to which the command will listen.
     */
    get prefix() {
        return this._prefix;
    }
    set prefix(value) {
        this._prefix = value;
    }
    /**
     * Adds a command to the list.
     *
     * If the command name or aliases is already being used by another command, it will replace them.
     *
     * @param command
     */
    add(command) {
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
    get(search) {
        return this._list.find(cmd => cmd.name === search) || this._list.find(cmd => { var _a; return ((_a = cmd.aliases) === null || _a === void 0 ? void 0 : _a.indexOf(search)) !== -1; });
    }
    /**
     * Removes a command.
     *
     * @param command Command name or alias.
     */
    remove(command) {
        this._list = this._list.filter(cmd => { var _a; return cmd.name !== command && cmd.name !== ((_a = command) === null || _a === void 0 ? void 0 : _a.name); });
    }
}
exports.CommandList = CommandList;
//# sourceMappingURL=CommandList.js.map