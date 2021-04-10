"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEvent = exports.createCommand = exports.createPlugin = void 0;
require("reflect-metadata");
/**
 * Creates a plugin.
 *
 * Plugins are self-contained, reusable modules that can be added to a Room object.
 */
function createPlugin(target) {
    Reflect.defineMetadata('her:plugin', true, target);
}
exports.createPlugin = createPlugin;
/**
 * Creates a command for a plugin.
 *
 * The name of the function will be the name of the command, and the function itself will be the `func` property.
 *
 * @param options Command options (without name or func properties).
 */
function createCommand(options) {
    return (target, key, descriptor) => {
        const commands = Reflect.getMetadata('her:commands', target);
        const command = Object.assign({ name: key, func: descriptor.value }, options);
        if (commands) {
            commands.push(command);
        }
        else {
            Reflect.defineMetadata('her:commands', [command], target);
        }
    };
}
exports.createCommand = createCommand;
/**
 * Creates an event for a plugin.
 */
const createEvent = (target, key, descriptor) => {
    const events = Reflect.getMetadata('her:events', target);
    const event = { name: key, func: descriptor.value };
    if (events) {
        events.push(event);
    }
    else {
        Reflect.defineMetadata('her:events', [event], target);
    }
};
exports.createEvent = createEvent;
//# sourceMappingURL=Plugin.js.map