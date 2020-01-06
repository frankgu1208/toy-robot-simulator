import * as config from '../constant/config';
import { Position } from '../interface/position';

export default class Tabletop {
    public length: number;
    public width: number;
    public objects: Position[];

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
        this.objects = [];
    }

    /**
     * @deprecated Please use @see isAvailablePosition
     * Check the postion is on the table
     * @param position need to check if is on the table
     */
    public isOnTable = (position: Position): boolean => {
        return Number.isInteger(position.x) && Number.isInteger(position.y)
            && position.x >= 0 && position.x < this.length
            && position.y >= 0 && position.y < this.width;
    }

    /**
     * Check the robot position is avaliable
     * It will return false if it is outside of the table or meet the object
     * @param position need to check if is on the table
     */
    public isAvailablePosition = (position: Position): boolean => {
        const isOnTable = Number.isInteger(position.x) && Number.isInteger(position.y)
            && position.x >= 0 && position.x < this.length
            && position.y >= 0 && position.y < this.width;
        const meetObject = this.objects.some(
            object => object.x === position.x && object.y === position.y);
        return isOnTable && !meetObject;
    }

    /**
     * Add the object into @see this.objects
     * @param position the location specify for the object
     */
    public addObject = (position: Position): void => {
        if (this.isAvailablePosition(position)) {
            this.objects.push(position);
        }
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
