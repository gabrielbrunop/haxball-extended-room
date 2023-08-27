"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandArgument = exports.parameterTypes = void 0;
/**
 * Useful regular expressions.
 */
exports.parameterTypes = {
    number: /^\d+$/,
    yesno: /^(y(es)?|n(o)?)/i,
    nickname: /^(?=.{1,25}$).*/i,
    password: /^[a-zA-Z0-9_@.!*$?&%-]{1,16}$/i,
    extended: /^[a-zA-Z0-9\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]*$/i,
    specialExtended: /^[a-zA-Z0-9\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F_@.!*$?&%-]*$/i
};
class CommandArgument {
    /**
     * Creates a command argument object.
     *
     * @param argument The command argument.
     */
    constructor(argument) {
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
    toNumber() {
        return parseInt(this._value);
    }
    toString() {
        return this._value;
    }
}
exports.CommandArgument = CommandArgument;
/**
 * Tests whether it is a valid number.
 *
 * @param argument A command argument.
 */
function testNumber(argument) {
    return exports.parameterTypes.number.test(argument);
}
/**
 * Tests whether it is a yes or a no.
 *
 * @param argument A command argument.
 */
function testYesNo(argument) {
    return exports.parameterTypes.yesno.test(argument);
}
/**
 * Test whether it is a valid password according to our standards.
 *
 * @param argument A command argument.
 */
function testPassword(argument) {
    return exports.parameterTypes.password.test(argument);
}
/**
 * Tests whether it is alphanumeric (with * and $ as exceptions).
 *
 * @param argument A command argument.
 */
function testExtended(argument) {
    return exports.parameterTypes.extended.test(argument);
}
/**
 * Includes @.!?&%- to the extended test.
 *
 * @param argument A command argument.
 */
function testSpecialExtended(argument) {
    return exports.parameterTypes.specialExtended.test(argument);
}
//# sourceMappingURL=CommandArgument.js.map