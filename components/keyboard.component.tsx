import React, { FC, useEffect, useMemo, useRef } from 'react'
import { KeyboardSummary } from '../types/KeyboardSummary';

interface KeyboardComponentProps {
	summary: KeyboardSummary;
	letterHandler: (letter: string) => void;
	submitHandler: () => void;
	deleteHandler: () => void;
}

const KeyboardComponent: FC<KeyboardComponentProps> = ({ summary, letterHandler, submitHandler, deleteHandler }) => {
	const QWERTY_ROW_ONE = useMemo<Array<string>>(() => "QWERTYUIOP".split(""), []);
	const QWERTY_ROW_TWO = useMemo<Array<string>>(() => "ASDFGHJKL".split(""), []);
	const QWERTY_ROW_THREE = useMemo<Array<string>>(() => "ZXCVBNM".split(""), []);

	const LETTER_REGEX = useMemo<RegExp>(() => new RegExp("^[a-zA-Z]{1}$"), []);
	const TYPE_REF = useRef<HTMLInputElement>(null);

	useEffect(() => {
		// Trigger auto-focus to capture key press events once component is ready.
		autoFocus();
	}, []);

	useEffect(() => {
		// Re-trigger focus on input when page gains focus again. e.g. think user switched tabs etc.
		window.addEventListener("focus", autoFocus);

		return () => {
			window.removeEventListener("focus", autoFocus);
		};
	}, []);

	function autoFocus() {
		console.log("Autofocusing.");

		if (TYPE_REF.current) {
			TYPE_REF.current.focus();
		}
	}

	function keyHandler(event: React.KeyboardEvent) {
		if (event.key === "Backspace") {
			deleteHandler();
		} else if (event.key === "Enter") {
			submitHandler();
		} else if (LETTER_REGEX.test(event.key)) {
			letterHandler(event.key.toUpperCase());
		}
	}

	function getLetterHighlight(letter: string): string | null {
		const lowerLetter = letter.toUpperCase();

		if (summary.correct.includes(lowerLetter)) {
			return "correct";
		} else if (summary.wrongPosition.includes(lowerLetter)) {
			return "position";
		} else if (summary.incorrect.includes(lowerLetter)) {
			return "incorrect";
		}

		return null;
	}

	return (
		<div className="keyboard">
			<input type="text" ref={TYPE_REF} className="keyboard-input" onKeyDown={keyHandler} />

			<div className="keyboard-row">
				{QWERTY_ROW_ONE.map(letter => (
					<div key={letter} className={`letter ${getLetterHighlight(letter)}`} onClick={_ => letterHandler(letter)}>{letter}</div>
				))}
			</div>

			<div className="keyboard-row">
				{QWERTY_ROW_TWO.map(letter => (
					<div key={letter} className={`letter ${getLetterHighlight(letter)}`} onClick={_ => letterHandler(letter)}>{letter}</div>
				))}
			</div>

			<div className="keyboard-row">
				<div className="letter" onClick={_ => submitHandler()}>Enter</div>
				{QWERTY_ROW_THREE.map(letter => (
					<div key={letter} className={`letter ${getLetterHighlight(letter)}`} onClick={_ => letterHandler(letter)}>{letter}</div>
				))}
				<div className="letter" onClick={_ => deleteHandler()}>Delete</div>
			</div>
		</div>
	)
}

export default KeyboardComponent