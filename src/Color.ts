/**
 * A hexadecimal number or string.
 */
export type color = string | number;

/**
 * An RGB array.
 */
export type rgb = [number, number, number];

/**
 * Get RGB color array from a hexadecimal number or string
 */
export function getRGB(color: color): rgb {
    if (typeof color === "string") color = Number.parseInt(color.replace("#", ""));

    return [
        (color >> 16) & 0xFF,
        (color >> 8) & 0xFF,
        color & 0xFF
    ];
}

/**
 * Shades a color.
 * 
 * @example
 * // white to gray
 * shadeColor(0xFFFFFF, -30);
 */
export function shadeColor(color: color, percent: number): rgb {
    return getRGB(color).map(c => {
        const color = c * (100 + percent) / 100;
        return (color < 255) ? color : 255;
    }) as rgb;
}

/**
 * Whether a color is light.
 */
export function isLight(color: color): boolean {
    const rgb = getRGB(color);
    const yiq = ((rgb[0] * 299) + (rgb[1] * 587) + (rgb[2] * 114)) / 1000;

    return yiq >= 128;
}

/**
 * Parses a RGB array into a RGB string.
 */
export function getRGBString(rgb: rgb) {
    return "rgb(" + rgb.join() + ")";
}