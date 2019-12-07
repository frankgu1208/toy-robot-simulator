import { Position } from '../interface/position';
import Action from './action';
import Tabletop from './tabletop';

export default class Robot {
    public position?: Position;
    public tabletop: Tabletop;

    public constructor(tabletop: Tabletop = new Tabletop()) {
        tabletop = tabletop;
    }

    public takeAction = (action: Action): void => {
        action = action;
    }

    public placeRobot = (action: Action): void => {
        action = action;
    }

    public moveRobot = (action: Action): void => {
        action = action;
    }

    public turnLeft = (action: Action): void => {
        action = action;
    }

    public turnRight = (action: Action): void => {
        action = action;
    }

    public report = (action: Action): void => {
        action = action;
    }
}
