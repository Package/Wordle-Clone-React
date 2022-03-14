import React, { FC, useMemo } from "react";
import { WORD_SIZE } from "../static-data/words";
import { Guess } from "../types/Guess";
import { LetterState } from "../types/LetterState";

interface TileRowComponentProps {
  isCurrent: boolean;
  invalid: boolean;
  guess?: Guess;
}

const TileRowComponent: FC<TileRowComponentProps> = ({
  isCurrent,
  invalid,
  guess
}) => {
  const ROWS = useMemo<Array<number>>(() => new Array(WORD_SIZE).fill(0), []);

  function getHighlightClass(index: number): string | null {
    if (invalid) {
      return "invalid";
    }

    if (isCurrent || !guess) {
      return null;
    }

    switch (guess.states[index]) {
      case LetterState.Correct:
        return "correct";
      case LetterState.WrongPosition:
        return "position";
      case LetterState.Incorrect:
        return "incorrect";
    }
  }

  return (
    <>
      {invalid && (
        <small className="red">{`"${guess?.word}"`} is invalid.</small>
      )}
      <div className="tile-row">
        {ROWS.map((_, index) => (
          <div key={index} className={`tile ${getHighlightClass(index)}`}>
            <span>{guess?.word[index]}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default TileRowComponent;
