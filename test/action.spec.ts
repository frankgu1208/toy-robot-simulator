import { expect } from 'chai';
import { Command, Direction } from '../src/constant/enums';
import { Position } from '../src/interface/position';
import Action from '../src/repository/action';

describe('Action Repository', () => {
    it('Should able to create action from input string', () => {
        const inputs = [
            '',
            'test123',
            'north',
            'RIGHT',
            'LEFT',
        ];
        inputs.map(input => {
            const action = new Action(input);
            expect(action).to.be.an('object');
            expect(action.input).to.equal(input);
        });
    });

    it('Action type data should be undefined when have invalid PLACE input', () => {
        const inputs = [
            'place',
            'PLACE',
            'PLACE 1,2,3,4,north',
            'PLACE x,2,NORTH',
            'PLACE 1,y,NORTH',
            'PLACE 1.1,1.1,NORTH',
            'PLACE -1,-1,NORTH',
        ];
        inputs.map(input => {
            const action = new Action(input);
            expect(action).to.be.an('object');
            expect(action.type).to.be.an('undefined');
            expect(action.data).to.be.an('undefined');
        });
    });

    it('Action type data should be undefined when have invalid input', () => {
        const inputs = [
            '',
            ' ',
            'test123',
            'PLACE x,2,NORTH',
            'PLACE 1,y,NORTH',
            'PLACE 1.1,1.1,NORTH',
            'PLACE -1,-1,NORTH',
            'PLACE 1,1,null',
        ];
        inputs.map(input => {
            const action = new Action(input);
            expect(action).to.be.an('object');
            expect(action.type).to.be.an('undefined');
            expect(action.data).to.be.an('undefined');
        });
    });

    it('Able to convert valid PLACE command', () => {
        const inputs = [
            'PLACE 1,2,NORTH',
            'place 1,2,north',
            '  place  1, 2, north  ',
        ];
        inputs.map(input => {
            const action = new Action(input);
            expect(action).to.be.an('object');
            expect(action.type).to.equal(Command.PLACE);
            expect(action.data).to.deep.equal({
                direct: Direction.NORTH,
                x: 1,
                y: 2,
            } as Position);
        });
    });

    it('Able to convert valid MOVE command', () => {
        const inputs = [
            'move',
            'MOVE',
            '  MOVE  ',
        ];
        inputs.map(input => {
            const action = new Action(input);
            expect(action).to.be.an('object');
            expect(action.type).to.equal(Command.MOVE);
            expect(action.data).to.be.an('undefined');
        });
    });

    it('Able to convert valid LEFT command', () => {
        const inputs = [
            'LEFT',
            'left',
            '  LEFT  ',
        ];
        inputs.map(input => {
            const action = new Action(input);
            expect(action).to.be.an('object');
            expect(action.type).to.equal(Command.LEFT);
            expect(action.data).to.be.an('undefined');
        });
    });

    it('Able to convert valid RIGHT command', () => {
        const inputs = [
            'RIGHT',
            'right',
            '  RIGHT  ',
        ];
        inputs.map(input => {
            const action = new Action(input);
            expect(action).to.be.an('object');
            expect(action.type).to.equal(Command.RIGHT);
            expect(action.data).to.be.an('undefined');
        });
    });

    it('Able to convert valid REPORT command', () => {
        const inputs = [
            'REPORT',
            'report',
            '  REPORT  ',
        ];
        inputs.map(input => {
            const action = new Action(input);
            expect(action).to.be.an('object');
            expect(action.type).to.equal(Command.REPORT);
            expect(action.data).to.be.an('undefined');
        });
    });

    it('Able to convert valid PLACE_OBJECT command', () => {
        const inputs = [
            'PLACE_OBJECT',
            'place_object',
            '  PLACE_OBJECT  ',
        ];
        inputs.map(input => {
            const action = new Action(input);
            expect(action).to.be.an('object');
            expect(action.type).to.equal(Command.PLACE_OBJECT);
            expect(action.data).to.be.an('undefined');
        });
    });
});
