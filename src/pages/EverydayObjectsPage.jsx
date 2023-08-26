import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "../components/Navbar/Navbar";
import EverydayObjects from "../components/WordSearch/WordSearch";

const WordSearch = () => {

    const [games, setGames] = useState([]);
    const {user} = useAuthContext();

    let startTime = new Date();

    useEffect(() => {
        const fetchGames = async () => {
            const response = await fetch('/api/games', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok) {
                setGames(json)
                console.log(json)
            }
        } 

        if(user) {
            fetchGames()
        }
    }, [user])

    return (
        <div className="games_parent">
            <Navbar />
            <EverydayObjects games={games} startTime={startTime}/>
        </div>
    )
}

export default WordSearch;