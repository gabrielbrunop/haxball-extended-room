import { Room } from "./Room";
export declare class Pause {
    private _room;
    private callback?;
    private _destroyed;
    unpause(runCallback?: boolean, time?: number): boolean;
    constructor(_room: Room, callback?: ((willGameUnpause: boolean) => void) | undefined, waitTime?: number);
}
