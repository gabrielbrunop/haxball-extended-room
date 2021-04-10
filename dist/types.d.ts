/**
 * A team's uniform colors.
 */
interface TeamColors {
    angle: number;
    textColor: number;
    colors: number[];
}
/**
 * A message announcement object.
 */
interface MessageObject {
    message: string;
    targetID?: number;
    color?: number | string;
    style?: ChatStyle;
    sound?: ChatSounds;
}
