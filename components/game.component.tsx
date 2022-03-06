import React, { FC, useMemo, useState } from 'react'
import { ANSWERS, ROW_SIZE, VALID_WORDS, WORD_SIZE } from '../static-data/words';
import { Alert, AlertType } from '../types/Alert';
import { Guess } from '../types/Guess';
import { LetterState } from '../types/LetterState';
import { AlertComponent } from './alert.component';
import KeyboardComponent from './keyboard.component';
import TileRowComponent from './tile-row.component';

const GameComponent: FC = () => {
	const ROWS = useMemo<Array<number>>(() => new Array(ROW_SIZE).fill(0), []);
	const CORRECT_WORD = useMemo<string>(() => ANSWERS[100], []);

	const [guesses, setGuesses] = useState<Guess[]>(new Array(ROW_SIZE).fill({}).map(_ => ({ word: "", states: [] })));

	const [gameOver, setGameOver] = useState<boolean>(false);
	const [currentRow, setCurrentRow] = useState<number>(0);
	const [currentWord, setCurrentWord] = useState<string>("");
	const [alert, setAlert] = useState<Alert | null>(null);

	function submitHandler() {
		if (gameOver || currentWord.length < 5) return;

		const currentWordLower = currentWord.toLowerCase();
		if (!(VALID_WORDS.includes(currentWordLower) || ANSWERS.includes(currentWordLower))) {
			setAlert({ message: `"${currentWord}" is not a valid word.`, type: AlertType.Error });
			return;
		}

		const currGuess: Guess = guesses[currentRow];
		for (let index = 0; index < WORD_SIZE; index++) {
			const currentLetter = currentWord[index].toLowerCase();

			if (currentLetter === CORRECT_WORD[index]) {
				currGuess.states.push(LetterState.Correct);
			} else {
				const anotherPosition = CORRECT_WORD.includes(currentLetter);
				currGuess.states.push(anotherPosition ? LetterState.WrongPosition : LetterState.Incorrect);
			}
		}

		const guessedCorrectly = currentWordLower === CORRECT_WORD;
		if (guessedCorrectly) {
			setAlert({ message: `Congratulations, you got it right!`, type: AlertType.Success });
			setGameOver(true);
		}

		updateGuesses(currGuess);
		setCurrentRow(currentRow + 1);
		setCurrentWord("");
		if (!guessedCorrectly) {
			setAlert(null);
		}
	}

	function letterHandler(letter: string) {
		if (gameOver || currentWord.length >= 5) return;

		wordHandler(currentWord + letter);
	}

	function deleteHandler() {
		if (gameOver) return;

		// Remove last element
		wordHandler(currentWord.slice(0, -1));
	}

	function wordHandler(word: string) {
		setCurrentWord(word);

		guesses[currentRow].word = word;
		updateGuesses(guesses[currentRow]);
	}

	const updateGuesses = (updated: Guess) => setGuesses(guesses.map((guess, index) => index === currentRow ? updated : guess));

	return (
		<div className="game-container">
			<AlertComponent alert={alert} />

			{ROWS.map((_, index) => (
				<TileRowComponent key={`row-${index}`} isCurrent={currentRow === index} guess={guesses[index]} />
			))}

			<KeyboardComponent
				submitHandler={submitHandler}
				letterHandler={letterHandler}
				deleteHandler={deleteHandler}
			/>
		</div>
	)
}

export default GameComponent