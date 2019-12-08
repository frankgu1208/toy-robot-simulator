import { expect } from 'chai';
import { cli } from '../src/';

describe('index cli function', () => {
    it('able to read file from environment variable', () => {
        const result = cli('commands.txt');
        expect(result).to.equal(true);
    });

    it('should return false if file not exist', () => {
        const result = cli('not exist file');
        expect(result).to.equal(false);
    });
});
