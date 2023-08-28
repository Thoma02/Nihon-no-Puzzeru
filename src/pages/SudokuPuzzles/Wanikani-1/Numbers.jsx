 import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Navbar from "../../../components/Navbar/Navbar";
import Sudoku from "../../../components/Sudoku/Sudoku";

const NumbersSudokuPage = () => {

    const [games, setGames] = useState([]);
    const {user} = useAuthContext();

     const unfilledGrid = [
        ['七', '', '', '', '八', '五', '三', '', ''],
        ['三', '', '五', '', '六', '四', '', '九', '一'],
        ['四', '', '六', '', '', '', '', '', '七'],
        ['', '四', '', '三', '', '', '六', '', '九'],
        ['九', '三', '八', '', '一', '', '二', '五', '四'],
        ['五', '', '', '', '二', '九', '', '三', '八'],
        ['', '五', '三', '', '七', '', '', '', '二'],
        ['', '七', '一', '五', '', '', '九', '', '三'],
        ['二', '九', '四', '八', '三', '六', '', '', '五']
    ];

    const correctAnswers = [
        ['七', '一', '九', '二', '八', '五', '三', '四', '六'],
        ['三', '二', '五', '七', '六', '四', '八', '九', '一'],
        ['四', '八', '六', '一', '九', '三', '五', '二', '七'],
        ['一', '四', '二', '三', '五', '八', '六', '七', '九'],
        ['九', '三', '八', '六', '一', '七', '二', '五', '四'],
        ['五', '六', '七', '四', '二', '九', '一', '三', '八'],
        ['八', '五', '三', '九', '七', '一', '四', '六', '二'],
        ['六', '七', '一', '五', '四', '二', '九', '八', '三'],
        ['二', '九', '四', '八', '三', '六', '七', '一', '五']
    ];

    const title = "Numbers Sudoku";
    const info = "Below is a kanji sudoku where you need to fill the empty space with the right number kanji";
    const reference = [
        { kanji: '一', hiragana: 'いち', romaji: 'ichi', translation: 'one' },
        { kanji: '二', hiragana: 'に', romaji: 'ni', translation: 'two' },
        { kanji: '三', hiragana: 'さん', romaji: 'san', translation: 'three' },
        { kanji: '四', hiragana: 'し', romaji: 'shi', translation: 'four' },
        { kanji: '五', hiragana: 'ご', romaji: 'go', translation: 'five' },
        { kanji: '六', hiragana: 'ろく', romaji: 'roku', translation: 'six' },
        { kanji: '七', hiragana: 'しち', romaji: 'shichi', translation: 'seven' },
        { kanji: '八', hiragana: 'はち', romaji: 'hachi', translation: 'eight' },
        { kanji: '九', hiragana: 'きゅう', romaji: 'kyuu', translation: 'nine' },
    ];
    const emptyCount = 37;
    const link = "numbers-sudoku";
    const specificClass = "weather";

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
                specificClass={specificClass}
                info={info}
                reference={reference}
                emptyCount={emptyCount}
                link={link}
            />
        </div>
    )
}

export default NumbersSudokuPage;