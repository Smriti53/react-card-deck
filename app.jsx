// StAuth10244: I Smriti Manandhar, 000922444 certify that this material is my original work.
// No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

// ---------- Card Suits & Values ----------
const suits = ["♥", "♦", "♣", "♠"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

// ---------- CARD COMPONENT ----------
function Card({ suit, value, picked, onClick }) {
  const color = suit === "♥" || suit === "♦" ? "red" : "black";
  const border = picked ? "3px solid gold" : "1px solid #ccc";

  return (
    <div
      className="card"
      style={{ color, border }}
      onClick={onClick}
    >
      <div className="value">{value}</div>
      <div className="suit">{suit}</div>
    </div>
  );
}

// ---------- MAIN APP ----------
function App() {
  // State variables
  const [deck, setDeck] = React.useState(createDeck());
  const [displayed, setDisplayed] = React.useState([]);
  const [pickedIndex, setPickedIndex] = React.useState(null);

  // Create a full deck of 52 cards
  function createDeck() {
    const d = [];
    for (let s of suits) {
      for (let v of values) {
        d.push({ suit: s, value: v });
      }
    }
    return d;
  }

  // Draw one random card (when deck is clicked)
  function drawCard() {
    if (deck.length === 0) return;
    const index = Math.floor(Math.random() * deck.length);
    const card = deck[index];
    const newDeck = [...deck];
    newDeck.splice(index, 1);
    setDeck(newDeck);
    setDisplayed([...displayed, card]);
  }

  // Reset deck to full 52 cards
  function resetDeck() {
    setDeck(createDeck());
    setDisplayed([]);
    setPickedIndex(null);
  }

  // Deal multiple cards (for Deal 5 and Deal 7)
  function dealCards(count) {
    const fullDeck = [...deck, ...displayed];
    const newDeck = [...fullDeck];
    const newDisplayed = [];

    const numToDraw = Math.min(count, newDeck.length);
    for (let i = 0; i < numToDraw; i++) {
      const index = Math.floor(Math.random() * newDeck.length);
      const card = newDeck[index];
      newDeck.splice(index, 1);
      newDisplayed.push(card);
    }

    setDeck(newDeck);
    setDisplayed(newDisplayed);
    setPickedIndex(null);
  }

  // Handle card click (pick / unpick / swap)
  function handleCardClick(index) {
    if (pickedIndex === null) {
      setPickedIndex(index);
    } else if (pickedIndex === index) {
      setPickedIndex(null);
    } else {
      const newDisplayed = [...displayed];
      const temp = newDisplayed[pickedIndex];
      newDisplayed[pickedIndex] = newDisplayed[index];
      newDisplayed[index] = temp;
      setDisplayed(newDisplayed);
      setPickedIndex(null);
    }
  }

  // Toss the picked card (remove it completely)
  function tossPickedCard() {
    if (pickedIndex === null) return;
    const newDisplayed = [...displayed];
    newDisplayed.splice(pickedIndex, 1);
    setDisplayed(newDisplayed);
    setPickedIndex(null);
  }

  // Create a random card (for Wildcard)
  function createRandomCard() {
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    const randomValue = values[Math.floor(Math.random() * values.length)];
    return { suit: randomSuit, value: randomValue };
  }

  // Add a new random card (can duplicate existing ones)
  function addWildcard() {
    const newCard = createRandomCard();
    setDisplayed([...displayed, newCard]);
  }

  // Randomly shuffle the displayed cards (Regroup)
  function regroupCards() {
    const shuffled = [...displayed].sort(() => Math.random() - 0.5);
    setDisplayed(shuffled);
    setPickedIndex(null);
  }

  return (
    <main className="container">
      <h1>React Deck – Assignment 3</h1>
      <p>Click cards to pick, swap, toss, or regroup them!</p>

      {/* Deck display */}
      {deck.length > 0 ? (
        <div className="deck-placeholder" onClick={drawCard}>
          Overturned Deck
        </div>
      ) : (
        <div className="deck-placeholder">No cards remaining</div>
      )}

      {/* Control buttons */}
      <div className="controls">
        <button onClick={() => dealCards(5)}>Deal 5</button>
        <button onClick={() => dealCards(7)}>Deal 7</button>
        <button onClick={resetDeck}>Reset</button>
        <button onClick={tossPickedCard}>Toss</button>
        <button onClick={addWildcard}>Wildcard</button>
        <button onClick={regroupCards}>Regroup</button>
      </div>

      {/* Display drawn cards */}
      <div className="card-area">
        {displayed.map((card, index) => (
          <Card
            key={index}
            suit={card.suit}
            value={card.value}
            picked={pickedIndex === index}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </main>
  );
}

// ---------- Render to browser ----------
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
