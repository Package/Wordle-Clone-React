import React, { FC, useMemo } from 'react'
import useWordle from '../hooks/useWordle';
import { ROW_SIZE } from '../static-data/words';
import { AlertComponent } from './alert.component';
import KeyboardComponent from './keyboard.component';
import TileRowComponent from './tile-row.component';

interface GameComponentProps {
	gameNumber: number;
}

const GameComponent: FC<GameComponentProps> = ({ gameNumber }) => {
	const ROWS = useMemo<Array<number>>(() => new Array(ROW_SIZE).fill(0), []);
	const { isGameOver, alert, currentRow, guesses, submitHandler, letterHandler, deleteHandler } = useWordle({ gameNumber });

	return (
		<div className="game-container">
			<AlertComponent alert={alert} />

			{isGameOver && (
				<div className="game-over">
					<p>SHARE BUTTON</p>
					<a href={`/?gameNumber=${gameNumber + 1}`}>Play again?</a>
				</div>
			)}

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