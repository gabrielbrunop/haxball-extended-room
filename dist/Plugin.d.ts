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
export declare type Translator = (original: string, name: string, ...params: string[]) => string;
/**
 * Custom settings for a plugin.
 */
export declare type PluginSettings = {
    [setting: string]: string | boolean | number | {};
};
/**
 * A list of events from a plugin.
 */
export declare type EventList = {
    name: string;
    func: Function;
}[];
/**
 * A list of plugins.
 */
export declare type PluginList = {
    name: string;
    commands: CommandOptions[];
    events: EventList;
}[];
/**
 * Options to initialize a plugin.
 */
export declare type PluginOptions = {
    settings?: PluginSettings;
    languagePack?: {
        [key: string]: string;
    };
};
/**
 * A plugin type.
 */
export declare type HERPlugin<T> = new ($: Room, options?: PluginSettings, translate?: Translator) => T;
/**
 * Creates a plugin.
 *
 * Plugins are self-contained, reusable modules that can be added to a Room object.
 */
export declare function createPlugin(target: Function): void;
/**
 * Creates a command for a plugin.
 *
 * The name of the function will be the name of the command, and the function itself will be the `func` property.
 *
 * @param options Command options (without name or func properties).
 */
export declare function createCommand(options?: Omit<CommandOptions, "func" | "name">): (target: Object, key: string, descriptor: PropertyDescriptor) => void;
/**
 * Creates an event for a plugin.
 */
export declare const createEvent: (target: Object, key: string, descriptor: PropertyDescriptor) => void;
