 import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../../components/Navbar/Navbar";
import Sudoku from "../../components/Sudoku/Sudoku";

const AnimalSudokuPage = () => {

    const [games, setGames] = useState([]);
    const {user} = useAuthContext();

    const unfilledGrid = [
        ['', '', '犬', '猫', '', '鳥'],
        ['', '猫', '鳥', '', '', ''],
        ['', '犬', '鼠', '', '馬', ''],
        ['', '魚', '', '鳥', '鼠', '犬'],
        ['犬', '鳥', '魚', '鼠', '猫', ''],
        ['鼠', '', '猫', '', '鳥', '魚']
    ];

    const correctAnswers = [
        ['馬', '鼠', '犬', '猫', '魚', '鳥'],
        ['魚', '猫', '鳥', '馬', '犬', '鼠'],
        ['鳥', '犬', '鼠', '魚', '馬', '猫'],
        ['猫', '魚', '馬', '鳥', '鼠', '犬'],
        ['犬', '鳥', '魚', '鼠', '猫', '馬'],
        ['鼠', '馬', '猫', '犬', '鳥', '魚']
    ];

    const title = "Animal Sudoku";
    const info = "Below is a kanji sudoku where you need to fill the empty space with the right animal kanji";
    const reference = [
        { kanji: '犬', hiragana: 'いぬ', romaji: 'inu', translation: 'dog' },
        { kanji: '猫', hiragana: 'ねこ', romaji: 'neko', translation: 'cat' },
        { kanji: '鳥', hiragana: 'とり', romaji: 'tori', translation: 'bird' },
        { kanji: '馬', hiragana: 'うま', romaji: 'uma', translation: 'horse' },
        { kanji: '鼠', hiragana: 'ねずみ', romaji: 'nezumi', translation: 'mouse' },
        { kanji: '魚', hiragana: 'さかな', romaji: 'sakana', translation: 'fish' },
    ];
    const emptyCount = 15;
    const link = "animal-sudoku";

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

export default AnimalSudokuPage;