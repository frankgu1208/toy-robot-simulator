import { Position } from '../interface/position';

export default class Tabletop {
    public length: number;
    public width: number;

    public constructor(
        length: string | number = process.env.WIDTH,
        width: string | number = process.env.LENGTH,
    ) {
        length = length;
        width = width;
    }

    public isOnTable = (position: Position): boolean => {
        position = position;
        return undefined;
    }
}
