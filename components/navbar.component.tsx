import React, { FC } from "react";
import { FaHistory } from "react-icons/fa";
import Link from "next/link";

interface NavbarProps {
  gameNumber: number;
}

const NavbarComponent: FC<NavbarProps> = ({ gameNumber }) => {
  return (
    <header>
      <h1>My Wordle - Game {gameNumber}</h1>
      <Link href="/history">
        <button className="history" title="Game History">
          <FaHistory />
        </button>
      </Link>
    </header>
  );
};

export default NavbarComponent;
