 import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Navbar from "../../../components/Navbar/Navbar";
import Sudoku from "../../../components/Sudoku/Sudoku";

const BookVocab = () => {

    const [games, setGames] = useState([]);
    const {user} = useAuthContext();

//kanji = 日本, 日本語, 本当, 本当に, 本来, 本気

    const unfilledGrid = [
        ['', '', '日本', '', '', '本来'],
        ['', '本当', '本来', '本気', '日本', '本当に'],
        ['', '日本', '', '日本語', '', ''],
        ['', '日本語', '', '本来', '本当に', ''],
        ['本当に', '本気', '本当', '', '', '日本語'],
        ['', '', '日本語', '', '本気', '本当']
    ];

    const correctAnswers = [
        ['本気', '本当に', '日本', '本当', '日本語', '本来'],
        ['日本語', '本当', '本来', '本気', '日本', '本当に'],
        ['本来', '日本', '本当に', '日本語', '本当', '本気'],
        ['本当', '日本語', '本気', '本来', '本当に', '日本'],
        ['本当に', '本気', '本当', '日本', '本来', '日本語'],
        ['日本', '本来', '日本語', '本当に', '本気', '本当']
    ];

    const title = "Book Vocab";
    const info = "Below is a kanji sudoku where you need to fill the empty space with the right word containing the tree kanji";
    const reference = [
        { kanji: '日本', hiragana: 'にほん', romaji: 'nihon', translation: 'Japan' },
        { kanji: '日本語', hiragana: 'にほんご', romaji: 'nihongo', translation: 'Japanese language' },
        { kanji: '本当', hiragana: 'ほんとう', romaji: 'hontou', translation: 'truth' },
        { kanji: '本当に', hiragana: 'ほんとうに', romaji: 'hontouni', translation: 'really' },
        { kanji: '本来', hiragana: 'ほんらい', romaji: 'honrai', translation: 'originally' },
        { kanji: '本気', hiragana: 'ほんき', romaji: 'honki', translation: 'seriousness' },
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

export default BookVocab;