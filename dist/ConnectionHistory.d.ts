import { PlayerGeoLocation } from '.';
/**
 * An IP's connection history object.
 */
export interface ConnectionHistory {
    ip: string;
    geo: PlayerGeoLocation | null;
    players: PlayerHistory[];
}
/**
 * Player's basic information for caching and room history.
 */
export interface PlayerHistory {
    /**
     * The player's ID.
     */
    id: number;
    /**
     * The player's name.
     */
    name: string;
    /**
     * The player's public ID.
     */
    auth?: string;
    /**
     * The time the player joined the room.
     */
    joinedAt: Date;
}
/**
 * Gets an IP's history on the room.
 *
 * @param key The IP.
 */
export declare function get(key: string): Promise<ConnectionHistory | undefined>;
/**
 * Inserts a history in the database.
 *
 * @param val The history object.
 */
export declare function set(val: ConnectionHistory): Promise<string>;
/**
 * Removes a history from the database.
 *
 * @param key The history's IP.
 */
export declare function remove(key: string): Promise<void>;
/**
 * Clears the IP database.
 */
export declare function clear(): Promise<void>;
/**
 * Get all keys on the database.
 */
export declare function keys(): Promise<string[]>;
