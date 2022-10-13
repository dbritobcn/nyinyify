"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
describe("String converter", () => {
    describe("Nokiafy", () => {
        it("should nokiafy simple lowercase sentence", () => {
            const sentence = 'hello world';
            const expected = '44 33 555 555 666 0 9 666 777 555 3';
            expect(index_1.Nokiafy.code(sentence)).toBe(expected);
        });
        it("should nokiafy sentence with uppercase characters", () => {
            const sentence = 'Hello World';
            const expected = '#44 33 555 555 666 0 #9 666 777 555 3';
            expect(index_1.Nokiafy.code(sentence)).toBe(expected);
        });
        it("should nokiafy sentence with symbols", () => {
            const sentence = 'Hello, World!';
            const expected = '#44 33 555 555 666 , 0 #9 666 777 555 3 !';
            expect(index_1.Nokiafy.code(sentence)).toBe(expected);
        });
        it("should nokiafy sentence with numbers", () => {
            const sentence = 'H3ll0 W0rld1';
            const expected = '#44 $3 555 555 $0 0 #9 $0 777 555 3 $1';
            expect(index_1.Nokiafy.code(sentence)).toBe(expected);
        });
        it("should throw on empty sentence", () => {
            expect(() => index_1.Nokiafy.code('')).toThrow();
        });
    });
    describe("Denokiafy", () => {
        it("should denokiafy simple sentences successfully", () => {
            const code = '44 33 555 555 666 0 9 666 777 555 3';
            const expected = 'hello world';
            expect(index_1.Nokiafy.decode(code)).toBe(expected);
        });
        it("should denokiafy with uppercase characters", () => {
            const code = '#44 33 555 555 666 0 #9 666 777 555 3';
            const expected = 'Hello World';
            expect(index_1.Nokiafy.decode(code)).toBe(expected);
        });
        it("should denokiafy with symbols", () => {
            const code = '#44 33 555 555 666 , 0 #9 666 777 555 3 !';
            const expected = 'Hello, World!';
            expect(index_1.Nokiafy.decode(code)).toBe(expected);
        });
        it("should denokiafy with numbers", () => {
            const code = '#44 $3 555 555 $0 0 #9 $0 777 555 3 $1  0 $100 $';
            const expected = 'H3ll0 W0rld1 100$';
            expect(index_1.Nokiafy.decode(code)).toBe(expected);
        });
    });
});
