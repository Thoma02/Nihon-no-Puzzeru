import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../../components/Navbar/Navbar";
import Sudoku from "../../components/Sudoku/Sudoku";

const WeatherSudoku9x9 = () => {

    const [games, setGames] = useState([]);
    const {user} = useAuthContext();
    // kanji - 天気、雨、雪、曇り、晴れ、霧、風、暑い、寒い

     const unfilledGrid = [
        ['', '', '雪', '', '', '曇り', '', '晴れ', '暑い'],
        ['', '寒い', '', '暑い', '雪', '', '雨', '', '風'],
        ['天気', '', '暑い', '', '', '風', '', '', '寒い'],
        ['', '曇り', '', '', '風', '', '晴れ', '暑い', ''],
        ['霧', '', '', '天気', '', '', '', '雨', '曇り'],
        ['寒い', '', '晴れ', '雨', '', '霧', '', '', ''],
        ['', '霧', '', '', '暑い', '', '天気', '', ''],
        ['', '風', '雨', '', '寒い', '', '', '霧', '雪'],
        ['', '天気', '', '晴れ', '', '雪', '', '寒い', '']
    ];

    const correctAnswers = [
        ['風', '雨', '雪', '寒い', '天気', '曇り', '霧', '晴れ', '暑い'],
        ['曇り', '寒い', '霧', '暑い', '雪', '晴れ', '雨', '天気', '風'],
        ['天気', '晴れ', '暑い', '霧', '雨', '風', '曇り', '雪', '寒い'],
        ['雨', '曇り', '天気', '雪', '風', '寒い', '晴れ', '暑い', '霧'],
        ['霧', '雪', '風', '天気', '晴れ', '暑い', '寒い', '雨', '曇り'],
        ['寒い', '暑い', '晴れ', '雨', '曇り', '霧', '雪', '風', '天気'],
        ['雪', '霧', '寒い', '風', '暑い', '雨', '天気', '曇り', '晴れ'],
        ['晴れ', '風', '雨', '曇り', '寒い', '天気', '暑い', '霧', '雪'],
        ['暑い', '天気', '曇り', '晴れ', '霧', '雪', '風', '寒い', '雨']
    ];

    const title = "Weather Sudoku 9x9";
    const info = "Below is a kanji sudoku where you need to fill the empty space with the right color";
    const reference = [
        { kanji: '天気', hiragana: 'てんき', romaji: 'tenki', translation: 'weather' },
        { kanji: '雨', hiragana: 'あめ', romaji: 'ame', translation: 'rain' },
        { kanji: '雪', hiragana: 'ゆき', romaji: 'yuki', translation: 'snow' },
        { kanji: '曇り', hiragana: 'くもり', romaji: 'kumori', translation: 'cloudy' },
        { kanji: '晴れ', hiragana: 'はれ', romaji: 'hare', translation: 'sunny' },
        { kanji: '霧', hiragana: 'きり', romaji: 'kiri', translation: 'fog' },
        { kanji: '風', hiragana: 'かぜ', romaji: 'kaze', translation: 'wind' },
        { kanji: '暑い', hiragana: 'あつい', romaji: 'atsui', translation: 'hot' },
        { kanji: '寒い', hiragana: 'さむい', romaji: 'samui', translation: 'cold' },
    ];
    const emptyCount = 44;
    const link = "weather-sudoku-9x9";
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
                info={info}
                reference={reference}
                emptyCount={emptyCount}
                link={link}
                specificClass={specificClass}
            />
        </div>
    )
}

export default WeatherSudoku9x9;