import React, { useState } from 'react';
import './App.css';
import Afficheur from './Afficheur.jsx';

function App() {
  
  const [word, setWord] = useState("Hello");
  const [textInput, setTextInput] = useState("Bonjour tout le monde");
  const [fontSize, setFontSize] = useState(25);
  const [color, setColor] = useState("black");
  const [bgColor, setBgColor] = useState("yellow");
  const [delai, setDelai] = useState(150);
  const [btnLecEtat, setBtnLecEtat] = useState("");
  const [btnPauseEtat, setBtnPauseEtat] = useState("disabled");
  const [btnPauseLabel, setBtnPauseLabel] = useState("Pause");
  var etatLecture = false;

  // Augmenter la taille du texte
  const increaseFontSize = () => {
    setFontSize(fontSize + 1);
  };

  // Réduire la taille du texte
  const decreaseFontSize = () => {
    setFontSize(fontSize - 1);
  };

  // Changer la couleur du texte et de son fond
  const changeColor = (newColor, newBgColor) => {
    setColor(newColor);
    setBgColor(newBgColor);
  };

  // Lancement de la lecture du texte
  const lecture = () => {
    const wordArray = textInput.split(' ');
    setBtnLecEtat("disabled");
    setBtnPauseEtat("");
    etatLecture = true;
    displayWords(wordArray, 0);
  };

  // Fonction récursive permettant d'actualiser le composant afficheur
  const displayWords = (wordArray, index) => {
    if (index < wordArray.length & etatLecture) {
        setWord(wordArray[index]);
        setTimeout(() => {
            displayWords(wordArray, index + 1); // Appel récursif
        }, delai);
    }
    else{ 
      if (!etatLecture) { // On est en pause

      }
      else { // Fin de la lecture
        setBtnLecEtat("");
        setBtnPauseEtat("disabled");
        etatLecture = false;
      }
    }
  };

  return (
    <div className="App">
      <h1>Lisez plus vite</h1>

      <div id='afficheur'>
        <Afficheur
          word={word}
          fontSize={fontSize}
          color={color}
          bgColor={bgColor}
        />
      </div>
      
      <div id='controles'>
        <button id="bouton" disabled={btnLecEtat} onClick={() => lecture()}>Lire</button>
        <button id="pauseBouton" disabled={btnPauseEtat}>{btnPauseLabel}</button>

        <button className="btn1" onClick={increaseFontSize}>
          A+
        </button>
        <button onClick={decreaseFontSize}>
          A-
        </button>

        <button onClick={() => changeColor("yellow", "black")}>
          Jaune sur noir
        </button>
        <button onClick={() => changeColor("black", "yellow")}>
          Noir sur jaune
        </button>
        <br/>
        <label for="delai">Délai entre 2 mots en ms (100-1000):</label>
        <input type="number" id="delai" name="delai" min="100" max="1000" 
        value={delai}
        onChange={(e) => setDelai(e.target.value)}/>
      </div>

      

      <textarea id='texteALire'
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
      />
    </div>
  );
};
export default App;
