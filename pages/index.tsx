import type { NextPage } from 'next'
import GameComponent from '../components/game.component';
import NavbarComponent from '../components/navbar.component';

const Home: NextPage = () => {

  return (
    <>
      <NavbarComponent />
      <GameComponent />
    </>
  )
}

export default Home
