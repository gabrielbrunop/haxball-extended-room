"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleList = void 0;
require("./types");
/** Class representing a list of roles. */
class RoleList {
    constructor() {
        this.adminRoles = [];
        this.playerRoles = [];
    }
    get roles() {
        return [...this.adminRoles, ...this.playerRoles];
    }
    add(role) {
        if (role.admin) {
            this.adminRoles.push(role);
        }
        else {
            this.playerRoles.push(role);
        }
        return this;
    }
    remove(role) {
        const roleName = typeof role === "string" ? role : role.name;
        this.adminRoles = this.adminRoles.filter(r => r.name !== roleName);
        this.playerRoles = this.playerRoles.filter(r => r.name !== roleName);
    }
    get(role) {
        const roleName = typeof role === "string" ? role : role.name;
        return this.roles.find(r => r.name === roleName);
    }
    has(role) {
        const roleName = typeof role === "string" ? role : role.name;
        return !!this.roles.find(r => r.name === roleName);
    }
}
exports.RoleList = RoleList;
//# sourceMappingURL=RoleList.js.map