import type { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router';
import GameComponent from '../components/game.component';
import NavbarComponent from '../components/navbar.component';

const Home: NextPage = () => {
  const router = useRouter();
  const gameNumber = Number.parseInt(router.query.gameNumber as string) || 1;

  return (
    <>
      <NavbarComponent />
      <GameComponent gameNumber={gameNumber} />
    </>
  )
}

export default Home
