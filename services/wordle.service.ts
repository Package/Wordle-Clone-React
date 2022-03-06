import { ANSWERS, ROW_SIZE, VALID_WORDS, WORD_SIZE } from "../static-data/words";
import { Guess } from "../types/Guess";
import { LetterState } from "../types/LetterState";

export class WordleService {
	static getDefaultGuesses(): Guess[] {
		return new Array(ROW_SIZE).fill({}).map(_ => ({ word: "", states: [] }));
	}

	static isValidGuess(word: string): boolean {
		const wordLower = word.toLowerCase();

		return VALID_WORDS.includes(wordLower) || ANSWERS.includes(wordLower);
	}

	static evaluateGuess(guess: Guess, correctWord: string): Guess {
		for (let index = 0; index < WORD_SIZE; index++) {
			const currentLetter = guess.word[index].toLowerCase();

			if (currentLetter === correctWord[index]) {
				guess.states.push(LetterState.Correct);
			} else {
				const anotherPosition = correctWord.includes(currentLetter);
				guess.states.push(anotherPosition ? LetterState.WrongPosition : LetterState.Incorrect);
			}
		}

		return guess;
	}
}