/**
 * Useful regular expressions.
 */
export declare const parameterTypes: {
    number: RegExp;
    yesno: RegExp;
    nickname: RegExp;
    password: RegExp;
    extended: RegExp;
    specialExtended: RegExp;
};
export declare class CommandArgument {
    /**
     * The argument string.
     */
    private readonly _value;
    /**
     * Whether it is a valid number.
     */
    number: boolean;
    /**
     * Whether it is yes or no.
     */
    yesno: boolean;
    /**
     * Whether it is a valid password string according to our standards.
     */
    password: boolean;
    /**
     * Whether it is alphanumeric (with * and $ as exceptions).
     */
    extended: boolean;
    /**
     * Includes @.!?&%- to the extended option.
     */
    specialExtended: boolean;
    /**
     * Creates a command argument object.
     *
     * @param argument The command argument.
     */
    constructor(argument: string);
    /**
     * Parses the argument to a number.
     */
    toNumber(): number;
    toString(): string;
}
