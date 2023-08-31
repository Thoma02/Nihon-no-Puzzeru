 import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Navbar from "../../../components/Navbar/Navbar";
import Sudoku from "../../../components/Sudoku/Sudoku";

const EntranceVocab1 = () => {

    const [games, setGames] = useState([]);
    const {user} = useAuthContext();

//kanji = 入り口, 入る, 入力, 入れる, 気に入る, 入学

    const unfilledGrid = [
        ['入る', '入学', '', '', '', '入力'],
        ['', '気に入る', '入れる', '入学', '', ''],
        ['', '入れる', '', '', '', '入り口'],
        ['入り口', '入る', '入学', '入力', '入れる', ''],
        ['', '入り口', '', '', '入力', '入れる'],
        ['', '', '気に入る', '入り口', '', '入学']
    ];

    const correctAnswers = [
        ['入る', '入学', '入り口', '入力', '気に入る', '入力'],
        ['入れる', '気に入る', '入れる', '入学', '入り口', '入る'],
        ['気に入る', '入れる', '入れる', '入る', '入学', '入り口'],
        ['入り口', '入る', '入学', '入力', '入れる', '気に入る'],
        ['入学', '入り口', '入る', '気に入る', '入力', '入れる'],
        ['入力', '入れる', '気に入る', '入り口', '入る', '入学']
    ];

    const title = "Entrance Vocab";
    const info = "Below is a kanji sudoku where you need to fill the empty space with the right word containing the person kanji";
    const reference = [
        { kanji: '入り口', hiragana: 'いりぐち', romaji: 'iriguchi', translation: 'entrance' },
        { kanji: '入る', hiragana: 'はいる', romaji: 'hairu', translation: 'to enter' },
        { kanji: '入力', hiragana: 'にゅうりょく', romaji: 'nyuuryoku', translation: 'input' },
        { kanji: '入れる', hiragana: 'いれる', romaji: 'ireru', translation: 'to put in' },
        { kanji: '気に入る', hiragana: 'きにいる', romaji: 'kiniiru', translation: 'to like' },
        { kanji: '入学', hiragana: 'にゅうがく', romaji: 'nyuugaku', translation: 'admission to school' },
    ];
    const emptyCount = 19;
    const link = "entrance-vocab";
    const specificClass = "letters_4"

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

export default EntranceVocab1;