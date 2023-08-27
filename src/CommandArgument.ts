/**
 * Useful regular expressions.
 */
export const parameterTypes = {
    number: /^\d+$/,
    yesno: /^(y(es)?|n(o)?)/i,
    nickname: /^(?=.{1,25}$).*/i,
    password: /^[a-zA-Z0-9_@.!*$?&%-]{1,16}$/i,
    extended: /^[a-zA-Z0-9\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]*$/i,
    specialExtended: /^[a-zA-Z0-9\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F_@.!*$?&%-]*$/i
}

export class CommandArgument {
    /**
     * The argument string.
     */
    private _value: string;
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
    constructor (argument: string) {
        this._value = argument;
        this.number = testNumber(argument);
        this.yesno = testYesNo(argument);
        this.password = testPassword(argument);
        this.extended = testExtended(argument);
        this.specialExtended = testSpecialExtended(argument);
    }

    /**
     * Parses the argument to a number.
     */
    toNumber(): number {
        return parseInt(this._value);
    }

    toString(): string {
        return this._value;
    }
}

/**
 * Tests whether it is a valid number.
 * 
 * @param argument A command argument.
 */
function testNumber(argument: string): boolean {
    return parameterTypes.number.test(argument);
}

/**
 * Tests whether it is a yes or a no.
 * 
 * @param argument A command argument.
 */
function testYesNo(argument: string): boolean {
    return parameterTypes.yesno.test(argument);
}

/**
 * Test whether it is a valid password according to our standards.
 * 
 * @param argument A command argument.
 */
function testPassword(argument: string): boolean {
    return parameterTypes.password.test(argument);
}

/**
 * Tests whether it is alphanumeric (with * and $ as exceptions).
 * 
 * @param argument A command argument.
 */
function testExtended(argument: string): boolean {
    return parameterTypes.extended.test(argument);
}

/**
 * Includes @.!?&%- to the extended test.
 * 
 * @param argument A command argument.
 */
function testSpecialExtended(argument: string): boolean {
    return parameterTypes.specialExtended.test(argument);
}