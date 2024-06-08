import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const LoveContext = createContext();

const LoveProvider = ({ children }) => {
    const [love, setLove] = useState(0);
    const [selectedLove, setSelectedLove] = useState([]);
    const [favorites, setFavorites] = useState([]);



useEffect(()=>{
    getFavorite()
},[])

    const getFavorite = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/v1/auth/favorites", {
                headers: {
                    "Content-Type": "application/json",
                    jwt: localStorage.getItem("token"),
                },
            });
            console.log(response);
            setFavorites(response.data.result);
         setLove(response.data.result.length)
            setSelectedLove(response.data.result.map(product => product._id));
        } catch (error) {
            console.error("Error fetching favorites:", error);
        }
    };

    const handleLoveClick = async (product) => {
        try {
            if (selectedLove.includes(product._id)) {
               console.log('hambozo');
               const response = await axios.delete("http://localhost:3000/api/v1/auth/remove-favorite", {
                headers: {
                    "Content-Type": "application/json",
                    jwt: localStorage.getItem('token')
                },
                data: {
                    productId: product._id
                }
            });
                  console.log(response);
                setSelectedLove(selectedLove.filter(id => id.toString() !== product._id.toString()));
                setLove(love - 1);
            } else {
                console.log('hamada');
                await axios.post("http://localhost:3000/api/v1/auth/add-favorite", { productId: product._id }, {
                    headers: {
                        "Content-Type": "application/json",
                        jwt: localStorage.getItem("token"),
                    },
                });
                setSelectedLove([...selectedLove, product._id]);
                setLove(love + 1);
            }
            // getFavorite(); 
        } catch (error) {
            console.error("Error updating favorite:", error);
        }
    };

    useEffect(() => {
        getFavorite();
    }, []);

    return (
        <LoveContext.Provider value={{ love, setLove, handleLoveClick, selectedLove, favorites, getFavorite }}>
            {children}
        </LoveContext.Provider>
    );
};

export default LoveProvider;
