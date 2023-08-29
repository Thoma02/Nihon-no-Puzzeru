 import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Navbar from "../../../components/Navbar/Navbar";
import Sudoku from "../../../components/Sudoku/Sudoku";

const PersonVocab1 = () => {

    const [games, setGames] = useState([]);
    const {user} = useAuthContext();

//kanji = 大人, 男の人, 女の人, 友人, 一人, 人間

    const unfilledGrid = [
        ['', '男の人', '女の人', '友人', '', '一人'],
        ['', '', '一人', '大人', '', ''],
        ['一人', '女の人', '', '', '大人', ''],
        ['', '大人', '人間', '', '', '友人'],
        ['友人', '人間', '男の人', '女の人', '', '大人'],
        ['', '', '', '人間', '', '男の人']
    ];

    const correctAnswers = [
        ['大人', '男の人', '女の人', '友人', '人間', '一人'],
        ['人間', '友人', '一人', '大人', '男の人', '女の人'],
        ['一人', '女の人', '友人', '男の人', '大人', '人間'],
        ['男の人', '大人', '人間', '一人', '女の人', '友人'],
        ['友人', '人間', '男の人', '女の人', '一人', '大人'],
        ['女の人', '一人', '大人', '人間', '友人', '男の人']
    ];

    const title = "Person Vocab 1";
    const info = "Below is a kanji sudoku where you need to fill the empty space with the right word containing the person kanji";
    const reference = [
        { kanji: '大人', hiragana: 'おとな', romaji: 'otona', translation: 'adult' },
        { kanji: '女の人', hiragana: 'おんなのひと', romaji: 'onna no hito', translation: 'woman' },
        { kanji: '男の人', hiragana: 'おとこのひと', romaji: 'otoko no hito', translation: 'man' },
        { kanji: '友人', hiragana: 'ゆうじん', romaji: 'yūjin', translation: 'friend' },
        { kanji: '一人', hiragana: 'ひとり', romaji: 'hitori', translation: 'alone, one person' },
        { kanji: '人間', hiragana: 'にんげん', romaji: 'ningen', translation: 'human being' },
    ];
    const emptyCount = 17;
    const link = "person-vocab-1";
    const specificClass = "letters_3"

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

export default PersonVocab1;