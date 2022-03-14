import { LetterState } from "./LetterState";

export interface Guess {
  word: string;
  states: LetterState[];
}
