import * as config from '../constant/config';
import { Position } from '../interface/position';

export default class Tabletop {
    public length: number;
    public width: number;

    /**
     * @constructor Set the length and width of the table
     * @param length length of the table, corresponding to x
     * @param width width of the table, corresponding to y
     */
    public constructor(
        length: string | number = process.env.WIDTH,
        width: string | number = process.env.LENGTH,
    ) {
        this.length = this.getTableSize(length);
        this.width = this.getTableSize(width);
    }

    /**
     * Check the postion is on the table
     * @param position need to check if is on the table
     */
    public isOnTable = (position: Position): boolean => {
        return Number.isInteger(position.x) && Number.isInteger(position.y)
            && position.x >= 0 && position.x < this.length
            && position.y >= 0 && position.y < this.width;
    }

    /**
     * Convert string of the WIDTH/LENGTH in environment variable to number
     * If the value is invalid, it will use the default tabletop size value
     * @param input string value need to convert to number
     */
    private getTableSize = (input: number | string | undefined): number => {
        const size = +input;
        return !!size && size > 0 && Number.isInteger(size)
            ? size
            : config.TABLETOP_DEAULT_SIZE;
    }
}
