import {Morsefy} from "./morsefy";
import {Nokiafy} from "../nokiafy/nokiafy";

describe('Morsefy', () => {
  describe("Code", () => {
    it("should code simple lowercase sentence", () => {
      const sentence = 'hello world';
      const expected = '.... . .-.. .-.. --- .-.- .-- --- .-. .-.. -..';
      expect(new Morsefy(sentence).code().value).toBe(expected);
    });

    it("should code sentence with uppercase characters", () => {
      const sentence = 'Hello World';
      const expected = '.... . .-.. .-.. --- .-.- .-- --- .-. .-.. -..';
      expect(new Morsefy(sentence).code().value).toBe(expected);
    });

    it("should code sentence with symbols", () => {
      const sentence = 'Hello, World!';
      const expected = '.... . .-.. .-.. --- , .-.- .-- --- .-. .-.. -.. !';
      expect(new Morsefy(sentence).code().value).toBe(expected);
    });

    it("should code sentence with numbers", () => {
      const sentence = 'H3ll0 W0rld1';
      const expected = '.... ...-- .-.. .-.. ----- .-.- .-- ----- .-. .-.. -.. .----';
      expect(new Morsefy(sentence).code().value).toBe(expected);
    });

    it("should return empty on empty sentence", () => {
      const sentence = '';
      const expected = '';
      expect(new Morsefy(sentence).code().value).toBe(expected);
    });
  });

  describe("Decode", () => {
    it("should denokiafy simple sentences successfully", () => {
      const code = '.... . .-.. .-.. --- .-.- .-- --- .-. .-.. -..';
      const expected = 'HeLlO WoRlD';
      expect(new Morsefy(code).decode().value).toBe(expected);
    });

    it("should denokiafy with uppercase characters", () => {
      const code = '.... . .-.. .-.. --- .-.- .-- --- .-. .-.. -..';
      const expected = 'HeLlO WoRlD';
      expect(new Morsefy(code).decode().value).toBe(expected);
    });

    it("should denokiafy with symbols", () => {
      const code = '.... . .-.. .-.. --- , .-.- .-- --- .-. .-.. -.. !';
      const expected = 'HeLlO, wOrLd!';
      expect(new Morsefy(code).decode().value).toBe(expected);
    });

    it("should denokiafy with numbers", () => {
      const code = '.... ...-- .-.. .-.. ----- .-.- .-- ----- .-. .-.. -.. .----';
      const expected = 'H3Ll0 W0RlD1';
      expect(new Morsefy(code).decode().value).toBe(expected);
    });

    it("should return empty on empty sentence", () => {
      const code = '';
      const expected = '';
      expect(new Morsefy(code).decode().value).toBe(expected);
    });
  });

  describe("Execute", () => {
    it("should transform successfully", () => {
      const sentence = 'DDD es basicamente estructurar carpetas';
      const expected = 'DdD Es bAsIcAmEnTe eStRuCtUrAr cArPeTaS';
      expect(new Morsefy(sentence).execute()).toBe(expected);
    });
  });
});
