import React, { FC, useMemo } from 'react'
import { LetterState } from '../types/Letter';

interface KeyboardComponentProps {
	letterHandler: (letter: string) => void;
	submitHandler: () => void;
	deleteHandler: () => void;
	letterMap: Map<string, LetterState>;
}

const KeyboardComponent: FC<KeyboardComponentProps> = ({ letterHandler, submitHandler, deleteHandler, letterMap }) => {
	const QWERTY_ROW_ONE = useMemo<Array<string>>(() => "QWERTYUIOP".split(""), []);
	const QWERTY_ROW_TWO = useMemo<Array<string>>(() => "ASDFGHJKL".split(""), []);
	const QWERTY_ROW_THREE = useMemo<Array<string>>(() => "ZXCVBNM".split(""), []);

	return (
		<div className="keyboard">
			<div className="keyboard-row">
				{QWERTY_ROW_ONE.map(letter => (
					<div key={letter} className="letter" onClick={_ => letterHandler(letter)}>{letter}</div>
				))}
			</div>

			<div className="keyboard-row">
				{QWERTY_ROW_TWO.map(letter => (
					<div key={letter} className="letter" onClick={_ => letterHandler(letter)}>{letter}</div>
				))}
			</div>

			<div className="keyboard-row">
				<div className="letter" onClick={_ => submitHandler()}>Enter</div>
				{QWERTY_ROW_THREE.map(letter => (
					<div key={letter} className="letter" onClick={_ => letterHandler(letter)}>{letter}</div>
				))}
				<div className="letter" onClick={_ => deleteHandler()}>Delete</div>
			</div>
		</div>
	)
}

export default KeyboardComponent