import Action from './action';
import Robot from './robot';
import Tabletop from './tabletop';

export default class Simulator {
    public tabletop: Tabletop;
    public robot: Robot;
    public actions: Action[];

    public constructor() {
        this.tabletop = new Tabletop();
        this.robot = new Robot(this.tabletop);
        this.actions = [];
    }

    public process = (input: string) => {
        const action = new Action(input);
        this.actions.push(action);
        this.robot.takeAction(action);
    }
}
