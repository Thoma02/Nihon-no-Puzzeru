import React from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "../components/Navbar/Navbar";
import monthsPreview from "../assets/previewImages/months-dnd.svg";
import daysWeekPreview from "../assets/previewImages/days-week.svg";
import PuzzleGrid from "../components/PuzzleGrid/PuzzleGrid";


const DragAndDropPage = () => {

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
        "Months",  
        "Days of the Week", 
    ];

    const sortedGames = games.slice().sort((a, b) => {
        const aIndex = desiredOrder.indexOf(a.name);
        const bIndex = desiredOrder.indexOf(b.name);
        return aIndex - bIndex;
    });

    const routes = [
        "/drag-and-drop-puzzles/months", 
        "/drag-and-drop-puzzles/days-week", 
    ];

    const puzzlePreviews = [
        monthsPreview,
        daysWeekPreview,
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

export default DragAndDropPage;