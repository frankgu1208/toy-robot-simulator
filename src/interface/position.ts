import { Direction } from '../constant/enums';

/**
 * This is the position on the table
 */
export interface Position {
    /** Table x-axis corresponding to length */
    x: number;
    /** Table y-axis corresponding to width */
    y: number;
    /** Faction direction on the table */
    direct: Direction;
}
