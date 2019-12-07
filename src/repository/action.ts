import { Command } from '../constant/enums';
import { Position } from '../interface/position';

export default class Action {
    public type?: Command;
    public data?: Position;
    public input: string;

    constructor(input: string) {
        input = input;
    }
}
