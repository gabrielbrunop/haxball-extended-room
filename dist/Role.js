"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.AdminRole = void 0;
const Global_1 = require("./Global");
const Settings_1 = require("./Settings");
exports.AdminRole = "admin";
/** Class representing a player role. */
class Role {
    constructor(name) {
        /**
         * Whether this role is an admin role or not.
         */
        this.admin = false;
        /**
         * The color of this role.
         *
         * This setting serves only as useful information and does nothing by default.
         */
        this.color = Global_1.Colors.White;
        /**
         * The prefix of this role in the chat.
         *
         * This setting serves only as useful information and does nothing by default.
         */
        this.prefix = "";
        /**
         * If this is set true then this role will override all permission settings.
         */
        this.override = false;
        /**
         * The position of the role compared to other roles.
         */
        this.position = 0;
        /**
         * Custom settings for this role.
         */
        this.settings = new Settings_1.Settings();
        this.name = name !== null && name !== void 0 ? name : "";
    }
    setName(name) {
        this.name = name;
        return this;
    }
    setAdmin() {
        this.admin = true;
        return this;
    }
    setColor(color) {
        this.color = color;
        return this;
    }
    setPrefix(prefix) {
        this.prefix = prefix;
        return this;
    }
    setOverride() {
        this.override = true;
        return this;
    }
    setPosition(position) {
        this.position = position;
        return this;
    }
}
exports.Role = Role;
//# sourceMappingURL=Role.js.map