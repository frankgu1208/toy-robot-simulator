import { DIRECTION_ORDER } from '../constant/config';
import { Command, Direction } from '../constant/enums';
import { Position } from '../interface/position';
import Action from './action';
import Tabletop from './tabletop';

export default class RobotRepo {
    public position?: Position;

    public constructor(public tabletop: Tabletop = new Tabletop()) { }

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
            default:
                return undefined;
        }
    }

    public placeRobot = (action: Action): void => {
        if (action.type === Command.PLACE && action.data
            && this.tabletop.isOnTable(action.data)) {
            this.position = action.data;
        }
    }

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
            if (this.tabletop.isOnTable(nextPosition)) {
                this.position = nextPosition;
            }
        }
    }

    public turnLeft = (action: Action): void => {
        if (action.type === Command.LEFT) {
            this.rotate(-1);
        }
    }

    public turnRight = (action: Action): void => {
        if (action.type === Command.RIGHT) {
            this.rotate(1);
        }
    }

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
