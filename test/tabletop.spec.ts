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

    it('Valid position to put an object onto the tabletop', () => {
        const table = new Tabletop(5, 5);
        const validPosition = [
            { x: 0, y: 0 },
            { x: 1, y: 1 },
            { x: 2, y: 2 },
        ];
        expect(table.objects.length).to.equal(0);
        validPosition.map(p => {
            table.addObject(p);
        });
        expect(table.objects.length).to.equal(validPosition.length);
    });

    it('Invalid position to put an object onto the tabletop', () => {
        const table = new Tabletop(1, 1);
        const validPosition = [
            { x: 1, y: 1 },
            { x: 2, y: 2 },
        ];
        expect(table.objects.length).to.equal(0);
        validPosition.map(p => {
            table.addObject(p);
        });
        expect(table.objects.length).to.equal(0);
    });

    it('Should not able to put multiple objects on the same postion', () => {
        const table = new Tabletop(1, 1);
        const objectPostion = { x: 0, y: 0 };
        expect(table.objects.length).to.equal(0);
        table.addObject(objectPostion);
        expect(table.objects.length).to.equal(1);
        table.addObject(objectPostion);
        expect(table.objects.length).to.equal(1);
    });

    it('Check the position is on the object', () => {
        const table = new Tabletop(5, 5);
        const objectPostion = { x: 0, y: 0 };
        const robotPostion = { x: 0, y: 0, direct: Direction.SOUTH };
        table.addObject(objectPostion);
        const result = table.availablePosition(robotPostion);
        expect(result).to.equal(false);
    });

    it('Check the position is not on the object', () => {
        const table = new Tabletop(5, 5);
        const objectPostion = { x: 0, y: 0 };
        const robotPostion = { x: 0, y: 1, direct: Direction.SOUTH };
        table.addObject(objectPostion);
        const result = table.availablePosition(robotPostion);
        expect(result).to.equal(true);
    });
});
