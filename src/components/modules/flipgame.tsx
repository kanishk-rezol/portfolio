
import { useState, useEffect } from 'react';
import { Howl } from 'howler';

// Sound effects
const flipSound = new Howl({ src: ['https://assets.mixkit.co/sfx/preview/mixkit-card-flip-1939.mp3'] });
const winSound = new Howl({ src: ['https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3'] });
const matchSound = new Howl({ src: ['https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3'] });

type Card = {
  id: number;
  value: string;
  flipped: boolean;
  matched: boolean;
};

const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🦁', '🐮', '🐷', '🐸'];

export default function FlipyBoard() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [timer, setTimer] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  // Initialize game
  const initGame = () => {
    // Create pairs of cards
    const cardValues = [...emojis.slice(0, 8), ...emojis.slice(0, 8)];
    
    // Shuffle cards
    const shuffledCards = cardValues
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        flipped: false,
        matched: false,
      }));

    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setGameWon(false);
    setTimer(0);
    setGameStarted(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && !gameWon) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameWon]);

  // Check for matches
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.value === secondCard.value) {
        // Match found
        matchSound.play();
        setCards(prevCards =>
          prevCards.map(card =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, matched: true }
              : card
          )
        );
        setFlippedCards([]);

        // Check if all cards are matched
        const allMatched = cards.every(
          card => card.matched || card.id === firstCard.id || card.id === secondCard.id
        );
        if (allMatched) {
          winSound.play();
          setGameWon(true);
        }
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, flipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
      setMoves(prev => prev + 1);
    }
  }, [flippedCards, cards]);

  const handleCardClick = (index: number) => {
    if (!gameStarted) setGameStarted(true);
    
    // Don't allow flipping if:
    // - Card is already flipped or matched
    // - Two cards are already flipped
    if (
      cards[index].flipped ||
      cards[index].matched ||
      flippedCards.length === 2 ||
      flippedCards.includes(index)
    ) {
      return;
    }

    flipSound.play();
    setCards(prevCards =>
      prevCards.map((card, i) =>
        i === index ? { ...card, flipped: true } : card
      )
    );
    setFlippedCards(prev => [...prev, index]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-purple-600 mb-6">Flipy Board</h1>
      
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between mb-6">
          <div className="text-lg font-semibold text-gray-700">
            Moves: <span className="text-purple-600">{moves}</span>
          </div>
          <div className="text-lg font-semibold text-gray-700">
            Time: <span className="text-purple-600">{formatTime(timer)}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          {cards.map((card, index) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(index)}
              className={`aspect-square flex items-center justify-center text-4xl rounded-lg cursor-pointer transition-all duration-300 transform ${card.flipped || card.matched ? 'rotate-y-180' : ''} ${
                card.matched
                  ? 'bg-green-100 border-2 border-green-400'
                  : card.flipped
                  ? 'bg-white border-2 border-purple-300'
                  : 'bg-purple-500 hover:bg-purple-600'
              }`}
            >
              {card.flipped || card.matched ? card.value : ''}
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          {/* Restart Button - Visible while game is active */}
          {!gameWon && gameStarted && (
            <button
              onClick={initGame}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Restart Game
            </button>
          )}
        </div>
        
        {(gameWon || !gameStarted) && (
          <div className="mt-6 p-4 bg-purple-100 rounded-lg text-center">
            {gameWon ? (
              <>
                <h2 className="text-2xl font-bold text-purple-700 mb-2">You Win!</h2>
                <p className="text-purple-600">
                  Completed in {moves} moves and {formatTime(timer)}
                </p>
              </>
            ) : (
              <h2 className="text-xl font-semibold text-purple-700">
                Click any card to start the game!
              </h2>
            )}
            <button
              onClick={initGame}
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              {gameWon ? 'Play Again' : 'Restart Game'}
            </button>
          </div>
        )}
      </div>
      
      <div className="mt-8 text-gray-500 text-sm">
        <p>Match all pairs of cards with the fewest moves and fastest time!</p>
      </div>
    </div>
  );
}
