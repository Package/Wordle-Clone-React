import React, { FC, useMemo } from 'react'
import { WORD_SIZE } from '../static-data/words';
import { LetterState } from '../types/Letter';

interface TileRowComponentProps {
	isCurrent: boolean;
	word: string;
	letterMap: Map<string, LetterState>;
}

const TileRowComponent: FC<TileRowComponentProps> = ({ isCurrent, word, letterMap }) => {
	const ROWS = useMemo<Array<number>>(() => new Array(WORD_SIZE).fill(0), []);

	const getHighlightClass = (letter: string): string | null => {
		if (isCurrent || !letterMap.has(letter)) {
			return null;
		}

		switch (letterMap.get(letter)) {
			case LetterState.Correct:
				return "correct"
			case LetterState.WrongPosition:
				return "position";
			case LetterState.Incorrect:
				return "incorrect";
		}

		return null;
	}

	return (
		<div className="tile-row">
			{ROWS.map((_, index) =>
				<div key={index} className={`tile ${getHighlightClass(word[index])}`}>
					<span>
						{word[index]}
					</span>
				</div>
			)}
		</div>
	)
}

export default TileRowComponent