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
        "Beginner Kanji 1 DnD",
        "Persn Vocab 1 DnD",
    ];

    const sortedGames = games.slice().sort((a, b) => {
        const aIndex = desiredOrder.indexOf(a.name);
        const bIndex = desiredOrder.indexOf(b.name);
        return aIndex - bIndex;
    });

    const routes = [
        "/drag-and-drop-puzzles/months", 
        "/drag-and-drop-puzzles/days-week", 
        "/drag-and-drop-puzzles/beginner-kanji-1-dnd",
        "/drag-and-drop-puzzles/person-vocab-1-dnd"
    ];

    const puzzlePreviews = [
        monthsPreview,
        daysWeekPreview,
    ];

    const kanjis = [
        "",
        "",
        "人, 大、入、犬、本、木",
        "大人, 男の人, 女の人, 友人, 一人, 人間"
    ]

    return (
        <div className="games_parent">
            <Navbar />
            <PuzzleGrid 
                desiredOrder={desiredOrder} 
                sortedGames={sortedGames}
                routes={routes}
                puzzlePreviews={puzzlePreviews}
                kanjis={kanjis}
            />
        </div>
    );
};

export default DragAndDropPage;