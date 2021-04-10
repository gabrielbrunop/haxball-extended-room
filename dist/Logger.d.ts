import "./types";
import { Player } from "./Player";
/**
 * CSS-stylized log options.
 */
export interface LoggerStyle {
    template?: string;
    timestampTag?: string;
    tag?: string;
    tagContent?: string;
    message: MessageObject;
}
/**
 * Sends an anonymous, untraceable log.
 *
 * @param params
 */
export declare function anonymous(...params: any[]): void;
/**
 * Logs a room announcement.
 *
 * @param message The message object.
 */
export declare function announcement(message: MessageObject): void;
/**
 * Logs a private message.
 *
 * @param message The message object.
 * @param player The player who received the message.
 */
export declare function direct(message: MessageObject, player: Player): void;
/**
 * Logs a player chat message.
 *
 * @param message The message object.
 * @param player The player who sent the message.
 */
export declare function chat(message: MessageObject, player: Player): void;
/**
 * Logs an admin's chat message.
 *
 * @param message The message object.
 * @param player The player who sent the message.
 */
export declare function admin(message: MessageObject, player: Player): void;
/**
 * Logs a generic message.
 *
 * @param message The message object.
 */
export declare function log(message: MessageObject): void;
