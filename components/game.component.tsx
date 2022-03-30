import React, { FC, useEffect, useMemo } from "react";
import useWordle from "../hooks/useWordle";
import { StorageService } from "../services/storage.service";
import { ROW_SIZE } from "../static-data/words";
import { WordleState } from "../types/WordleState";
import { AlertComponent } from "./alert.component";
import KeyboardComponent from "./keyboard.component";
import TileRowComponent from "./tile-row.component";

interface GameComponentProps {
  gameNumber: number;
  initialState?: WordleState;
}

const GameComponent: FC<GameComponentProps> = ({
  gameNumber,
  initialState
}) => {
  const ROWS = useMemo<Array<number>>(() => new Array(ROW_SIZE).fill(0), []);
  const {
    isReady,
    isGameOver,
    alert,
    invalidIndex,
    currentRow,
    guesses,
    summary,
    submitHandler,
    letterHandler,
    deleteHandler
  } = useWordle({ gameNumber, initialState });

  useEffect(() => {
    StorageService.saveLastPlayedGame(gameNumber);
  }, [gameNumber]);

  if (!isReady) {
    return <p>Loading...</p>;
  }

  return (
    <div className="game-container">
      <div className="top">
        <AlertComponent alert={alert} />

        {isGameOver && (
          <div className="game-over">
            <button className="game-over-btn">
              <a href={`/?gameNumber=${gameNumber + 1}`}>New Game?</a>
            </button>
          </div>
        )}

        <div className="tile-container">
          {ROWS.map((_, index) => (
            <TileRowComponent
              key={`row-${index}`}
              invalid={invalidIndex === index}
              isCurrent={isGameOver ? false : currentRow === index}
              guess={guesses[index]}
            />
          ))}
        </div>
      </div>

      <div className="bottom">
        <KeyboardComponent
          submitHandler={submitHandler}
          letterHandler={letterHandler}
          deleteHandler={deleteHandler}
          summary={summary}
        />
      </div>
    </div>
  );
};

export default GameComponent;
