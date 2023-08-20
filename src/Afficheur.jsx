import React from "react";

const Afficheur = ({ word, fontSize, color, bgColor }) => {
  const wordStyle = {
    fontSize: `${fontSize}px`,
    color: color,
    backgroundColor: bgColor
  };

  return <div style={wordStyle}>{word}</div>;
};

export default Afficheur;