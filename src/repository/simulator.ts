import Action from './action';
import Robot from './robot';
import Tabletop from './tabletop';

export default class Simulator {
    public tabletop: Tabletop;
    public robot: Robot;
    public actions: Action[];

    public process = (input: string) => {
        input = input;
    }
}
