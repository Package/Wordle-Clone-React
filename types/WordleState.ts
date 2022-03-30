import { Alert } from "./Alert";
import { Guess } from "./Guess";
import { KeyboardSummary } from "./KeyboardSummary";

export interface WordleState {
  gameNumber: number;
  guesses: Guess[];
  gameOver: boolean;
  currentRow: number;
  currentWord: string;
  summary: KeyboardSummary;
  alert?: Alert;
}
