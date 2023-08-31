import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../../components/Navbar/Navbar";
import WordSearch from "../../components/WordSearch/WordSearch";

const EverydayObjects = () => {

    const [games, setGames] = useState([]);
    const {user} = useAuthContext();

    const title = "Everyday Objects";

    const letters = [
        ['か', 'さ', 'じ', 'う', 'て', 'ん'],
        ['ば', 'あ', 'て', 'と', 'け', 'い'],
        ['ん', 'ぺ', 'ん', 'し', 'り', 'ほ'],
        ['な', 'さ', 'し', 'ん', 'ぶ', 'ん'],
        ['く', 'い', 'ゃ', 'ぶ', 'ま', 'お'],
        ['つ', 'ふ', 'る', 'ぼ', 'う', 'し']
    ];

    const correctAnswers = ['かさ', 'かばん', 'くつ', 'さいふ', 'じてんしゃ', 'しんぶん', 'とけい', 'ぺん', 'ぼうし', 'ほん'];

    const englishTranslation = ['umbrella', 'bag', 'shoes', 'wallet', 'bike', 'newspaper', 'clock', 'pen', 'hat', 'book'];

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

export default EverydayObjects;