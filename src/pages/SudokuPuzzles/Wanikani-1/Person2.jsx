 import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Navbar from "../../../components/Navbar/Navbar";
import Sudoku from "../../../components/Sudoku/Sudoku";

const PersonVocab2 = () => {

    const [games, setGames] = useState([]);
    const {user} = useAuthContext();

//kanji = 人々, 外国人, 日本人, 隣人, 人口, 二人

    const unfilledGrid = [
        ['外国人', '', '', '人口', '', ''],
        ['日本人', '二人', '', '', '外国人', ''],
        ['', '人々', '', '日本人', '', ''],
        ['', '', '日本人', '', '人口', '人々'],
        ['人々', '', '', '隣人', '日本人', '二人'],
        ['二人', '', '隣人', '外国人', '', '']
    ];

    const correctAnswers = [
        ['外国人', '隣人', '人々', '人口', '二人', '日本人'],
        ['日本人', '二人', '人口', '人々', '外国人', '隣人'],
        ['人口', '人々', '二人', '日本人', '隣人', '外国人'],
        ['隣人', '外国人', '日本人', '二人', '人口', '人々'],
        ['人々', '人口', '外国人', '隣人', '日本人', '二人'],
        ['二人', '日本人', '隣人', '外国人', '人々', '人口']
    ];

    const title = "Person Vocab 2";
    const info = "Below is a kanji sudoku where you need to fill the empty space with the right word containing the person kanji";
    const reference = [
        { kanji: '人々', hiragana: 'ひとびと', romaji: 'hitobito', translation: 'people' },
        { kanji: '外国人', hiragana: 'がいこくじん', romaji: 'gaikokujin', translation: 'foreigner' },
        { kanji: '日本人', hiragana: 'にほんじん', romaji: 'nihonjin', translation: 'Japanese person' },
        { kanji: '隣人', hiragana: 'りんじん', romaji: 'rinjin', translation: 'neighbor' },
        { kanji: '人口', hiragana: 'じんこう', romaji: 'jinkou', translation: 'population' },
        { kanji: '二人', hiragana: 'ふたり', romaji: 'futari', translation: 'two people' },
    ];
    const emptyCount = 19;
    const link = "person-vocab-2";
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

export default PersonVocab2;