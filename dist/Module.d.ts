import '@abraham/reflection';
import { CommandOptions } from "./Command";
import { Room } from './Room';
/**
 * A translator function for a module.
 *
 * Can be used to create multilingual modules.
 *
 * @example
 * this.translate("Hello, %%!", "HELLO", $.player.name);
 */
export type Translator = (original: string, name: string, ...params: string[]) => string;
/**
 * Custom settings for a module.
 */
export type ModuleSettings = {
    [setting: string]: string | boolean | number | {};
};
/**
 * A list of events from a module.
 */
export type EventList = {
    name: string;
    func: Function;
}[];
/**
 * A list of custom events from a module.
 */
export type CustomEventList = {
    name: string;
    func: (...args: any[]) => void;
}[];
/**
 * A list of modules.
 */
export type ModuleList = {
    name: string;
    commands: CommandOptions[];
    events: EventList;
    customEvents: CustomEventList;
}[];
/**
 * Options to initialize a module.
 */
export type ModuleOptions = {
    settings?: ModuleSettings;
    languagePack?: {
        [key: string]: string;
    };
};
/**
 * A module type.
 */
export type HERModule<T> = new ($: Room, options?: ModuleSettings, translate?: Translator) => T;
/**
 * Creates a module.
 *
 * Modules are self-contained, reusable modules that can be added to a Room object.
 */
export declare function Module(target: Function): void;
/**
 * Creates a command for a module.
 *
 * The name of the function will be the name of the command, and the function itself will be the `func` property.
 *
 * @param options Command options (without name or func properties).
 */
export declare function ModuleCommand(options?: Omit<CommandOptions, "func" | "name">): (target: Object, key: string, descriptor: PropertyDescriptor) => void;
/**
 * Creates an event for a module.
 */
export declare const Event: (target: Object, key: string, descriptor: PropertyDescriptor) => void;
/**
 * Creates a custom event for a module.
 */
export declare const CustomEvent: (target: Object, key: string, descriptor: PropertyDescriptor) => void;
