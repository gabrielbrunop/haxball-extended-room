import "./types";
import { Player } from "./Player";
import * as Color from "./Color";
import { ChatStyle, Colors } from "./Global";

const template = "%c%s%c %c%s%c %c%s";
const tag = "display: inline-block;color: black; font-weight: bold; padding: 3px 7px 3px 7px; border-radius: 3px 3px 3px 3px;";

const announcementTag = formatTag(Colors.Gold);
const privateTag = formatTag(Colors.SkyBlue);
const chatTag = formatTag(Colors.LightGreen);
const adminTag = formatTag(Colors.Gold);
const timestampTag = formatTag(Colors.LightGrey);

const announcementTagText = "📢";
const privateTagText = "📥 ";

/**
 * Converts Haxball's announcement types to CSS.
 */
enum ChatStyleCSS {
    Bold = "font-weight: bold;",
    Italic = "font-style: italic;",
    Small = "font-size: small;",
    SmallBold = "font-size: small; font-weight: bold;",
    SmallItalic = "font-size: small; font-style: italic;"
}

/**
 * CSS-stylized log options.
 */
export interface LoggerStyle {
    template?: string,
    timestampTag?: string,
    tag?: string,
    tagContent?: string,
    message: MessageObject
}

/**
 * Formats a CSS tag with the specified color.
 * 
 * @param color 
 */
function formatTag(color: Color.color): string {
    return tag + `background-color: ${Color.getRGBString(Color.getRGB(color))};`;
}

/**
 * Gets a formatted timestamp of the current time.
 */
function timestamp(): string {
    return `${new Date(Date.now() - (new Date(Date.now()).getTimezoneOffset() * 60000)).toISOString().substr(11, 8)}`;
}

/**
 * Sends a custom log with CSS styling.
 * 
 * @param options 
 */
function customLog(options: LoggerStyle): void {
    let color = options.message.color ?? Colors.Black;

    const messageColor = Color.isLight(color) ? Color.getRGBString(Color.shadeColor(color, -40)) : Color.getRGBString(Color.getRGB(color));

    let messageStyle = "";

    if (options.message.style === ChatStyle.Bold) messageStyle = ChatStyleCSS.Bold;
    if (options.message.style === ChatStyle.Italic) messageStyle = ChatStyleCSS.Italic;
    if (options.message.style === ChatStyle.Small) messageStyle = ChatStyleCSS.Small;
    if (options.message.style === ChatStyle.SmallBold) messageStyle = ChatStyleCSS.SmallBold;
    if (options.message.style === ChatStyle.SmallItalic) messageStyle = ChatStyleCSS.SmallItalic;

    anonymous( 
        options.template ?? template,
        options.timestampTag ?? timestampTag,
        timestamp(),
        "",
        options.tag ?? "",
        options.tagContent ?? "",
        "",
        messageColor + messageStyle,
        options.message.message
    );
}

/**
 * Sends an anonymous, untraceable log.
 * 
 * @param params 
 */
export function anonymous(...params: any[]): void {
    setTimeout(console.log.bind(console, ...params));
}

/**
 * Logs a room announcement.
 * 
 * @param message The message object.
 */
export function announcement(message: MessageObject): void {
    customLog({
        tag: announcementTag,
        tagContent: announcementTagText,
        message: message,
    });
}

/**
 * Logs a private message.
 * 
 * @param message The message object.
 * @param player The player who received the message.
 */
export function direct(message: MessageObject, player: Player): void {
    customLog({
        tag: privateTag,
        tagContent: privateTagText + player?.tag,
        message: message
    });
}

/**
 * Logs a player chat message.
 * 
 * @param message The message object.
 * @param player The player who sent the message.
 */
export function chat(message: MessageObject, player: Player): void {
    customLog({
        tag: chatTag,
        tagContent: player?.tag,
        message: message
    });
}

/**
 * Logs an admin's chat message.
 * 
 * @param message The message object.
 * @param player The player who sent the message.
 */
export function admin(message: MessageObject, player: Player): void {
    customLog({
        tag: adminTag,
        tagContent: player?.tag,
        message: message
    });
}

/**
 * Logs a generic message.
 * 
 * @param message The message object.
 */
export function log(message: MessageObject): void {
    customLog({
        message: message
    });
}