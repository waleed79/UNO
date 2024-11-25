import { Socket } from "socket.io-client";
import React, { useEffect, useState } from "react";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import "./Home.css";

interface HomePageProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  startGame: (playerNames: string[]) => void;
}

function HomePage({ socket, startGame }: HomePageProps) {
  const [name, setName] = useState("");

  const handleClick = (socket: Socket) => {
    socket.emit("playerJoined", name);
  };

  useEffect(() => {
    socket.on("gameReady", (playerNames: string[]) => {
      startGame(playerNames);
    });
  }, [socket, startGame]);

  return (
    <>
      <div className="sampleHomePage">
        <h1 className="sampleTitle">UNO Game</h1>
        <div className="sampleMessage">
          <input
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={() => handleClick(socket)}>Join Game</button>
        </div>
      </div>
    </>
  );
}

export default HomePage;
