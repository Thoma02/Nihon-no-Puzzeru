import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../../components/Navbar/Navbar";
import WordSearch from "../../components/WordSearch/WordSearch";

const Foods = () => {

    const [games, setGames] = useState([]);
    const {user} = useAuthContext();

    const title = "Foods";

    const letters = [
        ['チ', 'ョ', 'コ', 'レ', 'ー', 'ト', 'カ', 'ネ'],
        ['マ', 'ヒ', 'ー', 'ケ', 'ジ', 'テ', 'ベ', 'ト'],
        ['サ', 'ツ', 'ヒ', 'サ', 'ュ', 'リ', 'ホ', 'ケ'],
        ['ン', 'ラ', 'ー', 'テ', 'ー', 'ダ', 'ん', 'ー'],
        ['ド', 'ー', 'ナ', 'ツ', 'ス', 'テ', 'ー', 'キ'],
        ['イ', 'パ', 'フ', 'ル', 'ス', 'ヌ', 'メ', 'チ'],
        ['ッ', 'リ', 'ハ', 'ン', 'バ', 'ー', 'ガ', 'ー'],
        ['チ', 'フ', 'ラ', 'ー', 'メ', 'ン', 'し', 'ズ']
    ];
    const correctAnswers = ['チョコレート', 'ラーメン', 'ドーナツ', 'ジュース', 'チーズ', 'ハンバーガー', 'ステーキ', 'ケーキ', 'コーヒー', 'サンドイッチ'];

    const englishTranslation = ['chocolate', 'ramen', 'donut', 'juice', 'cheese', 'hamburger', 'steak', 'cake', 'coffee', 'sandwich'];

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
            <WordSearch games={games} startTime={startTime} title={title} letters={letters} correctAnswers={correctAnswers} englishTranslation={englishTranslation}/>
        </div>
    )
}

export default Foods;