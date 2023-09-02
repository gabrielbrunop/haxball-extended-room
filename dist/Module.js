"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomEvent = exports.Event = exports.ModuleCommand = exports.Module = void 0;
require("@abraham/reflection");
/**
 * Creates a module.
 *
 * Modules are self-contained, reusable modules that can be added to a Room object.
 */
function Module(target) {
    Reflect.defineMetadata('her:module', true, target);
}
exports.Module = Module;
/**
 * Creates a command for a module.
 *
 * The name of the function will be the name of the command, and the function itself will be the `func` property.
 *
 * @param options Command options (without name or func properties).
 */
function ModuleCommand(options) {
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
exports.ModuleCommand = ModuleCommand;
/**
 * Creates an event for a module.
 */
const Event = (target, key, descriptor) => {
    const events = Reflect.getMetadata('her:events', target);
    const event = { name: key, func: descriptor.value };
    if (events) {
        events.push(event);
    }
    else {
        Reflect.defineMetadata('her:events', [event], target);
    }
};
exports.Event = Event;
/**
 * Creates a custom event for a module.
 */
const CustomEvent = (target, key, descriptor) => {
    const events = Reflect.getMetadata('her:custom_events', target);
    const event = { name: key, func: descriptor.value };
    if (events) {
        events.push(event);
    }
    else {
        Reflect.defineMetadata('her:custom_events', [event], target);
    }
};
exports.CustomEvent = CustomEvent;
//# sourceMappingURL=Module.js.map