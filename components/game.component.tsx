import React, { FC, useEffect, useMemo } from 'react'
import useWordle from '../hooks/useWordle';
import { StorageService } from '../services/storage.service';
import { ROW_SIZE } from '../static-data/words';
import { WordleState } from '../types/WordleState';
import { AlertComponent } from './alert.component';
import KeyboardComponent from './keyboard.component';
import TileRowComponent from './tile-row.component';

interface GameComponentProps {
	gameNumber: number;
	initialState?: WordleState;
}

const GameComponent: FC<GameComponentProps> = ({ gameNumber, initialState }) => {
	const ROWS = useMemo<Array<number>>(() => new Array(ROW_SIZE).fill(0), []);
	const { isReady, isGameOver, alert, invalidIndex, currentRow, guesses, summary, submitHandler, letterHandler, deleteHandler } = useWordle({ gameNumber, initialState });

	useEffect(() => {
		StorageService.saveLastPlayedGame(gameNumber);
	}, [gameNumber]);

	function startNewGame() {
		StorageService.clearGameState();
		window.location.replace(`/?gameNumber=${gameNumber + 1}`);
	}

	if (!isReady) {
		return <p>Loading...</p>
	}

	return (
		<div className="game-container">
			<AlertComponent alert={alert} />

			{isGameOver && (
				<div className="game-over">
					<button className="game-over-btn" onClick={startNewGame}>New Game?</button>
				</div>
			)}

			{ROWS.map((_, index) => (
				<TileRowComponent key={`row-${index}`} invalid={invalidIndex === index} isCurrent={isGameOver ? false : currentRow === index} guess={guesses[index]} />
			))}

			<KeyboardComponent
				submitHandler={submitHandler}
				letterHandler={letterHandler}
				deleteHandler={deleteHandler}
				summary={summary}
			/>
		</div>
	)
}

export default GameComponent