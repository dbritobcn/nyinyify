"use strict";
// export enum Vocals {
//   a, e, i, o, u
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nokiafy = exports.StringToNokia = void 0;
exports.StringToNokia = {
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
};
class Nokiafy {
    constructor(code) {
        this.code = code;
    }
    static code(input) {
        try {
            Nokiafy.validate(input);
            return input.split('').map((character) => {
                const lowerCasedCharacter = character.toLowerCase();
                return Nokiafy.getAlterations(character) + (exports.StringToNokia[lowerCasedCharacter] ? exports.StringToNokia[lowerCasedCharacter] : character);
            }).join(' ');
        }
        catch (e) {
            throw e;
        }
    }
    static decode(code) {
        const NokiaToString = Nokiafy.getDecodeDiccionary();
        return code
            .split(' ')
            .map((character) => {
            console.log('character', character);
            console.log('NokiaToString[character]', NokiaToString[character]);
            return Nokiafy.hasAlteration(character) ?
                Nokiafy.applyAlterations(character, NokiaToString[character.substring(1)]) :
                NokiaToString[character] ? NokiaToString[character] : character;
        })
            .join('');
    }
    static validate(input) {
        if (!input.length) {
            throw new Error("Sentence is required");
        }
    }
    static getAlterations(character) {
        let result = '';
        const lowerCasedCharacter = character.toLowerCase();
        result = result + ((lowerCasedCharacter !== character) ? '#' : '');
        result = result + (isNaN(parseInt(character)) ? '' : '$');
        return result;
    }
    static applyAlterations(code, character) {
        switch (code[0]) {
            case '#':
                return character.toUpperCase();
            case '$':
                return code.substring(1);
            default:
                return character;
        }
    }
    static hasAlteration(code) {
        return isNaN(parseInt(code[0])) && code.length > 1;
    }
    static getDecodeDiccionary() {
        return Object.entries(exports.StringToNokia).reduce((acc, value) => {
            return Object.assign(Object.assign({}, acc), { [value[1]]: value[0] });
        }, {});
    }
}
exports.Nokiafy = Nokiafy;
