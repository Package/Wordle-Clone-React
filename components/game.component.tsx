import React, { FC, useMemo, useState } from 'react'
import { ANSWERS, ROW_SIZE, INVALID_WORDS, WORD_SIZE } from '../static-data/words';
import { LetterState } from '../types/Letter';
import KeyboardComponent from './keyboard.component';
import TileRowComponent from './tile-row.component';

const GameComponent: FC = () => {
	const ROWS = useMemo<Array<number>>(() => new Array(ROW_SIZE).fill(0), []);
	const CORRECT_WORD = useMemo<string>(() => ANSWERS[100], []);
	const LETTER_MAP = useMemo<Map<string, LetterState>>(() => new Map<string, LetterState>(), []);

	const [guesses, setGuesses] = useState<Array<string>>(new Array(ROW_SIZE).fill(""));
	const [gameOver, setGameOver] = useState<boolean>(false);

	const [currentRow, setCurrentRow] = useState<number>(0);
	const [currentWord, setCurrentWord] = useState<string>("");

	console.log(`Answer: ${CORRECT_WORD}`);

	const submitHandler = () => {
		if (gameOver || currentWord.length < 5) {
			return;
		}

		const currentWordLower = currentWord.toLowerCase();
		console.log(currentWordLower);
		if (INVALID_WORDS.includes(currentWordLower)) {
			alert(`"${currentWord}" is not a valid word.`);
			return;
		}

		if (currentWordLower === CORRECT_WORD) {
			alert("Congrats, you won!");
			setGameOver(true);
			return;
		}

		for (let index = 0; index < WORD_SIZE; index++) {
			const currentLetter = currentWord[index].toLowerCase();

			if (currentLetter === CORRECT_WORD[index]) {
				LETTER_MAP.set(currentLetter.toUpperCase(), LetterState.Correct);
			} else {
				const anotherPosition = CORRECT_WORD.includes(currentLetter);
				LETTER_MAP.set(currentLetter.toUpperCase(), anotherPosition ? LetterState.WrongPosition : LetterState.Incorrect);
			}
		}

		setCurrentRow(currentRow + 1);
		setCurrentWord("");
	}

	const letterHandler = (letter: string) => {
		if (gameOver || currentWord.length >= 5) {
			return;
		}

		updateWord(currentWord + letter);
	}

	const deleteHandler = () => {
		if (gameOver) {
			return;
		}

		// Remove last element
		updateWord(currentWord.slice(0, -1));
	}

	const updateWord = (nextWord: string) => {
		setCurrentWord(nextWord);
		setGuesses(guesses.map((word, index) => {
			return index === currentRow ? nextWord : word
		}));
	}

	const onGameOver = () => {
		setGameOver(true);
	}

	return (
		<div className="game-container">
			{ROWS.map((_, index) => (
				<TileRowComponent key={`row-${index}`} isCurrent={currentRow === index} word={guesses[index]} letterMap={LETTER_MAP} />
			))}
			<KeyboardComponent submitHandler={submitHandler} letterHandler={letterHandler} deleteHandler={deleteHandler} letterMap={LETTER_MAP} />
		</div>
	)
}

export default GameComponent