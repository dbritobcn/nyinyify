import {CodeStrategy} from "../core/codeStrategy";
import {Utils} from "../core/utils";

const MorseCodification: { [key: string]: string } = {
  'a': '.-',
  'b': '-...',
  'c': '-.-.',
  'd': '-..',
  'e': '.',
  'f': '..-.',
  'g': '--.',
  'h': '....',
  'i': '..',
  'j': '.---',
  'k': '-.-',
  'l': '.-..',
  'm': '--',
  'n': '-.',
  'o': '---',
  'p': '.--.',
  'q': '--.-',
  'r': '.-.',
  's': '...',
  't': '-',
  'u': '..-',
  'v': '...-',
  'w': '.--',
  'x': '-..-',
  'y': '-.--',
  'z': '--..',
  '1': '.----',
  '2': '..---',
  '3': '...--',
  '4': '....-',
  '5': '.....',
  '6': '-....',
  '7': '--...',
  '8': '---..',
  '9': '----.',
  '0': '-----',
  ' ': '.-.-'
}

export class MorsefyStrategy implements CodeStrategy {
  execute(sentence: string): string {
    return new Morsefy(sentence).execute();
  }
}

export class Morsefy {
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
        return MorseCodification[lowerCasedCharacter] || character;
      })
      .join(' ');
    return this;
  }

  decode() {
    const MorseToString = Utils.getDecodeDictionary(MorseCodification);
    let nextCapital = false;
    this._code = this._code
      .split(' ')
      .map((character: string): string => {
        nextCapital = !nextCapital;
        return MorseToString[character] ? nextCapital ?
          MorseToString[character].toUpperCase() :
          MorseToString[character].toLowerCase() :
          character
      })
      .join('')
    return this;
  }
}
