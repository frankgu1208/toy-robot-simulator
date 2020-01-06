import { expect } from 'chai';
import { Direction } from '../src/constant/enums';
import { Position } from '../src/interface/position';
import Action from '../src/repository/action';
import Robot from '../src/repository/robot';
import Tabletop from '../src/repository/tabletop';

describe('Robot Repository', () => {
    it('Should be able to create robot instance', () => {
        const robot = new Robot();
        expect(robot).to.be.an('object');
        expect(robot.tabletop).to.be.an('object');
    });

    it('Robot position should be undefined by default', () => {
        const robot = new Robot();
        expect(robot.position).to.be.an('undefined');
    });

    it('Robot position should be undefined until a valid action', () => {
        const robot = new Robot();
        const actions = [
            new Action('test1'),
            new Action('RIGHT'),
            new Action('LEFT'),
            new Action('MOVE'),
            new Action('REPORT'),
            new Action('PLACE TEST1'),
            new Action('PLACE x,y,f'),
            new Action('PLACE 1,2,f'),
        ] as Action[];
        actions.map(a => {
            robot.takeAction(a);
            expect(robot.position).to.be.an('undefined');
        });

        robot.takeAction(new Action('PLACE 1,2,NORTH'));
        expect(robot.position).to.be.an('object');
        expect(robot.position).to.deep.equal({
            direct: Direction.NORTH,
            x: 1,
            y: 2,
        } as Position);
    });

    it('Robot should be able to replace', () => {
        const robot = new Robot();
        robot.takeAction(new Action('PLACE 1,2,NORTH'));
        expect(robot.position).to.deep.equal({
            direct: Direction.NORTH,
            x: 1,
            y: 2,
        } as Position);
        robot.takeAction(new Action('PLACE 3,4,NORTH'));
        expect(robot.position).to.deep.equal({
            direct: Direction.NORTH,
            x: 3,
            y: 4,
        } as Position);
    });

    it('Robot should able to move on map', () => {
        const robot = new Robot(new Tabletop(2, 2));
        const actions = [
            'PLACE 0,0,NORTH',
            'MOVE',
            'MOVE',
        ];
        actions.map(a => robot.takeAction(new Action(a)));
        expect(robot.position).to.deep.equal({
            direct: Direction.NORTH,
            x: 0,
            y: 1,
        } as Position);
    });

    it('Robot should not move outside of the map', () => {
        const robot = new Robot();
        const actions = [
            'PLACE 0,0,SOUTH',
            'MOVE',
        ];
        actions.map(a => robot.takeAction(new Action(a)));
        expect(robot.position).to.deep.equal({
            direct: Direction.SOUTH,
            x: 0,
            y: 0,
        } as Position);
    });

    it('Robot should able to turn right', () => {
        const robot = new Robot();
        const actions = [
            'PLACE 0,0,SOUTH',
            'RIGHT',
            'RIGHT',
            'RIGHT',
            'RIGHT',
            'RIGHT',
        ];
        actions.map(a => robot.takeAction(new Action(a)));
        expect(robot.position).to.deep.equal({
            direct: Direction.WEST,
            x: 0,
            y: 0,
        } as Position);
    });

    it('Robot should able to turn left', () => {
        const robot = new Robot();
        const actions = [
            'PLACE 0,0,SOUTH',
            'LEFT',
            'LEFT',
            'LEFT',
            'LEFT',
            'LEFT',
        ];
        actions.map(a => robot.takeAction(new Action(a)));
        expect(robot.position).to.deep.equal({
            direct: Direction.EAST,
            x: 0,
            y: 0,
        } as Position);
    });

    it('Robot should able process a list of actions', () => {
        const robot = new Robot(new Tabletop(2, 2));
        const actions = [
            'PLACE 0,0,SOUTH', 'MOVE', 'REPORT',
            'LEFT', 'MOVE', 'MOVE',
            'LEFT', 'MOVE', 'MOVE',
            'RIGHT', 'RIGHT', 'MOVE', 'MOVE',
            'RIGHT', 'MOVE', 'REPORT',
        ];
        const result = [
            { x: 0, y: 0, direct: Direction.SOUTH },
            { x: 0, y: 0, direct: Direction.SOUTH },
            { x: 0, y: 0, direct: Direction.SOUTH },

            { x: 0, y: 0, direct: Direction.EAST },
            { x: 1, y: 0, direct: Direction.EAST },
            { x: 1, y: 0, direct: Direction.EAST },

            { x: 1, y: 0, direct: Direction.NORTH },
            { x: 1, y: 1, direct: Direction.NORTH },
            { x: 1, y: 1, direct: Direction.NORTH },

            { x: 1, y: 1, direct: Direction.EAST },
            { x: 1, y: 1, direct: Direction.SOUTH },
            { x: 1, y: 0, direct: Direction.SOUTH },
            { x: 1, y: 0, direct: Direction.SOUTH },

            { x: 1, y: 0, direct: Direction.WEST },
            { x: 0, y: 0, direct: Direction.WEST },
            { x: 0, y: 0, direct: Direction.WEST },
        ] as Position[];
        actions.map((input, index) => {
            robot.takeAction(new Action(input));
            expect(robot.position).to.deep.equal(result[index]);
        });
    });

    it('Robot should able to place object on the table top', () => {
        const tabletop = new Tabletop();
        const robot = new Robot(tabletop);
        const actions = [
            'PLACE 0,0,NORTH',
            'PLACE_OBJECT',
        ];
        actions.map(a => robot.takeAction(new Action(a)));
        expect(tabletop.objects.length).to.deep.equal(1);
    });

    it('Robot should able process a list of actions with PLACE_OBJECT', () => {
        const tabletop = new Tabletop(2, 2);
        const robot = new Robot(tabletop);
        const actions = [
            'PLACE 0,0,SOUTH', 'MOVE', 'REPORT',
            'LEFT', 'MOVE', 'MOVE',
            'LEFT', 'PLACE_OBJECT', 'MOVE',
            'LEFT', 'PLACE_OBJECT', 'MOVE',
            'PLACE_OBJECT', 'REPORT',
        ];
        const result = [
            { x: 0, y: 0, direct: Direction.SOUTH },
            { x: 0, y: 0, direct: Direction.SOUTH },
            { x: 0, y: 0, direct: Direction.SOUTH },

            { x: 0, y: 0, direct: Direction.EAST },
            { x: 1, y: 0, direct: Direction.EAST },
            { x: 1, y: 0, direct: Direction.EAST },

            { x: 1, y: 0, direct: Direction.NORTH },
            { x: 1, y: 0, direct: Direction.NORTH },
            { x: 1, y: 0, direct: Direction.NORTH },

            { x: 1, y: 0, direct: Direction.WEST },
            { x: 1, y: 0, direct: Direction.WEST },
            { x: 1, y: 0, direct: Direction.WEST },

            { x: 1, y: 0, direct: Direction.WEST },
            { x: 1, y: 0, direct: Direction.WEST },
        ] as Position[];
        actions.map((input, index) => {
            robot.takeAction(new Action(input));
            expect(robot.position).to.deep.equal(result[index]);
        });
        expect(tabletop.objects.length).to.equal(2);
    });
});
