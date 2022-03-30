import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GameComponent from "../components/game.component";
import NavbarComponent from "../components/navbar.component";
import { StorageService } from "../services/storage.service";
import { WordleState } from "../types/WordleState";

const Home: NextPage = () => {
  const router = useRouter();
  const [gameNumber, setGameNumber] = useState<number>(-1);
  const [gameState, setGameState] = useState<WordleState>();

  useEffect(() => {
    // Delay until router is ready (JS fully loaded on page)
    if (!router || !router.isReady) {
      return;
    }

    const routerGameNumber = Number.parseInt(router.query.gameNumber as string);
    const storageGameNumber = StorageService.getLastPlayedGame();
    const gameNumberInUse = routerGameNumber || storageGameNumber;

    setGameState(StorageService.getGameState(gameNumberInUse));
    setGameNumber(gameNumberInUse);
  }, [router]);

  if (gameNumber == -1) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <NavbarComponent gameNumber={gameNumber} />

      <Head>
        <title>My Wordle - Game {gameNumber}</title>
      </Head>
      <GameComponent gameNumber={gameNumber} initialState={gameState} />
    </>
  );
};

export default Home;
