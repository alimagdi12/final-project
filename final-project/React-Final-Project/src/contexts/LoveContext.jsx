import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import UserContext from './UserContext';

export const LoveContext = createContext();

const LoveProvider = ({ children }) => {
    const [love, setLove] = useState(0);
    const [selectedLove, setSelectedLove] = useState([]);
    const [favorites, setFavorites] = useState([]);
const {userData} = useContext(UserContext)


    useEffect(() => {
        getFavorite()
    }, [])

    const getFavorite = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/v1/auth/favorites", {
                headers: {
                    "Content-Type": "application/json",
                    jwt: localStorage.getItem("token"),
                },
            });
            setFavorites(response.data.result);
            setLove(response.data.result.length)
            setSelectedLove(response.data.result.map(product => product._id));
        } catch (error) {
            setFavorites([])
            setLove([])
            setSelectedLove([])
            console.error("Error fetching favorites:", error);
        }
    };

    const handleLoveClick = async (product) => {
        const token = localStorage.getItem('token')
                if(token){
                    
        try {
            if (selectedLove.includes(product._id)) {
                //    console.log('hambozo');
                const response = await axios.delete("http://localhost:3000/api/v1/auth/remove-favorite", {
                    headers: {
                        "Content-Type": "application/json",
                        jwt: localStorage.getItem('token')
                    },
                    data: {
                        productId: product._id
                    }
                });
                setSelectedLove(selectedLove.filter(id => id.toString() !== product._id.toString()));
                setLove(love - 1);
            } else {
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
    }
    else{
toast.error('you must login first')
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
