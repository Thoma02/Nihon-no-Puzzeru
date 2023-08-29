 import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Navbar from "../../../components/Navbar/Navbar";
import Sudoku from "../../../components/Sudoku/Sudoku";

const BeginnerKanji1 = () => {

    const [games, setGames] = useState([]);
    const {user} = useAuthContext();

//kanji = 人, 大、入、犬、本、木

    const unfilledGrid = [
        ['大', '入', '木', '', '本', '犬'],
        ['', '', '犬', '', '入', ''],
        ['', '木', '人', '大', '', ''],
        ['犬', '大', '本', '', '木', '人'],
        ['', '本', '', '', '', '入'],
        ['', '', '', '本', '大', '']
    ];

    const correctAnswers = [
        ['大', '入', '木', '人', '本', '犬'],
        ['本', '人', '犬', '木', '入', '大'],
        ['入', '木', '人', '大', '犬', '本'],
        ['犬', '大', '本', '入', '木', '人'],
        ['木', '本', '大', '犬', '人', '入'],
        ['人', '犬', '入', '本', '大', '木']
    ];

    const title = "Beginner Kanji 1";
    const info = "Below is a kanji sudoku where you need to fill the empty space with the right kanji";
    const reference = [
        { kanji: '人', hiragana: 'にん、じん', romaji: 'ひと、と', translation: 'person' },
        { kanji: '大', hiragana: 'たい、だい', romaji: 'おお', translation: 'big' },
        { kanji: '入', hiragana: 'にゅう', romaji: 'はい、い', translation: 'enter' },
        { kanji: '犬', hiragana: 'けん', romaji: 'いぬ', translation: 'dog' },
        { kanji: '本', hiragana: 'ほん', romaji: 'もと', translation: 'book' },
        { kanji: '木', hiragana: 'もく', romaji: 'き、こ', translation: 'tree' },
    ];
    const emptyCount = 17;
    const link = "beginner-kanji-1";

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

export default BeginnerKanji1;