import {Nokiafy} from "./index";


describe("Nokiafy", () => {
  describe("Validate", () => {
    it("should validate successfully", () => {
      expect(() => new Nokiafy('Hello world').validate().value).not.toThrow();
    });

    it("should throw on empty sentence", () => {
      expect(() => new Nokiafy('').validate().value).toThrow();
    });
  });

  describe("Code", () => {
    it("should nokiafy simple lowercase sentence", () => {
      const sentence = 'hello world';
      const expected = '44 33 555 555 666 0 9 666 777 555 3';
      expect(new Nokiafy(sentence).code().value).toBe(expected);
    });

    it("should nokiafy sentence with uppercase characters", () => {
      const sentence = 'Hello World';
      const expected = '#44 33 555 555 666 0 #9 666 777 555 3';
      expect(new Nokiafy(sentence).code().value).toBe(expected);
    });

    it("should nokiafy sentence with symbols", () => {
      const sentence = 'Hello, World!';
      const expected = '#44 33 555 555 666 , 0 #9 666 777 555 3 !';
      expect(new Nokiafy(sentence).code().value).toBe(expected);
    });

    it("should nokiafy sentence with numbers", () => {
      const sentence = 'H3ll0 W0rld1';
      const expected = '#44 $3 555 555 $0 0 #9 $0 777 555 3 $1';
      expect(new Nokiafy(sentence).code().value).toBe(expected);
    });
  });

  describe("Decode", () => {
    it("should denokiafy simple sentences successfully", () => {
      const code = '44 33 555 555 666 0 9 666 777 555 3';
      const expected = 'hilli wirld';
      expect(new Nokiafy(code).decode().value).toBe(expected);
    });

    it("should denokiafy with uppercase characters", () => {
      const code = '#44 33 555 555 666 0 #9 666 777 555 3';
      const expected = 'Hilli Wirld';
      expect(new Nokiafy(code).decode().value).toBe(expected);
    });

    it("should denokiafy with symbols", () => {
      const code = '#44 33 555 555 666 , 0 #9 666 777 555 3 !';
      const expected = 'Hilli, Wirld!';
      expect(new Nokiafy(code).decode().value).toBe(expected);
    });

    it("should denokiafy with numbers", () => {
      const code = '#44 $3 555 555 $0 0 #9 $0 777 555 3 $1  0 $100 $';
      const expected = 'H3ll0 W0rld1 100$';
      expect(new Nokiafy(code).decode().value).toBe(expected);
    });
  });

  // describe("Convert", () => {
  //   it("should convert successfully", () => {
  //     const sentence = 'DDD es basicamente estructurar carpetas';
  //     const expected = 'DDD is bisiciminti istrictirir cirpitis';
  //     expect(Nokiafy.convert(sentence)).toBe(expected);
  //   });
  // });
});
