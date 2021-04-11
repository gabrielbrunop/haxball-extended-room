import { openDB, DBSchema } from 'idb';
import { PlayerGeoLocation } from '.';

/**
 * The IP's histories object storage.
 */
const connStorage = "connections";
/**
 * The database's name.
 */
const databaseName = "haxball-extended-room";

/**
 * An IP's connection history object.
 */
export interface ConnectionHistory {
    ip: string,
    geo: PlayerGeoLocation,
    players: PlayerHistory[]
}

/**
 * Player's basic information for caching and room history.
 */
export interface PlayerHistory {
    /**
     * The player's ID.
     */
    id: number,
    /**
     * The player's name.
     */
    name: string,
    /**
     * The player's public ID.
     */
    auth?: string,
    /**
     * The time the player joined the room.
     */
    joinedAt: Date
}

/**
 * Database's schema.
 */
interface RoomDB extends DBSchema {
    connections: {
        key: string,
        value: ConnectionHistory
    }
}

/**
 * The database.
 */
const db = openDB<RoomDB>(databaseName, 1, {
    upgrade(db) {
        db.createObjectStore(connStorage, {
            keyPath: "ip"
        });
    }
});

/**
 * Gets an IP's history on the room.
 * 
 * @param key The IP.
 */
export async function get(key: string): Promise<ConnectionHistory | undefined> {
    return (await db).get(connStorage, key);
}

/**
 * Inserts a history in the database.
 * 
 * @param val The history object.
 */
export async function set(val: ConnectionHistory): Promise<string> {
    return (await db).put(connStorage, val);
}

/**
 * Removes a history from the database.
 * 
 * @param key The history's IP.
 */
export async function remove(key: string): Promise<void> {
    return (await db).delete(connStorage, key);
}

/**
 * Clears the IP database.
 */
export async function clear(): Promise<void> {
    return (await db).clear(connStorage);
}

/**
 * Get all keys on the database.
 */
export async function keys(): Promise<string[]> {
    return (await db).getAllKeys(connStorage);
}