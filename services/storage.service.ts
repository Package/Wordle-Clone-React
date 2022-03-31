import { WordleState } from "../types/WordleState";

export class StorageService {
  private static GAME_NUMBER_KEY = "WORDLE_CLONE_GAME_NUM";
  private static GAME_STATE_KEY = "WORDLE_CLONE_GAME_STATE";
  private static GAME_HISTORY_KEY = "WORDLE_CLONE_GAME_HISTORY";

  static getGameHistory(): WordleState[] {
    const historyFromStorageString = this.readFromStorage(
      this.GAME_HISTORY_KEY
    );

    return historyFromStorageString ? JSON.parse(historyFromStorageString) : [];
  }

  static saveGameInHistory(gameState: WordleState) {
    let parsedHistory = this.getGameHistory();

    const isInHistoryAlready = parsedHistory.find(
      (hist) => hist.gameNumber === gameState.gameNumber
    );

    let newHistory = [];
    if (isInHistoryAlready) {
      newHistory = parsedHistory.map((history) => {
        if (history.gameNumber === gameState.gameNumber) {
          return gameState;
        }

        return history;
      });
    } else {
      newHistory = [...parsedHistory, gameState];
    }

    this.writeToStorage(this.GAME_HISTORY_KEY, JSON.stringify(newHistory));
  }

  static saveLastPlayedGame(gameNumber: number) {
    this.writeToStorage(this.GAME_NUMBER_KEY, gameNumber.toString());
  }

  static getLastPlayedGame(): number {
    const maybeLastPlayed = this.readFromStorage(this.GAME_NUMBER_KEY);
    if (maybeLastPlayed) {
      // Current or most recently played game:
      return Number.parseInt(maybeLastPlayed);
    }

    const gameHistory = this.getGameHistory();
    if (gameHistory.length > 0) {
      // +1 as this game has been completed so we want to start them on the next game:
      return gameHistory[gameHistory.length - 1].gameNumber + 1;
    }

    return 1;
  }

  static saveGameState(gameState: WordleState) {
    this.writeToStorage(this.GAME_STATE_KEY, JSON.stringify(gameState));
  }

  static getGameState(gameNumber: number): WordleState | undefined {
    const storageState = this.readFromStorage(this.GAME_STATE_KEY);

    // Current of most recently played game:
    const parsedInitialState: WordleState = storageState
      ? JSON.parse(storageState)
      : undefined;
    if (parsedInitialState && parsedInitialState.gameNumber === gameNumber) {
      return parsedInitialState;
    }

    // Check back in the game history:
    const gameHistory = this.getGameHistory();
    return gameHistory.find((hist) => hist.gameNumber === gameNumber);
  }

  static clearGameState() {
    this.deleteFromStorage(this.GAME_STATE_KEY);
  }

  private static writeToStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  private static readFromStorage(key: string) {
    return localStorage.getItem(key);
  }

  private static deleteFromStorage(key: string) {
    localStorage.removeItem(key);
  }
}
