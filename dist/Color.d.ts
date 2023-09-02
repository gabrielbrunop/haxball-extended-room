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
export declare function getRGB(color: color): rgb;
/**
 * Shades a color.
 *
 * @example
 * // white to gray
 * shadeColor(0xFFFFFF, -30);
 */
export declare function shadeColor(color: color, percent: number): rgb;
/**
 * Whether a color is light.
 */
export declare function isLight(color: color): boolean;
/**
 * Parses a RGB array into a RGB string.
 */
export declare function getRGBString(rgb: rgb): string;
