import { Command, Direction } from '../constant/enums';
import { Position } from '../interface/position';

export default class Action {
    public type?: Command;
    public data?: Position;

    constructor(public input: string) {
        if (typeof input === 'string') {
            this.parseCommand(input);
        }
    }

    private parseCommand = (input: string): void => {
        const segment = input.trim().toUpperCase().split((/[ ,]+/));
        const command: Command | undefined = (Command as any)[segment[0]];
        if (!command) {
            return undefined;
        }

        if (command === Command.PLACE && segment.length === 4) {
            const position = this.parsePosition(segment.slice(1));
            if (position) {
                this.type = command;
                this.data = position;
            }
        }

        if (command !== Command.PLACE && segment.length === 1) {
            this.type = command;
        }
    }

    private parsePosition = (positionData: string[]): Position | undefined => {
        const xVal = +positionData[0];
        const yVal = +positionData[1];
        const direction = Direction[positionData[2]];

        return Number.isInteger(xVal) && xVal >= 0
            && Number.isInteger(yVal) && yVal >= 0 && direction
            ? {
                direct: direction,
                x: xVal,
                y: yVal,
            } as Position
            : undefined;
    }
}
