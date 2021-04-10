"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.admin = exports.chat = exports.direct = exports.announcement = exports.anonymous = void 0;
require("./types");
const color_1 = __importDefault(require("color"));
const Global_1 = require("./Global");
const template = "%c%s%c %c%s%c %c%s";
const tag = "display: inline-block;color: black; font-weight: bold; padding: 3px 7px 3px 7px; border-radius: 3px 3px 3px 3px;";
const announcementTag = formatTag(Global_1.Colors.Gold);
const privateTag = formatTag(Global_1.Colors.SkyBlue);
const chatTag = formatTag(Global_1.Colors.LightGreen);
const adminTag = formatTag(Global_1.Colors.Gold);
const timestampTag = formatTag(Global_1.Colors.LightGrey);
const announcementTagText = "📢";
const privateTagText = "📥 ";
/**
 * Converts Haxball's announcement types to CSS.
 */
var ChatStyleCSS;
(function (ChatStyleCSS) {
    ChatStyleCSS["Bold"] = "font-weight: bold;";
    ChatStyleCSS["Italic"] = "font-style: italic;";
    ChatStyleCSS["Small"] = "font-size: small;";
    ChatStyleCSS["SmallBold"] = "font-size: small; font-weight: bold;";
    ChatStyleCSS["SmallItalic"] = "font-size: small; font-style: italic;";
})(ChatStyleCSS || (ChatStyleCSS = {}));
/**
 * Formats a CSS tag with the specified color.
 *
 * @param color
 */
function formatTag(color) {
    return tag + `background-color: ${color_1.default(color).hex()};`;
}
/**
 * Gets a formatted timestamp of the current time.
 */
function timestamp() {
    return `${new Date(Date.now() - (new Date(Date.now()).getTimezoneOffset() * 60000)).toISOString().substr(11, 8)}`;
}
/**
 * Sends a custom log with CSS styling.
 *
 * @param options
 */
function customLog(options) {
    var _a, _b, _c, _d;
    let color;
    try {
        color = color_1.default(options.message.color);
        if (color.isLight())
            color = color.darken(0.4);
    }
    catch (e) {
        color = color_1.default();
    }
    const messageColor = options.message.color ? `color: ${color.hex()};` : "";
    let messageStyle = "";
    if (options.message.style === Global_1.ChatStyle.Bold)
        messageStyle = ChatStyleCSS.Bold;
    if (options.message.style === Global_1.ChatStyle.Italic)
        messageStyle = ChatStyleCSS.Italic;
    if (options.message.style === Global_1.ChatStyle.Small)
        messageStyle = ChatStyleCSS.Small;
    if (options.message.style === Global_1.ChatStyle.SmallBold)
        messageStyle = ChatStyleCSS.SmallBold;
    if (options.message.style === Global_1.ChatStyle.SmallItalic)
        messageStyle = ChatStyleCSS.SmallItalic;
    anonymous((_a = options.template) !== null && _a !== void 0 ? _a : template, (_b = options.timestampTag) !== null && _b !== void 0 ? _b : timestampTag, timestamp(), "", (_c = options.tag) !== null && _c !== void 0 ? _c : "", (_d = options.tagContent) !== null && _d !== void 0 ? _d : "", "", messageColor + messageStyle, options.message.message);
}
/**
 * Sends an anonymous, untraceable log.
 *
 * @param params
 */
function anonymous(...params) {
    setTimeout(console.log.bind(console, ...params));
}
exports.anonymous = anonymous;
/**
 * Logs a room announcement.
 *
 * @param message The message object.
 */
function announcement(message) {
    customLog({
        tag: announcementTag,
        tagContent: announcementTagText,
        message: message,
    });
}
exports.announcement = announcement;
/**
 * Logs a private message.
 *
 * @param message The message object.
 * @param player The player who received the message.
 */
function direct(message, player) {
    customLog({
        tag: privateTag,
        tagContent: privateTagText + (player === null || player === void 0 ? void 0 : player.tag),
        message: message
    });
}
exports.direct = direct;
/**
 * Logs a player chat message.
 *
 * @param message The message object.
 * @param player The player who sent the message.
 */
function chat(message, player) {
    customLog({
        tag: chatTag,
        tagContent: player === null || player === void 0 ? void 0 : player.tag,
        message: message
    });
}
exports.chat = chat;
/**
 * Logs an admin's chat message.
 *
 * @param message The message object.
 * @param player The player who sent the message.
 */
function admin(message, player) {
    customLog({
        tag: adminTag,
        tagContent: player === null || player === void 0 ? void 0 : player.tag,
        message: message
    });
}
exports.admin = admin;
/**
 * Logs a generic message.
 *
 * @param message The message object.
 */
function log(message) {
    customLog({
        message: message
    });
}
exports.log = log;
//# sourceMappingURL=Logger.js.map