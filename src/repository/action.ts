import { Command, Direction } from '../constant/enums';
import { Position } from '../interface/position';

export default class Action {
    /**
     * Command like RIGHT, PLACE @see Command
     * Invalid command type should be null
     */
    public type?: Command;
    /**
     * Data for the command
     * data should only exist when type is PLACE
     */
    public data?: Position;

    /**
     * @constructor for the action
     * @param input input string like 'PLACE 0,0,NORTH', 'RIGHT', 'REPORT', etc
     */
    constructor(public input: string) {
        if (typeof input === 'string') {
            this.parseCommand(input);
        }
    }

    /**
     * Check the input is valid and parse the string to @see Command
     * @param input input string like 'PLACE 0,0,NORTH', 'RIGHT', 'REPORT', etc
     */
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

    /**
     * Convert a list of string into @see Position
     * @param positionData list position info need to parse
     * @param positionData[0] should be x value
     * @param positionData[1] should be y value
     * @param positionData[2] should be @see Direction
     */
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
