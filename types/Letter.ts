export interface Letter {
	value: string;
	state?: LetterState
}

export enum LetterState {
	Correct, WrongPosition, Incorrect
}