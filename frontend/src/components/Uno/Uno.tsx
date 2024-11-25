// import React, { useEffect, useState } from "react";
// import { Socket } from "socket.io-client";
// import { DefaultEventsMap } from "socket.io/dist/typed-events";
// import HomePage from "../Home/Home";
// import "./uno.css";

// interface Card {
//   id: number;
//   color: string;
//   value: string;
// }

// interface Player {
//   id: number;
//   name: string;
//   cards: Card[];
// }

// type HomePageProps = {
//   socket: Socket<DefaultEventsMap, DefaultEventsMap>;
//   startGame: (playerNames: string[]) => void;
// };

// function Uno({ socket, startGame: initiateGame }: HomePageProps) {
//   const [gameStart, setGame] = useState<boolean>(false);
//   const [playerNames, setPlayerNames] = useState<string[]>([]);
//   const [players, setPlayers] = useState<Player[]>([]);
//   const [activePlayer, setActivePlayer] = useState<number>(0);
//   const [discardPile, setDiscardPile] = useState<Card[]>([]);
//   const [drawPile, setDrawPile] = useState<Card[]>([]);
//   const [reverse, setReverse] = useState<boolean>(false);
//   const [selectedCard, setSelectedCard] = useState<Card | null>(null);

//   const colors = ["red", "blue", "green", "yellow"];
//   const values = [
//     ...Array.from({ length: 10 }, (_, i) => i.toString()),
//     "skip",
//     "reverse",
//     "draw",
//   ];

//   const generateDeck = () => {
//     const deck: Card[] = [];
//     let id = 0;

//     for (let color of colors) {
//       for (let value of values) {
//         deck.push({ id, color, value });
//         id++;
//         if (value !== "0") {
//           deck.push({ id, color, value });
//           id++;
//         }
//       }
//     }

//     for (let i = 0; i < 4; i++) {
//       deck.push({ id, color: "wild", value: "wild" });
//       id++;
//       deck.push({ id, color: "wild", value: "draw4" });
//       id++;
//     }

//     return deck;
//   };

//   const shuffleDeck = (deck: Card[]) => {
//     for (let i = deck.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [deck[i], deck[j]] = [deck[j], deck[i]];
//     }
//     return deck;
//   };

//   const dealCards = (deck: Card[], players: Player[]) => {
//     for (let i = 0; i < 7; i++) {
//       for (let player of players) {
//         const card = deck.pop();
//         if (card) {
//           player.cards.push(card);
//         }
//       }
//     }
//   };

//   const startGame = (playerNames: string[]) => {
//     let deck = generateDeck();
//     deck = shuffleDeck(deck);
//     const initialPlayers: Player[] = playerNames.map((name, i) => ({
//       id: i,
//       name,
//       cards: [],
//     }));

//     dealCards(deck, initialPlayers);
//     setPlayers(initialPlayers);

//     const firstCard = deck.pop();
//     if (firstCard) {
//       setDiscardPile([firstCard]);
//     }

//     setDrawPile(deck);
//     setPlayerNames(playerNames);
//     setGame(true);
//   };

//   const isCardPlayable = (card: Card, topCard: Card) => {
//     return (
//       card.color === topCard.color ||
//       card.value === topCard.value ||
//       card.color === "wild"
//     );
//   };

//   const handleCardClick = (card: Card) => {
//     const currentPlayer = players[activePlayer];

//     // Check if the clicked card is playable
//     if (isCardPlayable(card, discardPile[0])) {
//       // Move the clicked card to the top of the card area
//       currentPlayer.cards = currentPlayer.cards.filter((c) => c.id !== card.id);
//       currentPlayer.cards.unshift(card);

//       // Remove the card from the player's hand and add it to the discard pile
//       const newDiscardPile = [card, ...discardPile];
//       setDiscardPile(newDiscardPile);

//       // If the player has no cards left, they win
//       if (currentPlayer.cards.length === 0) {
//         alert(`${currentPlayer.name} has won the game!`);
//         setGame(false);
//         return;
//       }

//       // Move to the next player
//       const increment = reverse ? -1 : 1;
//       const nextPlayerIndex =
//         (activePlayer + increment + players.length) % players.length;
//       setActivePlayer(nextPlayerIndex);

//       // Notify backend to update other players
//       socket.emit("nextTurn", { currentPlayer: nextPlayerIndex });
//     } else {
//       alert("This card is not playable!");
//     }
//   };

//   const handleDeckClick = () => {
//     // Draw a new card and add it to the current player's cards
//     const currentPlayer = players[activePlayer];
//     const card = drawPile.pop();
//     if (card) {
//       currentPlayer.cards.push(card);
//       setPlayers(players);
//     }
//   };

//   const handleStartGame = (playerNames: string[]) => {
//     startGame(playerNames);
//   };

//   const renderPlayerName = (player: Player) => {
//     return (
//       <div className={`player-tag player-${player.id}`}>{player.name}</div>
//     );
//   };

//   const renderCard = (card: Card) => {
//     const classes = `card ${card.color} ${card.value}`;
//     return (
//       <div
//         key={card.id}
//         className={classes}
//         onClick={() => handleCardClick(card)}
//       >
//         <span className="inner">
//           <span className="mark">
//             {card.value === "draw4" ? "+4" : card.value.toUpperCase()}
//           </span>
//         </span>
//       </div>
//     );
//   };

//   const renderDeckCard = () => {
//     const classes = "card deck";
//     return (
//       <div
//         key={drawPile.length}
//         className={classes}
//         onClick={() => handleDeckClick()}
//       >
//         <span className="inner">
//           <span className="mark">UNO</span>
//         </span>
//       </div>
//     );
//   };

//   useEffect(() => {
//     socket.on("gameReady", (playerNames: string[]) => {
//       startGame(playerNames);
//     });
//     socket.on("nextTurn", (data: { currentPlayer: number }) => {
//       setActivePlayer(data.currentPlayer);
//     });
//   }, [socket, startGame]);

//   return (
//     <>
//       {gameStart ? (
//         <div className="main-container">
//           <div className="game-container">
//             <div className="heading-container">
//               <h1>UNO</h1>
//             </div>
//             <div className="game-table-container">
//               <div className="game-table">
//                 <div className="card-area">
//                   {discardPile.map((card) => renderCard(card))}
//                   {renderDeckCard()}
//                 </div>
//                 {players.map((player) => (
//                   <div key={player.id} className="game-players-container">
//                     {renderPlayerName(player)}
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="select-rang-container">
//               <button
//                 className="button-select-rang"
//                 onClick={() => handleDeckClick()}
//               >
//                 Pick from deck
//               </button>
//               <button className="button-select-rang">Pass</button>
//             </div>
//           </div>

//           <div className="messages-and-cards-container">
//             <div className="right-side-container messages-container">
//               <h1>Messages</h1>
//               <div className="message-box">
//                 <div className="message-content-container">
//                   latest message comes here
//                 </div>
//                 <div className="message-content-container">
//                   Goodluck for the assignment!
//                 </div>
//               </div>
//             </div>
//             <div className="right-side-container my-cards-container">
//               <h1>My Cards</h1>
//               <div className="my-cards-inner-container">
//                 {players[activePlayer].cards.map((card) => renderCard(card))}
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <HomePage socket={socket} startGame={initiateGame} />
//       )}
//     </>
//   );
// }

// export default Uno;
import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import HomePage from "../Home/Home";
import "./uno.css";

interface Card {
  id: number;
  color: string;
  value: string;
}

interface Player {
  id: number;
  name: string;
  cards: Card[];
}

type HomePageProps = {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  startGame: (playerNames: string[]) => void;
};

function Uno({ socket, startGame: initiateGame }: HomePageProps) {
  const [gameStart, setGame] = useState<boolean>(false);
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [activePlayer, setActivePlayer] = useState<number>(0);
  const [discardPile, setDiscardPile] = useState<Card[]>([]);
  const [drawPile, setDrawPile] = useState<Card[]>([]);
  const [reverse, setReverse] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const colors = ["red", "blue", "green", "yellow"];
  const values = [
    ...Array.from({ length: 10 }, (_, i) => i.toString()),
    "skip",
    "reverse",
    "draw",
  ];

  const generateDeck = () => {
    const deck: Card[] = [];
    let id = 0;

    for (let color of colors) {
      for (let value of values) {
        deck.push({ id, color, value });
        id++;
        if (value !== "0") {
          deck.push({ id, color, value });
          id++;
        }
      }
    }

    for (let i = 0; i < 4; i++) {
      deck.push({ id, color: "wild", value: "wild" });
      id++;
      deck.push({ id, color: "wild", value: "draw4" });
      id++;
    }

    return deck;
  };

  const shuffleDeck = (deck: Card[]) => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  };

  const dealCards = (deck: Card[], players: Player[]) => {
    for (let i = 0; i < 7; i++) {
      for (let player of players) {
        const card = deck.pop();
        if (card) {
          player.cards.push(card);
        }
      }
    }
  };

  const startGame = (playerNames: string[]) => {
    let deck = generateDeck();
    deck = shuffleDeck(deck);
    const initialPlayers: Player[] = playerNames.map((name, i) => ({
      id: i,
      name,
      cards: [],
    }));

    dealCards(deck, initialPlayers);
    setPlayers(initialPlayers);

    const firstCard = deck.pop();
    if (firstCard) {
      setDiscardPile([firstCard]);
    }

    setDrawPile(deck);
    setPlayerNames(playerNames);
    setGame(true);
  };

  const isCardPlayable = (card: Card, topCard: Card) => {
    return (
      card.color === topCard.color ||
      card.value === topCard.value ||
      card.color === "wild"
    );
  };

  const handleCardClick = (card: Card) => {
    const currentPlayer = players[activePlayer];

    // Check if the clicked card is playable
    if (isCardPlayable(card, discardPile[0])) {
      // Move the clicked card to the top of the card area
      currentPlayer.cards = currentPlayer.cards.filter((c) => c.id !== card.id);
      currentPlayer.cards.unshift(card);

      // Remove the card from the player's hand and add it to the discard pile
      const newDiscardPile = [card, ...discardPile];
      setDiscardPile(newDiscardPile);

      // If the player has no cards left, they win
      if (currentPlayer.cards.length === 0) {
        alert(`${currentPlayer.name} has won the game!`);
        setGame(false);
        return;
      }

      // Move to the next player
      const increment = reverse ? -1 : 1;
      const nextPlayerIndex =
        (activePlayer + increment + players.length) % players.length;
      setActivePlayer(nextPlayerIndex);

      // Notify backend to update other players
      socket.emit("nextTurn", { currentPlayer: nextPlayerIndex });
    } else {
      alert("This card is not playable!");
    }
  };

  const handleDeckClick = () => {
    // Draw a new card and add it to the current player's cards
    const currentPlayer = players[activePlayer];
    const card = drawPile.pop();
    if (card) {
      currentPlayer.cards.push(card);
      setPlayers(players);
    }
  };

  const handleStartGame = (playerNames: string[]) => {
    startGame(playerNames);
  };

  const renderPlayerName = (player: Player) => {
    return (
      <div className={`player-tag player-${player.id}`}>{player.name}</div>
    );
  };

  const renderCard = (card: Card) => {
    const classes = `card ${card.color} ${card.value}`;
    return (
      <div
        key={card.id}
        className={classes}
        onClick={() => handleCardClick(card)}
      >
        <span className="inner">
          <span className="mark">
            {card.value === "draw4" ? "+4" : card.value.toUpperCase()}
          </span>
        </span>
      </div>
    );
  };

  const renderDeckCard = () => {
    const classes = "card deck";
    return (
      <div
        key={drawPile.length}
        className={classes}
        onClick={() => handleDeckClick()}
      >
        <span className="inner">
          <span className="mark">UNO</span>
        </span>
      </div>
    );
  };

  useEffect(() => {
    socket.on("gameReady", (playerNames: string[]) => {
      startGame(playerNames);
    });
    socket.on("nextTurn", (data: { currentPlayer: number }) => {
      setActivePlayer(data.currentPlayer);
    });
  }, [socket, startGame]);

  return (
    <>
      {gameStart ? (
        <div className="main-container">
          <div className="game-container">
            <div className="heading-container">
              <h1>UNO</h1>
            </div>
            <div className="game-table-container">
              <div className="game-table">
                <div className="card-area">
                  {discardPile.map((card) => renderCard(card))}
                  {renderDeckCard()}
                </div>
                {players.map((player) => (
                  <div key={player.id} className="game-players-container">
                    {renderPlayerName(player)}
                  </div>
                ))}
              </div>
            </div>
            <div className="select-rang-container">
              <button
                className="button-select-rang"
                onClick={() => handleDeckClick()}
              >
                Pick from deck
              </button>
              <button className="button-select-rang">Pass</button>
            </div>
          </div>

          <div className="messages-and-cards-container">
            <div className="right-side-container messages-container">
              <h1>Messages</h1>
              <div className="message-box">
                <div className="message-content-container">
                  latest message comes here
                </div>
                <div className="message-content-container">
                  Goodluck for the assignment!
                </div>
              </div>
            </div>
            <div className="right-side-container my-cards-container">
              <h1>My Cards</h1>
              <div className="my-cards-inner-container">
                {players[activePlayer].cards.map((card) => renderCard(card))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <HomePage socket={socket} startGame={initiateGame} />
      )}
    </>
  );
}

export default Uno;
