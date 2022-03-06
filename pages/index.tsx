import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import GameComponent from '../components/game.component';
import NavbarComponent from '../components/navbar.component';
import { StorageService } from '../services/storage.service';

const Home: NextPage = () => {
  const router = useRouter();
  const [gameNumber, setGameNumber] = useState<number>(0);

  useEffect(() => {
    const routerGameNumber = Number.parseInt(router.query.gameNumber as string);
    const storageGameNumber = StorageService.getLastPlayedGame();

    setGameNumber(routerGameNumber || storageGameNumber);
  }, [router]);

  return (
    <>
      <NavbarComponent />
      {gameNumber > 0 && (
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
