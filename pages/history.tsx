import Head from "next/head";
import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import NavbarComponent from "../components/navbar.component";
import { StorageService } from "../services/storage.service";
import { ANSWERS, WORD_SIZE } from "../static-data/words";
import { WordleState } from "../types/WordleState";

const HistoryPage = () => {
  const [history, setHistory] = useState<WordleState[]>([]);
  const [nextGameId, setNextGameId] = useState<number>();

  useEffect(() => {
    const historyFromStorage = StorageService.getGameHistory();

    let highestGameCompleted = 0;
    for (let currentGame of historyFromStorage) {
      if (currentGame.gameNumber > highestGameCompleted) {
        highestGameCompleted = currentGame.gameNumber;
      }
    }

    setNextGameId(highestGameCompleted + 1);
    setHistory(historyFromStorage);
  }, []);

  return (
    <>
      <NavbarComponent
        title={`Game History`}
        showHistory={false}
        showReturnToGame={true}
      />

      <Head>
        <title>My Wordle - History</title>
      </Head>

      <div className="game-container">
        {history.length === 0 && (
          <em className="mt-1 mb-1">You have not finished any games yet!</em>
        )}

        <div className="game-over">
          <button className="game-over-btn">
            <a href={`/?gameNumber=${nextGameId}`}>New Game?</a>
          </button>
        </div>

        <table>
          <tbody>
            {history.map((hist) => (
              <tr key={hist.gameNumber} className="game-history">
                <td>
                  <a href={`/?gameNumber=${hist.gameNumber}`}>
                    Game {hist.gameNumber}
                  </a>
                </td>
                <td>
                  {hist.currentWord.toLowerCase() ===
                  ANSWERS[hist.gameNumber] ? (
                    <FaCheck className="correct" />
                  ) : (
                    <FaTimes className="incorrect" />
                  )}
                </td>
                <td>
                  <strong>
                    {
                      hist.guesses.filter((g) => g.word.length === WORD_SIZE)
                        .length
                    }{" "}
                    guesses!
                  </strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HistoryPage;
