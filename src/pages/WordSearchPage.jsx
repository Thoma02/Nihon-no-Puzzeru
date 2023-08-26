import React from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import everydayObjectsPreview from "../assets/previewImages/everyday-objects.svg";
import Navbar from "../components/Navbar/Navbar";
import PuzzleGrid from "../components/PuzzleGrid/PuzzleGrid";

const WordSearchPage = () => {

    const [games, setGames] = useState([])
    const {user} = useAuthContext()

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

    const desiredOrder = [
        "Everyday Objects", 
    ];

    const sortedGames = games.slice().sort((a, b) => {
        const aIndex = desiredOrder.indexOf(a.name);
        const bIndex = desiredOrder.indexOf(b.name);
        return aIndex - bIndex;
    });

    const routes = [
        "/word-search-puzzles/everyday-objects",  
    ];

    const puzzlePreviews = [
        everydayObjectsPreview,
    ];

    return (
        <div className="games_parent">
            <Navbar />
            <PuzzleGrid 
                desiredOrder={desiredOrder} 
                sortedGames={sortedGames}
                routes={routes}
                puzzlePreviews={puzzlePreviews}
            />
        </div>
    );
};

export default WordSearchPage;