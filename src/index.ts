// export enum Vocals {
//   a, e, i, o, u
// }

export const StringToNokia: { [key: string]: string } = {
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

export class Nokiafy {
  private constructor(public readonly code: string) {}

  static code(input: string): string {
    try {
      Nokiafy.validate(input);
      return input.split('').map((character: string) => {
        const lowerCasedCharacter = character.toLowerCase();
        return Nokiafy.getAlterations(character) + (StringToNokia[lowerCasedCharacter] ? StringToNokia[lowerCasedCharacter] : character)
      }).join(' ');
    } catch(e) {
      throw e;
    }
  }

  static decode(code: string): string {
    const NokiaToString = Nokiafy.getDecodeDiccionary();
    return code
      .split(' ')
      .map((character: string) => {
        console.log('character', character);
        console.log('NokiaToString[character]', NokiaToString[character]);
        return Nokiafy.hasAlteration(character) ?
          Nokiafy.applyAlterations(character, NokiaToString[character.substring(1)]) :
          NokiaToString[character] ? NokiaToString[character] : character;
      })
      .join('');
  }

  static validate(input: string): void {
    if (!input.length) {
      throw new Error("Sentence is required");
    }
  }

  static getAlterations(character: string): string {
    let result = '';
    const lowerCasedCharacter = character.toLowerCase();
    result = result + ((lowerCasedCharacter !== character) ? '#' : '');
    result = result + (isNaN(parseInt(character)) ? '' : '$');
    return result;
  }

  static applyAlterations(code: string, character: string): string {
    switch(code[0]) {
      case '#':
        return character.toUpperCase();
      case '$':
        return code.substring(1);
      default:
        return character;
    }
  }

  static hasAlteration(code: string): boolean {
    return isNaN(parseInt(code[0])) && code.length > 1;
  }

  static getDecodeDiccionary() {
    return Object.entries(StringToNokia).reduce((acc: {[key: string]: string}, value: [string, string]) => {
      return {
        ...acc,
        [value[1]]: value[0]
      }
    }, {});
  }
}
