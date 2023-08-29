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
        "Big Vocab 1",
        "Tree Vocab",
        "Dog Vocab",
        "Book Vocab"
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
        "/sudoku-puzzles/big-vocab-1",
        "/sudoku-puzzles/tree-vocab",
        "/sudoku-puzzles/dog-vocab",
        "/sudoku-puzzles/book-vocab"
    ];

    const puzzlePreviews = [
        colorSudokuPreview,
        weatherSudokuPreview,
        weatherSudoku9x9Preview,
        AnimalSudokuPreview
    ];

    const kanjis = [
        "",
        "",
        "",
        "",
        "一、二、三、四、五、六、七、八、九",
        "人, 大、入、犬、本、木",
        "大人, 男の人, 女の人, 友人, 一人, 人間",
        "人々, 外国人, 日本人, 隣人, 人口, 二人",
        "入り口, 入る, 入力, 入れる, 気に入る, 入学",
        "大きい, 大した, 大きさ, 大切, 大学, 大人しい",
        "木星, 木材, 木曜日, 木製, 木綿, 苗木",
        "子犬, 負け犬, 雄犬, 雌犬, 猟犬, 柴犬",
        "日本, 日本語, 本当, 本当に, 本来, 本気"
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

export default SudokuPage;