import { useMemo, useState } from "react";
import { WordleService } from "../services/wordle.service";
import { ANSWERS, WORD_SIZE } from "../static-data/words";
import { Alert, AlertType } from "../types/Alert";
import { Guess } from "../types/Guess";
import { KeyboardSummary } from "../types/KeyboardSummary";

interface UseWorldeProps {
	gameNumber: number;
}

interface UseWordleHook {
	guesses: Guess[];
	currentRow: number;
	alert: Alert | null;
	isGameOver: boolean;
	summary: KeyboardSummary;

	submitHandler: () => void;
	letterHandler: (letter: string) => void;
	deleteHandler: () => void;
}

export default function useWordle(props: UseWorldeProps): UseWordleHook {
	const CORRECT_WORD = useMemo<string>(() => ANSWERS[props.gameNumber ?? 0], []);

	const [guesses, setGuesses] = useState<Guess[]>(WordleService.getDefaultGuesses());

	const [gameOver, setGameOver] = useState<boolean>(false);
	const [currentRow, setCurrentRow] = useState<number>(0);
	const [currentWord, setCurrentWord] = useState<string>("");
	const [alert, setAlert] = useState<Alert | null>(null);
	const [summary, setSummary] = useState<KeyboardSummary>({ correct: new Set(), incorrect: new Set(), wrongPosition: new Set() });

	/**
	 * Event Handler - Enter/Submit
	 * 
	 * Handles submitting the current guess.
	 */
	function submitHandler() {
		if (gameOver || currentWord.length < 5) return;

		const currentWordLower = currentWord.toLowerCase();
		const guessedCorrectly = currentWordLower === CORRECT_WORD;
		const currGuess = guesses[currentRow];
		const numGuessesLeft = guesses.filter(g => g.word.length !== WORD_SIZE).length;

		if (!WordleService.isValidGuess(currentWordLower)) {
			setAlert({ message: `"${currentWord}" is not a valid word.`, type: AlertType.Error });
			return;
		}

		WordleService.evaluateGuess(currGuess, CORRECT_WORD);
		updateGuesses(currGuess);

		setSummary(WordleService.buildSummary(guesses));

		if (guessedCorrectly) {
			setAlert({ message: `Congratulations, you got it right!`, type: AlertType.Success });
			setGameOver(true);
		} else if (numGuessesLeft === 0) {
			setAlert({ message: `Sorry, you didn't get the word! It was "${CORRECT_WORD}"`, type: AlertType.Warning });
			setGameOver(true);
		} else {
			setAlert(null);
			setCurrentRow(currentRow + 1);
			setCurrentWord("");
		}
	}

	/**
	 * Adds the provided letter to the current guess.
	 */
	function letterHandler(letter: string) {
		if (gameOver || currentWord.length >= 5) return;

		wordHandler(currentWord + letter);
	}

	/**
	 * Event Handler - backspace/delete.
	 * 
	 * Removes the last letter in the current guess.
	 */
	function deleteHandler() {
		if (gameOver) return;

		wordHandler(currentWord.slice(0, -1));
	}

	/**
	 * Updates the word in the current guess.
	 */
	function wordHandler(word: string) {
		setCurrentWord(word);

		guesses[currentRow].word = word;
		updateGuesses(guesses[currentRow]);
	}

	const updateGuesses = (updated: Guess) => setGuesses(guesses.map((guess, index) => index === currentRow ? updated : guess));

	return {
		alert,
		currentRow,
		guesses,
		isGameOver: gameOver,
		summary,
		letterHandler,
		deleteHandler,
		submitHandler
	}
}