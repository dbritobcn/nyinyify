import {Nyinyify} from "./nyinyify";

describe("Nyinyify", () => {
  describe("Validate", () => {
    it("should validate successfully", () => {
      expect(() => new Nyinyify('Hello world').validate().value).not.toThrow();
    });

    it("should throw on empty sentence", () => {
      expect(() => new Nyinyify('').validate().value).toThrow();
    });
  });

  describe("Convert", () => {
    it("should convert successfully", () => {
      const sentence = 'DDD es basicamente estructurar carpetas';
      const expected = 'DdD Is bIsIcImInTi iStRiCtIrIr cIrPiTiS';
      expect(Nyinyify.convert(sentence)).toBe(expected);
    });

    it("should throw on empty sentence", () => {
      expect(() => Nyinyify.convert('')).toThrowError("Sentence is required");
    });
  });
});
