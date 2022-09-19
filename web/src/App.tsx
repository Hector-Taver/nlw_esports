import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";

import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";

import "./styles/main.css";

import logoImg from "./assets/logo-nlw-esports.svg";
import { Modal } from "./components/Modal";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

export const App = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const apiUrl = "http://localhost:3333/games";

    axios.get(apiUrl)
      .then((response) => {
        setGames(response.data);
      });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="logo" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => (
          <GameBanner
            key={game.id}
            gameName={game.title}
            adAmount={game._count.ads}
            bannerUrl={game.bannerUrl}
          />
        ))}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <Modal />
      </Dialog.Root>
    </div>
  );
};
