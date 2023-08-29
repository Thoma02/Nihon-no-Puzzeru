 import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Navbar from "../../../components/Navbar/Navbar";
import Sudoku from "../../../components/Sudoku/Sudoku";

const DogVocab = () => {

    const [games, setGames] = useState([]);
    const {user} = useAuthContext();

//kanji = 子犬, 負け犬, 雄犬, 雌犬, 猟犬, 柴犬

    const unfilledGrid = [
        ['負け犬', '子犬', '雄犬', '', '', '雌犬'],
        ['', '', '', '負け犬', '', '雄犬'],
        ['', '', '柴犬', '', '猟犬', ''],
        ['雄犬', '', '子犬', '雌犬', '負け犬', ''],
        ['柴犬', '', '', '', '雌犬', '猟犬'],
        ['子犬', '', '猟犬', '柴犬', '', '']
    ];

    const correctAnswers = [
        ['負け犬', '子犬', '雄犬', '猟犬', '柴犬', '雌犬'],
        ['猟犬', '柴犬', '雌犬', '負け犬', '子犬', '雄犬'],
        ['雌犬', '負け犬', '柴犬', '雄犬', '猟犬', '子犬'],
        ['雄犬', '猟犬', '子犬', '雌犬', '負け犬', '柴犬'],
        ['柴犬', '雄犬', '負け犬', '子犬', '雌犬', '猟犬'],
        ['子犬', '雌犬', '猟犬', '柴犬', '雄犬', '負け犬']
    ];

    const title = "Dog Vocab";
    const info = "Below is a kanji sudoku where you need to fill the empty space with the right word containing the tree kanji";
    const reference = [
    { kanji: '子犬', hiragana: 'こいぬ', romaji: 'koinu', translation: 'puppy' },
    { kanji: '負け犬', hiragana: 'まけいぬ', romaji: 'makeinu', translation: 'loser' },
    { kanji: '雄犬', hiragana: 'おすいぬ', romaji: 'osuinu', translation: 'male dog' },
    { kanji: '雌犬', hiragana: 'めすいぬ', romaji: 'mesuinu', translation: 'female dog' },
    { kanji: '猟犬', hiragana: 'りょうけん', romaji: 'ryouken', translation: 'hunting dog' },
    { kanji: '柴犬', hiragana: 'しばいぬ', romaji: 'shibainu', translation: 'Shiba Inu' }
];
    const emptyCount = 18;
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

export default DogVocab;