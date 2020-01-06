import { DIRECTION_ORDER } from '../constant/config';
import { Command, Direction } from '../constant/enums';
import { Position } from '../interface/position';
import Action from './action';
import Tabletop from './tabletop';

export default class Robot {
    /**
     * Position detail of the robot @see Position
     * Position should be undefined until a valid PLACE command
     */
    public position?: Position;

    /** @constructor for Robot and set the tabletop */
    public constructor(public tabletop: Tabletop = new Tabletop()) { }

    /**
     * Robot take action
     * @param action check the action type to perform the appropriate action
     * action type should be PLACE, MOVE, RIGHT, LEFT, REPORT.
     * Invalid action type should be undefined
     */
    public takeAction = (action: Action): void => {
        switch (action.type) {
            case Command.PLACE:
                return this.placeRobot(action);
            case Command.MOVE:
                return this.moveRobot(action);
            case Command.RIGHT:
                return this.turnRight(action);
            case Command.LEFT:
                return this.turnLeft(action);
            case Command.REPORT:
                return this.report(action);
            case Command.PLACE_OBJECT:
                return this.placeObject(action);
            default:
                return undefined;
        }
    }

    /**
     * PLACE process for the robot
     * @this position will set if the action data is on the tabletop
     * @param action action.type should be PLACE
     */
    public placeRobot = (action: Action): void => {
        if (action.type === Command.PLACE && action.data
            && this.tabletop.isAvailablePosition(action.data)) {
            this.position = action.data;
        }
    }

    /**
     * MOVE process for the robot
     * If the next position is outside the table or meet the object, robot won't move
     * @param action type should be MOVE
     */
    public moveRobot = (action: Action): void => {
        if (this.position && action.type === Command.MOVE) {
            const {
                x: roboX,
                y: roboY,
                direct,
            } = this.position;
            const nextPosition = {
                ...this.position,
                x: direct === Direction.EAST ? roboX + 1
                    : (direct === Direction.WEST ? roboX - 1 : roboX),
                y: direct === Direction.NORTH ? roboY + 1
                    : (direct === Direction.SOUTH ? roboY - 1 : roboY),
            } as Position;
            if (this.tabletop.isAvailablePosition(nextPosition)) {
                this.position = nextPosition;
            }
        }
    }

    /**
     * LEFT process for the robot @see @this rotate
     * @param action type should be LEFT
     */
    public turnLeft = (action: Action): void => {
        if (action.type === Command.LEFT) {
            this.rotate(-1);
        }
    }

    /**
     * RIGHT process for the robot @see @this rotate
     * @param action type should be RIGHT
     */
    public turnRight = (action: Action): void => {
        if (action.type === Command.RIGHT) {
            this.rotate(1);
        }
    }

    /**
     * REPORT process for the robot
     * @param action type should be REPORT
     */
    public report = (action: Action): void => {
        if (action.type === Command.REPORT) {
            if (this.position) {
                const { x, y, direct } = this.position;
                console.log(`${x},${y},${direct}`);
            } else {
                console.log('Robot is not on the table.');
            }
        }
    }

    /**
     * PLACE_OBJECT process for the robot
     * @param action type should be PLACE_OBJECT
     */
    public placeObject = (action: Action): void => {
        if (action.type === Command.PLACE_OBJECT && !!this.position) {
            const {
                x: roboX,
                y: roboY,
                direct,
            } = this.position;
            const nextPosition = {
                x: direct === Direction.EAST ? roboX + 1
                    : (direct === Direction.WEST ? roboX - 1 : roboX),
                y: direct === Direction.NORTH ? roboY + 1
                    : (direct === Direction.SOUTH ? roboY - 1 : roboY),
            } as Position;
            this.tabletop.addObject(nextPosition);
        }
    }

    /**
     * Rotate the robot
     * @param times Represents how many times of 90-degrees to turn
     * times should be 1 if robot need to turn RIGHT (90 degree)
     * times should be -1 if robot need to turn LEFT (-90 degree)
     */
    private rotate = (times: number): void => {
        if (this.position && DIRECTION_ORDER.indexOf(this.position.direct) >= 0) {
            const nextIndex = ((DIRECTION_ORDER.indexOf(this.position.direct) + times)
                % DIRECTION_ORDER.length + DIRECTION_ORDER.length) % DIRECTION_ORDER.length;
            const nextDirect = DIRECTION_ORDER[nextIndex];
            if (nextDirect) {
                this.position = {
                    ...this.position,
                    direct: nextDirect,
                };
            }
        }
    }
}
