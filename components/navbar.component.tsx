import React, { FC } from "react";
import { FaTimes, FaHistory } from "react-icons/fa";
import Link from "next/link";

interface NavbarProps {
  title: string;
  showHistory: boolean;
  showReturnToGame: boolean;
}

const NavbarComponent: FC<NavbarProps> = ({
  title,
  showHistory,
  showReturnToGame
}) => {
  return (
    <header>
      <h1>{title}</h1>

      {showHistory && (
        <Link href="/history">
          <button className="history" title="Game History">
            <FaHistory />
          </button>
        </Link>
      )}

      {showReturnToGame && (
        <Link href="/">
          <button className="history" title="Back to Game">
            <FaTimes />
          </button>
        </Link>
      )}
    </header>
  );
};

export default NavbarComponent;
