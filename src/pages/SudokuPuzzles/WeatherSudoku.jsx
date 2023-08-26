import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../../components/Navbar/Navbar";
import Sudoku from "../../components/Sudoku/Sudoku";

const WeatherSudoku = () => {

    const [games, setGames] = useState([]);
    const {user} = useAuthContext();
    // kanji - 雨、雪、曇り、晴れ、暑い、寒い

    const unfilledGrid = [
        ['曇り', '', '雨', '', '暑い', ''],
        ['晴れ', '', '', '曇り', '雨', ''],
        ['', '寒い', '暑い', '', '', '曇り'],
        ['雪', '', '晴れ', '', '', ''],
        ['寒い', '', '雪', '', '', ''],
        ['', '', '', '寒い', '雪', '雨']
    ];

    const correctAnswers = [
        ['曇り', '雪', '雨', '晴れ', '暑い', '寒い'],
        ['晴れ', '暑い', '寒い', '曇り', '雨', '雪'],
        ['雨', '寒い', '暑い', '雪', '晴れ', '曇り'],
        ['雪', '曇り', '晴れ', '雨', '寒い', '暑い'],
        ['寒い', '雨', '雪', '暑い', '曇り', '晴れ'],
        ['暑い', '晴れ', '曇り', '寒い', '雪', '雨']
    ];

    const title = "Weather Sudoku";
    const info = "Below is a kanji sudoku where you need to fill the empty space with the right color";
    const reference = "Refrence: weather - rain - 雨 (あめ/ame), snow - 雪 (ゆき/yuki), cloudy - 曇り (くもり/kumori), sunny - 晴れ (はれ/hare), hot - 暑い (あつい/atsui), cold - 寒い (さむい/samui) ";
    const emptyCount = 20;
    const link = "weather-sudoku";
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

export default WeatherSudoku;