import { color } from "./Color";
import { Settings } from "./Settings";
export declare const AdminRole = "admin";
/** Class representing a player role. */
export declare class Role {
    /**
     * The name of this role.
     */
    name: string;
    /**
     * Whether this role is an admin role or not.
     */
    admin: boolean;
    /**
     * The color of this role.
     *
     * This setting serves only as useful information and does nothing by default.
     */
    color: color;
    /**
     * The prefix of this role in the chat.
     *
     * This setting serves only as useful information and does nothing by default.
     */
    prefix: string;
    /**
     * If this is set true then this role will override all permission settings.
     */
    override: boolean;
    /**
     * The position of the role compared to other roles.
     */
    position: number;
    /**
     * Custom settings for this role.
     */
    settings: Settings;
    constructor(name?: string);
    setName(name: string): this;
    setAdmin(): this;
    setColor(color: color): this;
    setPrefix(prefix: string): this;
    setOverride(): this;
    setPosition(position: number): this;
}
