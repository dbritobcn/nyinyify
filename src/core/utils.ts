export class Utils {
  static getDecodeDictionary(dictionary: {[key: string]: string}) {
    return Object.entries(dictionary).reduce((acc: {[key: string]: string}, value: [string, string]) => {
      return {
        ...acc,
        [value[1]]: value[0]
      }
    }, {});
  }
}
