import { color } from "./Color";
import { Colors } from "./Global";
import { Settings } from "./Settings";

export const AdminRole = "admin";

/** Class representing a player role. */
export class Role {
    /**
     * The name of this role.
     */
    name: string;

    /**
     * Whether this role is an admin role or not.
     */
    admin: boolean = false;
    
    /**
     * The color of this role.
     * 
     * This setting serves only as useful information and does nothing by default.
     */
    color: color = Colors.White;

    /**
     * The prefix of this role in the chat.
     * 
     * This setting serves only as useful information and does nothing by default.
     */
    prefix: string = "";

    /**
     * If this is set true then this role will override all permission settings.
     */
    override: boolean = false;

    /**
     * The position of the role compared to other roles.
     */
    position: number = 0;

    /**
     * Custom settings for this role.
     */
    settings = new Settings();

    constructor(name?: string) {
        this.name = name ?? "";
    }

    setName(name: string): this {
        this.name = name;

        return this;
    }

    setAdmin(): this {
        this.admin = true;

        return this;
    }
    
    setColor(color: color): this {
        this.color = color;

        return this;
    }
    
    setPrefix(prefix: string): this {
        this.prefix = prefix;

        return this;
    }

    setOverride(): this {
        this.override = true;

        return this;
    }

    setPosition(position: number): this {
        this.position = position;

        return this;
    }
}