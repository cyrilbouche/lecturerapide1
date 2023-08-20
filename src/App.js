import React, { useState, useEffect } from 'react';
import './App.css';
import Afficheur from './Afficheur.jsx';

function App() {
  
  const [word, setWord] = useState("Hello");
  const [textInput, setTextInput] = useState("Bonjour tout le monde");
  const [fontSize, setFontSize] = useState(16);
  const [color, setColor] = useState("black");
  const [bgColor, setBgColor] = useState("yellow");
  const [btnLecEtat, setBtnLecEtat] = useState(false);
  const [btnPauseEtat, setBtnPauseEtat] = useState(true);
  const [btnPauseLabel, setBtnPauseLabel] = useState("Pause");

  const increaseFontSize = () => {
    setFontSize(fontSize + 1);
  };

  const decreaseFontSize = () => {
    setFontSize(fontSize - 1);
  };

  const changeColor = (newColor, newBgColor) => {
    setColor(newColor);
    setBgColor(newBgColor);
  };

  const changeWord = (newWord) => {
    setWord(newWord);
  };

  const lecture = () => {
    const wordArray = textInput.split(' ');
    displayWords(wordArray, 0);
  };

  const displayWords = (wordArray, index) => {
    if (index < wordArray.length) {
        setWord(wordArray[index]);
        setTimeout(() => {
            displayWords(wordArray, index + 1); // Appel récursif
        }, 500);
    }
  };

  return (
    <div className="App">
      <h1>Lisez plus vite</h1>

      <Afficheur
        word={word}
        fontSize={fontSize}
        color={color}
        bgColor={bgColor}
      />

      <button id="bouton"  onClick={() => lecture()}>Lire</button>
      <button id="pauseBouton"  disabled>Pause</button>

      <button className="btn1" onClick={increaseFontSize}>
        A+
      </button>
      <button onClick={decreaseFontSize}>A-</button>
      <button onClick={() => changeColor("yellow", "black")}>
        Jaune sur noir
      </button>
      <button onClick={() => changeColor("black", "yellow")}>
        Noir sur jaune
      </button>

      <button onClick={() => changeWord("Nouveau mot")}>Changer de mot</button>

      <input
        type="text"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
      />
    </div>
  );
};
export default App;
