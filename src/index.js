"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nokiafy = void 0;
class Nokiafy {
    constructor(_code) {
        this._code = _code;
        this.StringToNokia = {
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
    }
    get value() {
        return this._code;
    }
    code() {
        this._code = this._code.split('').map((character) => {
            const lowerCasedCharacter = character.toLowerCase();
            return this.setAlterations(character) + (this.StringToNokia[lowerCasedCharacter] ? this.StringToNokia[lowerCasedCharacter] : character);
        }).join(' ');
        return this;
    }
    decode() {
        const NokiaToString = this.getDecodeDictionary();
        this._code = this._code
            .split(' ')
            .map((character) => {
            return this.hasAlteration(character) ?
                this.applyAlterations(character, NokiaToString[character.substring(1)]) :
                NokiaToString[character] ? NokiaToString[character] : character;
        })
            .join('');
        return this;
    }
    static convert(sentence) {
        return new Nokiafy(sentence)
            .validate()
            .code()
            .decode()
            .value;
    }
    validate() {
        if (!this._code.length) {
            throw new Error("Sentence is required");
        }
        return this;
    }
    setAlterations(character) {
        let result = '';
        const lowerCasedCharacter = character.toLowerCase();
        result = result + ((lowerCasedCharacter !== character) ? '#' : '');
        result = result + (isNaN(parseInt(character)) ? '' : '$');
        return result;
    }
    applyAlterations(code, character) {
        switch (code[0]) {
            case '#':
                return character.toUpperCase();
            case '$':
                return code.substring(1);
            default:
                return character;
        }
    }
    hasAlteration(code) {
        return isNaN(parseInt(code[0])) && code.length > 1;
    }
    getDecodeDictionary() {
        return Object.entries(this.StringToNokia).reduce((acc, value) => {
            return Object.assign(Object.assign({}, acc), { [value[1]]: value[0].replace(/[aeiou]/gi, 'i') });
        }, {});
    }
}
exports.Nokiafy = Nokiafy;
