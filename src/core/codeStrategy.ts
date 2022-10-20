import {NokiafyStrategy} from "../nokiafy/nokiafy";
import {MorsefyStrategy} from "../morsefy/morsefy";

export enum CodeStrategies {
  'NOKIAFY',
  'MORSEFY'
}

export abstract class CodeStrategy {
  abstract execute(sentence: string): string;
}

export class CodeStrategyFactory {
  getStrategy(strategy: CodeStrategies): CodeStrategy {
    switch (strategy) {
      case CodeStrategies.NOKIAFY:
        return new NokiafyStrategy();
      case CodeStrategies.MORSEFY:
        return new MorsefyStrategy();
      default:
        return new NokiafyStrategy();
    }
  }
}
