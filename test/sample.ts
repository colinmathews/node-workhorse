/// <reference path="../typings/main.d.ts" />
import { assert } from 'chai';
import { Calculator } from '../index';

describe('Calculator', () => {
    var subject : Calculator;

    beforeEach(function () {
        subject = new Calculator();
    });

    describe('#add', () => {
        it('should add two numbers together', () => {
            return subject.add(2, 3)
            .then((result : number) => {
                assert.equal(result, 5);
            });
        });
    });
});