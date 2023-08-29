 import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Navbar from "../../../components/Navbar/Navbar";
import Sudoku from "../../../components/Sudoku/Sudoku";

const BigVocab1 = () => {

    const [games, setGames] = useState([]);
    const {user} = useAuthContext();

//kanji = , 大きい, 大した, 大きさ, 大切, 大学, 大人しい

    const unfilledGrid = [
        ['大きい', '', '大切', '', '大した', '大学'],
        ['大した', '大きさ', '', '', '大切', '大人しい'],
        ['大学', '大切', '', '大した', '大きさ', ''],
        ['', '', '大きい', '大学', '', '大切'],
        ['', '', '大きさ', '大人しい', '', ''],
        ['', '大学', '', '', '大きい', '']
    ];

    const correctAnswers = [
        ['大きい', '大人しい', '大切', '大きさ', '大した', '大学'],
        ['大した', '大きさ', '大学', '大きい', '大切', '大人しい'],
        ['大学', '大切', '大人しい', '大した', '大きさ', '大きい'],
        ['大きさ', '大した', '大きい', '大学', '大人しい', '大切'],
        ['大切', '大きい', '大きさ', '大人しい', '大学', '大した'],
        ['大人しい', '大学', '大した', '大切', '大きい', '大きさ']
    ];

    const title = "Big Vocab 1";
    const info = "Below is a kanji sudoku where you need to fill the empty space with the right word containing the person kanji";
    const reference = [
        { kanji: '大きい', hiragana: 'おおきい', romaji: 'ookii', translation: 'big' },
        { kanji: '大した', hiragana: 'たいした', romaji: 'taishita', translation: 'considerable' },
        { kanji: '大きさ', hiragana: 'おおきさ', romaji: 'ookisa', translation: 'size' },
        { kanji: '大切', hiragana: 'たいせつ', romaji: 'taisetsu', translation: 'important' },
        { kanji: '大学', hiragana: 'だいがく', romaji: 'daigaku', translation: 'university' },
        { kanji: '大人しい', hiragana: 'おとなしい', romaji: 'otonashii', translation: 'quiet' },
    ];
    const emptyCount = 17;
    const link = "big-vocab-1";
    const specificClass = "letters_4";

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
                specificClass={specificClass}
            />
        </div>
    )
}

export default BigVocab1;