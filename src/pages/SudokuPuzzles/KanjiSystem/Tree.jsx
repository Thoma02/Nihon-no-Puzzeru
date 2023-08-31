 import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Navbar from "../../../components/Navbar/Navbar";
import Sudoku from "../../../components/Sudoku/Sudoku";

const TreeVocab = () => {

    const [games, setGames] = useState([]);
    const {user} = useAuthContext();

//kanji = 木星, 木材, 木曜日, 木製, 木綿, 苗木

    const unfilledGrid = [
        ['木曜日', '', '木材', '', '木綿', ''],
        ['', '木製', '', '', '', '苗木'],
        ['木材', '', '', '木製', '木曜日', '木星'],
        ['', '', '', '木材', '', '木綿'],
        ['木綿', '', '木星', '', '木製', ''],
        ['苗木', '', '木製', '木綿', '木星', '木材']
    ];

    const correctAnswers = [
        ['木曜日', '苗木', '木材', '木星', '木綿', '木製'],
        ['木星', '木製', '木綿', '木曜日', '木材', '苗木'],
        ['木材', '木綿', '苗木', '木製', '木曜日', '木星'],
        ['木製', '木星', '木曜日', '木材', '苗木', '木綿'],
        ['木綿', '木材', '木星', '苗木', '木製', '木曜日'],
        ['苗木', '木曜日', '木製', '木綿', '木星', '木材']
    ];

    const title = "Tree Vocab";
    const info = "Below is a kanji sudoku where you need to fill the empty space with the right word containing the tree kanji";
    const reference = [
    { kanji: '木星', hiragana: 'もくせい', romaji: 'mokusei', translation: 'Jupiter' },
    { kanji: '木材', hiragana: 'もくざい', romaji: 'mokuzai', translation: 'lumber' },
    { kanji: '木曜日', hiragana: 'もくようび', romaji: 'mokuyoubi', translation: 'Thursday' },
    { kanji: '木製', hiragana: 'もくせい', romaji: 'mokusei', translation: 'wooden' },
    { kanji: '木綿', hiragana: 'もめん', romaji: 'momen', translation: 'cotton' },
    { kanji: '苗木', hiragana: 'なえぎ', romaji: 'naegi', translation: 'seedling' },
];
    const emptyCount = 17;
    const link = "tree-vocab";
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

export default TreeVocab;