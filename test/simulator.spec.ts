import { expect } from 'chai';
import Simulator from '../src/repository/simulator';

describe('Simulator Repository', () => {
    it('Should have map and robot instand', () => {
        const simulator = new Simulator();
        // tslint:disable: no-unused-expression
        expect(simulator.tabletop).to.exist;
        expect(simulator.robot).to.exist;
        expect(simulator.actions).to.be.an('array').that.is.empty;
        // tslint:enable
    });

    it('Should able to run string process', () => {
        const stringInputs = [
            'testInput1',
            'testInput2',
            'testInput3',
            'testInput4',
        ] as string[];
        const simulator = new Simulator();
        stringInputs.map(s => simulator.process(s));
        expect(simulator.actions).to.have.lengthOf(4);
    });
});
