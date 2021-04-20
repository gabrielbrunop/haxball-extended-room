"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRGBString = exports.isLight = exports.shadeColor = exports.getRGB = void 0;
/**
 * Get RGB color array from a hexadecimal number or string
 */
function getRGB(color) {
    if (typeof color === "string")
        color = Number.parseInt(color.replace("#", ""));
    return [
        (color >> 16) & 0xFF,
        (color >> 8) & 0xFF,
        color & 0xFF
    ];
}
exports.getRGB = getRGB;
/**
 * Shades a color.
 *
 * @example
 * // white to gray
 * shadeColor(0xFFFFFF, -30);
 */
function shadeColor(color, percent) {
    return getRGB(color).map(c => {
        const color = c * (100 + percent) / 100;
        return (color < 255) ? color : 255;
    });
}
exports.shadeColor = shadeColor;
/**
 * Whether a color is light.
 */
function isLight(color) {
    const rgb = getRGB(color);
    const yiq = ((rgb[0] * 299) + (rgb[1] * 587) + (rgb[2] * 114)) / 1000;
    return yiq >= 128;
}
exports.isLight = isLight;
/**
 * Parses a RGB array into a RGB string.
 */
function getRGBString(rgb) {
    return "rgb(" + rgb.join() + ")";
}
exports.getRGBString = getRGBString;
//# sourceMappingURL=Color.js.map