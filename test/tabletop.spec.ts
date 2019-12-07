import { expect } from 'chai';
import { TABLETOP_DEAULT_SIZE } from '../src/constant/config';
import { Direction } from '../src/constant/enums';
import { Position } from '../src/interface/position';
import Tabletop from '../src/repository/tabletop';

describe('Tabletop Repository', () => {
    it('Should be able to create tabletop with environment variable', () => {
        const table = new Tabletop('3', '4');
        expect(table.length).to.equal(3);
        expect(table.width).to.equal(4);
    });

    it('Should be able to create tabletop with default size', () => {
        const table = new Tabletop();
        expect(table.length).to.equal(TABLETOP_DEAULT_SIZE);
        expect(table.width).to.equal(TABLETOP_DEAULT_SIZE);
    });

    it('Should default value if input is invalid', () => {
        const invalidInput = [
            ['test', 'test'],
            [0, 0],
            [-1, -1],
            [1.1, 1.1],
        ];
        invalidInput.map(input => {
            const table = new Tabletop(input[0], input[1]);
            expect(table.length).to.equal(TABLETOP_DEAULT_SIZE);
            expect(table.width).to.equal(TABLETOP_DEAULT_SIZE);
        });
    });

    it('Should be able to create tabletop with valid customized size', () => {
        const validInput = [
            [1, 1],
            ['1', '1'],
            [100, 10000],
            ['100', '10000'],
            [1234, 4321],
            ['1234', '4321'],
        ];
        const output = [
            [1, 1],
            [1, 1],
            [100, 10000],
            [100, 10000],
            [1234, 4321],
            [1234, 4321],
        ];
        validInput.map((input, index) => {
            const table = new Tabletop(input[0], input[1]);
            expect(table.length).to.equal(output[index][0]);
            expect(table.width).to.equal(output[index][1]);
        });
    });

    it('Invalid position should not on the tabletop', () => {
        const table = new Tabletop();
        const invalidPosition = [
            { x: undefined, y: 1, direct: undefined },
            { x: 1, y: undefined, direct: undefined },
            { x: 1.1, y: 1, direct: undefined },
            { x: 1, y: 1.2, direct: undefined },
            { x: 0, y: -1, direct: undefined },
        ] as Position[];
        invalidPosition.map(p => {
            expect(table.isOnTable(p)).to.equal(false);
        });
    });

    it('Valid position on the tabletop', () => {
        const table = new Tabletop(5, 7);
        const invalidPosition = [
            { x: 0, y: 0, direct: Direction.SOUTH },
            { x: 4, y: 6, direct: Direction.NORTH },
            { x: 0, y: 6, direct: Direction.WEST },
            { x: 4, y: 0, direct: Direction.EAST },
            { x: 3, y: 2, direct: Direction.SOUTH },
        ] as Position[];
        invalidPosition.map(p => {
            expect(table.isOnTable(p)).to.equal(true);
        });
    });

    it('Valid position but not on the tabletop', () => {
        const table = new Tabletop(5, 7);
        const invalidPosition = [
            { x: 5, y: 0, direct: Direction.SOUTH },
            { x: 4, y: 7, direct: Direction.SOUTH },
            { x: 5, y: 7, direct: Direction.NORTH },
            { x: 5, y: 6, direct: Direction.WEST },
            { x: 0, y: 7, direct: Direction.SOUTH },
        ] as Position[];
        invalidPosition.map(p => {
            expect(table.isOnTable(p)).to.equal(false);
        });
    });
});
