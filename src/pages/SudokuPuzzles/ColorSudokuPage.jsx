import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../../components/Navbar/Navbar";
import Sudoku from "../../components/Sudoku/Sudoku";

const ColorSudokuPage = () => {

    const [games, setGames] = useState([]);
    const {user} = useAuthContext();

    const unfilledGrid = [
        ['', '白', '', '', '緑', ''],
        ['', '', '黄色', '赤', '青', '白'],
        ['', '', '赤', '白', '黒', '緑'],
        ['白', '黒', '', '黄色', '赤', ''],
        ['', '黄色', '黒', '青', '', '赤'],
        ['', '', '白', '', '黄色', '黒']
    ];

    const correctAnswers = [
        ['赤', '白', '青', '黒', '緑', '黄色'],
        ['黒', '緑', '黄色', '赤', '青', '白'],
        ['黄色', '青', '赤', '白', '黒', '緑'],
        ['白', '黒', '緑', '黄色', '赤', '青'],
        ['緑', '黄色', '黒', '青', '白', '赤'],
        ['青', '赤', '白', '緑', '黄色', '黒']
    ];

    const title = "Color Sudoku";
    const info = "Below is a kanji sudoku where you need to fill the empty space with the right color";
    const reference = "Refrence: red - 赤 (あか/aka), yellow - 黄色 (きいろ/kiiro), blue - 青 (あお/ao), green - 緑 (みどり/midori), black - 黒 (くろ/kuro), white - 白 (しろ/shiro)";
    const emptyCount = 15;
    const link = "color-sudoku";

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
            <Sudoku 
                games={games} 
                startTime={startTime} 
                unfilledGrid={unfilledGrid} 
                correctAnswers={correctAnswers}
                title={title}
                info={info}
                reference={reference}
                emptyCount={emptyCount}
                link={link}
            />
        </div>
    )
}

export default ColorSudokuPage;