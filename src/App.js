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

  // Style des élements en Tailwind
  const styleBoutons = "px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white ";
  const styleBoutonLec = "px-4 py-2 rounded bg-red-700 hover:bg-red-600 text-white";

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
        // attendre que l'utilisateur appuie sur reprendre

      }
      else { // Fin de la lecture
        setBtnLecEtat("");
        setBtnPauseEtat("disabled");
        etatLecture = false;
      }
    }
  };

  return (
    <div className="App bg-black text-white p-20 w-full">
      <h1 className='text-3xl font-bold'>Lisez plus vite</h1>

      <div id='afficheur' className='mb-20 p-4 rounded-lg shadow-md'>
        <Afficheur
          word={word}
          fontSize={fontSize}
          color={color}
          bgColor={bgColor}
        />
      </div>
      
      <div id='controles'>
        <div id='boutons' className="mb-20 flex space-x-4 overflow-x-auto">
          <button id="bouton" className={styleBoutonLec} disabled={btnLecEtat} onClick={() => lecture()}>Lire</button>
          <button id="pauseBouton" className={styleBoutons} disabled={btnPauseEtat}>{btnPauseLabel}</button>

          <button className={styleBoutons} onClick={increaseFontSize}>
            A+
          </button>
          <button className={styleBoutons} onClick={decreaseFontSize}>
            A-
          </button>

          <button className={styleBoutons} onClick={() => changeColor("yellow", "black")}>
            Jaune sur noir
          </button>
          <button className={styleBoutons} onClick={() => changeColor("black", "yellow")}>
            Noir sur jaune
          </button>
        </div>
        <div className="mb-20">
          <label for="delai">Délai entre 2 mots en ms (100-1000): </label>
          <input className="text-black" type="number" id="delai" name="delai" min="100" max="1000" 
          value={delai}
          onChange={(e) => setDelai(e.target.value)}/>
        </div>
      </div>

      <div class="mb-20 w-1/1">
        <textarea id='texteALire' class="bg-white text-black p-4 w-full h-400 rounded" 
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
      </div>
    </div>
  );
};
export default App;
