import {CodeStrategy} from "../core/codeStrategy";
import {Utils} from "../core/utils";

const BoomerSMSCellphoneCodification: { [key: string]: string } = {
  'a': '2',
  'b': '22',
  'c': '222',
  'd': '3',
  'e': '33',
  'f': '333',
  'g': '4',
  'h': '44',
  'i': '444',
  'j': '5',
  'k': '55',
  'l': '555',
  'm': '6',
  'n': '66',
  'o': '666',
  'p': '7',
  'q': '77',
  'r': '777',
  's': '7777',
  't': '8',
  'u': '88',
  'v': '888',
  'w': '9',
  'x': '99',
  'y': '999',
  'z': '9999',
  ' ': '0'
}

export class NokiafyStrategy implements CodeStrategy {
  execute(sentence: string): string {
    return new Nokiafy(sentence).execute();
  }
}

export class Nokiafy {
  constructor(private _code: string) {}

  execute(): string {
    return this
      .code()
      .decode()
      .value;
  }

  get value(): string {
    return this._code;
  }

  code() {
    this._code = this._code
      .split('')
      .map((character: string): string => {
        const lowerCasedCharacter = character.toLowerCase();
        return this.setAlterations(character) + (BoomerSMSCellphoneCodification[lowerCasedCharacter] ? BoomerSMSCellphoneCodification[lowerCasedCharacter] : character)
      })
      .join(' ');
    return this;
  }

  decode() {
    const NokiaToString = Utils.getDecodeDictionary(BoomerSMSCellphoneCodification);
    this._code = this._code
      .split(' ')
      .map((character: string): string => {
        return this.hasAlteration(character) ?
          this.applyAlterations(character, NokiaToString[character.substring(1)]) :
          NokiaToString[character] ? NokiaToString[character].replace(/[aeiou]/gi, 'i') : character;
      })
      .join('');
    return this;
  }

  private setAlterations(character: string): string {
    let result = '';
    const lowerCasedCharacter = character.toLowerCase();
    result = result + ((lowerCasedCharacter !== character) ? '#' : '');
    result = result + (isNaN(parseInt(character)) ? '' : '$');
    return result;
  }

  private applyAlterations(code: string, character: string): string {
    switch(code[0]) {
      case '#':
        return character.toUpperCase();
      case '$':
        return code.substring(1);
      default:
        return character;
    }
  }

  private hasAlteration(code: string): boolean {
    return isNaN(parseInt(code[0])) && code.length > 1;
  }
}
