import "./types";
import { Role } from "./Role";
/** Class representing a list of roles. */
export declare class RoleList {
    adminRoles: Role[];
    playerRoles: Role[];
    constructor();
    get roles(): Role[];
    add(role: Role): this;
    remove(role: Role | string): void;
    get(role: Role | string): Role | undefined;
    has(role: Role | string): boolean;
}
