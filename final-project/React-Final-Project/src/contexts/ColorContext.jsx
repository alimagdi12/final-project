import React, { createContext, useState, useEffect } from 'react';

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {

  const [color, setColor] = useState('#5daa60');


  
  return (
    <ColorContext.Provider value={{ color, setColor }}>
      {children}
    </ColorContext.Provider>
  );
};

export default ColorContext;
