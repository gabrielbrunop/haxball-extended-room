import "./types";
import { Role } from "./Role";

/** Class representing a list of roles. */
export class RoleList {
    adminRoles: Role[] = [];
    playerRoles: Role[] = [];

    constructor() {}

    get roles(): Role[] {
        return [...this.adminRoles, ...this.playerRoles];
    }

    add(role: Role): this {
        if (role.admin) {
            this.adminRoles.push(role);
        } else {
            this.playerRoles.push(role);
        }

        return this;
    }

    remove(role: Role | string) {
        const roleName = typeof role === "string" ? role : role.name;

        this.adminRoles = this.adminRoles.filter(r => r.name !== roleName);
        this.playerRoles = this.playerRoles.filter(r => r.name !== roleName);
    }

    get(role: Role | string) {
        const roleName = typeof role === "string" ? role : role.name;

        return this.roles.find(r => r.name === roleName);
    }

    has(role: Role | string) {
        const roleName = typeof role === "string" ? role : role.name;

        if (this.roles.find(r => r.name === roleName)) return true;

        return false;
    }
}