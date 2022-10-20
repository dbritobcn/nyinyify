import {CodeStrategies, CodeStrategyFactory} from "../core/codeStrategy";

export class Nyinyify {
  constructor(private _code: string) {}

  get value(): string {
    return this._code;
  }

  convertVowels() {
    this._code = new CodeStrategyFactory().getStrategy(CodeStrategies.NOKIAFY).execute(this._code);
    return this;
  }

  alternateUpperAndLowerCase() {
    this._code = new CodeStrategyFactory().getStrategy(CodeStrategies.MORSEFY).execute(this._code);
    return this;
  }

  validate() {
    if (!this._code.length) {
      throw new Error("Sentence is required");
    }
    return this;
  }

  static convert(sentence: string): string {
    return new Nyinyify(sentence)
      .validate()
      .convertVowels()
      .alternateUpperAndLowerCase()
      .value;
  }
}
