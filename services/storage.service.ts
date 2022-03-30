import { WordleState } from "../types/WordleState";

export class StorageService {
  private static GAME_NUMBER_KEY = "WORDLE_CLONE_GAME_NUM";
  private static GAME_STATE_KEY = "WORDLE_CLONE_GAME_STATE";
  private static GAME_HISTORY_KEY = "WORDLE_CLONE_GAME_HISTORY";

  static saveGameInHistory(gameState: WordleState) {
    const historyFromStorageString = this.readFromStorage(
      this.GAME_HISTORY_KEY
    );

    let parsedHistory: WordleState[] = historyFromStorageString
      ? JSON.parse(historyFromStorageString)
      : [];

    let newHistory = [];
    const isInHistoryAlready = parsedHistory.find(
      (hist) => hist.gameNumber === gameState.gameNumber
    );
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

    console.log(parsedHistory, newHistory);
    this.writeToStorage(this.GAME_HISTORY_KEY, JSON.stringify(newHistory));
  }

  static saveLastPlayedGame(gameNumber: number) {
    this.writeToStorage(this.GAME_NUMBER_KEY, gameNumber.toString());
  }

  static getLastPlayedGame(): number {
    const maybeLastPlayed = this.readFromStorage(this.GAME_NUMBER_KEY);
    return maybeLastPlayed ? Number.parseInt(maybeLastPlayed) : 1;
  }

  static saveGameState(gameState: WordleState) {
    this.writeToStorage(this.GAME_STATE_KEY, JSON.stringify(gameState));
  }

  static getGameState(): WordleState | undefined {
    const initialState = this.readFromStorage(this.GAME_STATE_KEY);
    if (initialState) {
      return JSON.parse(initialState);
    }

    return undefined;
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
