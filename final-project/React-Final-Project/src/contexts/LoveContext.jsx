import React, { createContext, useState } from 'react';
import axios from "axios";
export const LoveContext = createContext();

const LoveProvider = ({ children }) => {
    const [love, setLove] = useState(0);
    const [selectedLove, setSelectedLove] = useState([]);

    const getFavorite =async (product) => {
        const response = await axios.get("http://localhost:3000/api/v1/auth/favorites" ,{
         headers: {
             "Content-Type": "application/json",
             jwt: localStorage.getItem("token"),
           },
     })
        console.log(response);
         if (selectedLove.includes(product._id)) {
             setSelectedLove(selectedLove.filter(id => id !== product._id));
             setLove(love - 1); 
         } else {
             setSelectedLove([...selectedLove, product._id]);
             setLove(love + 1);  
         }
     };
 
    const handleLoveClick =async (product) => {
       const response = await axios.post("http://localhost:3000/api/v1/auth/add-favorite" , {productId:product._id},{
        headers: {
            "Content-Type": "application/json",
            jwt: localStorage.getItem("token"),
          }
    })
       console.log(response);
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
