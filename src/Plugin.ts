import 'reflect-metadata';
import { CommandOptions } from "./Command";
import { Room } from './Room';

/**
 * A translator function for a plugin.
 * 
 * Can be used to create multilingual plugins.
 * 
 * @example
 * this.translate("Hello, %%!", "HELLO", $.player.name);
 */
export type Translator = (original: string, name: string, ...params: string[]) => string;

/**
 * Custom settings for a plugin.
 */
export type PluginSettings = {
    [setting: string]: string | boolean | number | {};
}

/**
 * A list of events from a plugin.
 */
export type EventList = {
    name: string,
    func: Function
}[];

/**
 * A list of plugins.
 */
export type PluginList = {
    name: string,
    commands: CommandOptions[],
    events: EventList
}[];

/**
 * Options to initialize a plugin.
 */
export type PluginOptions = {
    settings?: PluginSettings,
    languagePack?: {
        [key: string]: string
    }
}

/**
 * A plugin type.
 */
export type HERPlugin<T> = new($: Room, options?: PluginSettings, translate?: Translator) => T;

/**
 * Creates a plugin.
 * 
 * Plugins are self-contained, reusable modules that can be added to a Room object.
 */
export function createPlugin(target: Function) {
    Reflect.defineMetadata('her:plugin', true, target);
}

/**
 * Creates a command for a plugin.
 * 
 * The name of the function will be the name of the command, and the function itself will be the `func` property.
 * 
 * @param options Command options (without name or func properties).
 */
export function createCommand(options?: Omit<CommandOptions, "func" | "name">) {
    return (target: Object, key: string, descriptor: PropertyDescriptor) => {
        const commands = Reflect.getMetadata('her:commands', target);

        const command: CommandOptions = {
            name: key,
            func: descriptor.value,
            ...options
        };

        if (commands) {
            commands.push(command);
        } else {
            Reflect.defineMetadata('her:commands', [command], target);
        }
    }
}

/**
 * Creates an event for a plugin.
 */
export const createEvent = (target: Object, key: string, descriptor: PropertyDescriptor) => {
    const events = Reflect.getMetadata('her:events', target);
    const event = { name: key, func: descriptor.value };

    if (events) {
        events.push(event);
    } else {
        Reflect.defineMetadata('her:events', [event], target);
    }
}