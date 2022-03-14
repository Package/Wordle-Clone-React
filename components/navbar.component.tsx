import React, { FC } from "react";

interface NavbarProps {
  gameNumber: number;
}

const NavbarComponent: FC<NavbarProps> = ({ gameNumber }) => {
  return (
    <header>
      <h1>Wordle Clone - Game {gameNumber}</h1>
    </header>
  );
};

export default NavbarComponent;
