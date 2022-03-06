import React, { FC, useEffect, useMemo, useRef } from 'react'

interface KeyboardComponentProps {
	letterHandler: (letter: string) => void;
	submitHandler: () => void;
	deleteHandler: () => void;
}

const KeyboardComponent: FC<KeyboardComponentProps> = ({ letterHandler, submitHandler, deleteHandler }) => {
	const QWERTY_ROW_ONE = useMemo<Array<string>>(() => "QWERTYUIOP".split(""), []);
	const QWERTY_ROW_TWO = useMemo<Array<string>>(() => "ASDFGHJKL".split(""), []);
	const QWERTY_ROW_THREE = useMemo<Array<string>>(() => "ZXCVBNM".split(""), []);

	const LETTER_REGEX = useMemo<RegExp>(() => new RegExp("^[a-zA-Z]{1}$"), []);
	const TYPE_REF = useRef<HTMLInputElement>(null);

	useEffect(() => {
		// Hack - trigger auto-focus to capture key press events cuz React doesn't seem to like doing this!
		if (TYPE_REF.current) {
			TYPE_REF.current.focus();
		}
	}, []);

	function keyHandler(event: React.KeyboardEvent) {
		if (event.key === "Backspace") {
			deleteHandler();
		} else if (event.key === "Enter") {
			submitHandler();
		} else if (LETTER_REGEX.test(event.key)) {
			letterHandler(event.key.toUpperCase());
		}
	}

	return (
		<div className="keyboard">
			<input type="text" ref={TYPE_REF} className="keyboard-input" onKeyDown={keyHandler} />

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