import * as config from '../constant/config';
import { Position } from '../interface/position';

export default class Tabletop {
    public length: number;
    public width: number;

    public constructor(
        length: string | number = process.env.WIDTH,
        width: string | number = process.env.LENGTH,
    ) {
        this.length = this.getTableSize(length);
        this.width = this.getTableSize(width);
    }

    public isOnTable = (position: Position): boolean => {
        return Number.isInteger(position.x) && Number.isInteger(position.y)
            && position.x >= 0 && position.x < this.length
            && position.y >= 0 && position.y < this.width;
    }

    private getTableSize = (sizeString: number | string | undefined): number => {
        const size = +sizeString;
        return !!size && size > 0 && Number.isInteger(size)
            ? size
            : config.TABLETOP_DEAULT_SIZE;
    }
}
