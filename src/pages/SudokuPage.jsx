import React from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import colorSudokuPreview from "../assets/previewImages/color-sudoku.svg";
import weatherSudokuPreview from "../assets/previewImages/weather-sudoku.svg"
import weatherSudoku9x9Preview from "../assets/previewImages/weather-sudoku-9x9.svg";
import AnimalSudokuPreview from "../assets/previewImages/animal-sudoku.svg";
import Navbar from "../components/Navbar/Navbar";
import PuzzleGrid from "../components/PuzzleGrid/PuzzleGrid";

const SudokuPage = () => {

    const [games, setGames] = useState([])
    // const [currentIndex, setCurrentIndex] = useState(0);
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
        "Color Sudoku", 
        "Weather Sudoku",
        "Weather Sudoku 9x9",
        "Animal Sudoku",
        "Numbers Sudoku",
        "Beginner Kanji 1",
        "Person Vocab 1",
        "Person Vocab 2",
        "Entrance Vocab 1",
        "Big Vocab 1"
    ];

    const sortedGames = games.slice().sort((a, b) => {
        const aIndex = desiredOrder.indexOf(a.name);
        const bIndex = desiredOrder.indexOf(b.name);
        return aIndex - bIndex;
    });

    const routes = [
        "/sudoku-puzzles/color-sudoku",
        "/sudoku-puzzles/weather-sudoku",
        "/sudoku-puzzles/weather-sudoku-9x9",
        "/sudoku-puzzles/animal-sudoku",
        "/sudoku-puzzles/numbers-sudoku",
        "/sudoku-puzzles/beginner-kanji-1",
        "/sudoku-puzzles/person-vocab-1",
        "/sudoku-puzzles/person-vocab-2",
        "/sudoku-puzzles/entrance-vocab-1",
        "/sudoku-puzzles/big-vocab-1"
    ];

    const puzzlePreviews = [
        colorSudokuPreview,
        weatherSudokuPreview,
        weatherSudoku9x9Preview,
        AnimalSudokuPreview
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

export default SudokuPage;