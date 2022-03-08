import type { NextPage } from 'next'
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import GameComponent from '../components/game.component';
import NavbarComponent from '../components/navbar.component';
import { StorageService } from '../services/storage.service';

const Home: NextPage = () => {
  const router = useRouter();
  const [gameNumber, setGameNumber] = useState<number>(-1);

  useEffect(() => {
    // Delay until router is ready (JS fully loaded on page)
    if (!router) {
      return;
    }

    const routerGameNumber = Number.parseInt(router.query.gameNumber as string);
    const storageGameNumber = StorageService.getLastPlayedGame();
    const preferredGameNumber = routerGameNumber || storageGameNumber;

    setGameNumber(routerGameNumber || storageGameNumber);
  }, [router]);

  return (
    <>
      <NavbarComponent />

      {gameNumber > -1 && (
        <>
          <Head>
            <title>Wordle Clone - Game {gameNumber}</title>
          </Head>
          <GameComponent gameNumber={gameNumber} initialState={StorageService.getGameState()} />
        </>
      )}
    </>
  )
}

export default Home
