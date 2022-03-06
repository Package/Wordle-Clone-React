import { Letter } from "./Letter";

export interface Guess {
	letters: Array<Letter>;
	submitted: boolean;
}