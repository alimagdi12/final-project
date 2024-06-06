import React, { createContext, useState } from 'react';

export const LoveContext = createContext();

const LoveProvider = ({ children }) => {
    const [love, setLove] = useState(0);
    const [selectedLove, setSelectedLove] = useState([]);

    const handleLoveClick = (product) => {
        if (selectedLove.includes(product._id)) {
            setSelectedLove(selectedLove.filter(id => id !== product._id));
            setLove(love - 1); 
        } else {
            setSelectedLove([...selectedLove, product._id]);
            setLove(love + 1);  
        }
    };

    return (
        <LoveContext.Provider value={{ love, setLove, handleLoveClick, selectedLove }}>
            {children}
        </LoveContext.Provider>
    );
};

export default LoveProvider;
