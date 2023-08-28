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
    const reference = [
        { kanji: '赤', hiragana: 'あか', romaji: 'aka', translation: 'red' },
        { kanji: '黄色', hiragana: 'きいろ', romaji: 'kiiro', translation: 'yellow' },
        { kanji: '青', hiragana: 'あお', romaji: 'ao', translation: 'blue' },
        { kanji: '緑', hiragana: 'みどり', romaji: 'midori', translation: 'green' },
        { kanji: '黒', hiragana: 'くろ', romaji: 'kuro', translation: 'black' },
        { kanji: '白', hiragana: 'しろ', romaji: 'shiro', translation: 'white' },
    ];
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