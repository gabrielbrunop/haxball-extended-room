"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.keys = exports.clear = exports.remove = exports.set = exports.get = void 0;
const idb_1 = require("idb");
/**
 * The IP's histories object storage.
 */
const connStorage = "connections";
/**
 * The database's name.
 */
const databaseName = "haxball-extended-room";
/**
 * The database.
 */
const db = idb_1.openDB(databaseName, 1, {
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
function get(key) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield db).get(connStorage, key);
    });
}
exports.get = get;
/**
 * Inserts a history in the database.
 *
 * @param val The history object.
 */
function set(val) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield db).put(connStorage, val);
    });
}
exports.set = set;
/**
 * Removes a history from the database.
 *
 * @param key The history's IP.
 */
function remove(key) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield db).delete(connStorage, key);
    });
}
exports.remove = remove;
/**
 * Clears the IP database.
 */
function clear() {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield db).clear(connStorage);
    });
}
exports.clear = clear;
/**
 * Get all keys on the database.
 */
function keys() {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield db).getAllKeys(connStorage);
    });
}
exports.keys = keys;
//# sourceMappingURL=ConnectionHistory.js.map