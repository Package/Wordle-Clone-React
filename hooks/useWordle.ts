import { useEffect, useMemo, useState } from "react";
import { StorageService } from "../services/storage.service";
import { WordleService } from "../services/wordle.service";
import { ANSWERS, WORD_SIZE } from "../static-data/words";
import { Alert, AlertType } from "../types/Alert";
import { Guess } from "../types/Guess";
import { KeyboardSummary } from "../types/KeyboardSummary";
import { WordleState } from "../types/WordleState";

interface UseWorldeProps {
	gameNumber: number;
	initialState?: WordleState;
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

const DEFAULT_STATE: WordleState = {
	currentRow: 0,
	currentWord: "",
	gameOver: false,
	guesses: [],
	summary: { correct: [], incorrect: [], wrongPosition: [] }
}

export default function useWordle(props: UseWorldeProps): UseWordleHook {
	const CORRECT_WORD = useMemo<string>(() => ANSWERS[props.gameNumber ?? 0], []);

	const [alert, setAlert] = useState<Alert | null>(null);

	const [gameOver, setGameOver] = useState<boolean>(props.initialState?.gameOver ?? false);
	const [currentRow, setCurrentRow] = useState<number>(props.initialState?.currentRow ?? 0);
	const [currentWord, setCurrentWord] = useState<string>(props.initialState?.currentWord ?? "");
	const [guesses, setGuesses] = useState<Guess[]>(props.initialState?.guesses ?? WordleService.getDefaultGuesses());
	const [summary, setSummary] = useState<KeyboardSummary>(props.initialState?.summary ?? { correct: [], incorrect: [], wrongPosition: [] });

	useEffect(() => {
		StorageService.saveGameState({
			currentRow,
			guesses,
			gameOver,
			currentWord,
			summary
		});
	}, [currentRow, guesses, gameOver, currentWord, summary])

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