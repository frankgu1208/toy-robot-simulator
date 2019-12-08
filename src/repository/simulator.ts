import Action from './action';
import Robot from './robot';
import Tabletop from './tabletop';

export default class Simulator {
    public tabletop: Tabletop;
    public robot: Robot;
    public actions: Action[];

    /** @constructor for Simulator */
    public constructor() {
        this.tabletop = new Tabletop();
        this.robot = new Robot(this.tabletop);
        this.actions = [];
    }

    /**
     * Process will convert the input string to command action,
     * then let the robot perform the appropriate action.
     * All the actions will storn in @this actions for extension
     * @param input command string like 'PLACE 0,0,NORTH', 'RIGHT', 'REPORT', etc
     */
    public process = (input: string) => {
        const action = new Action(input);
        this.actions.push(action);
        this.robot.takeAction(action);
    }
}
