import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../../components/Navbar/Navbar";
import WordSearch from "../../components/WordSearch/WordSearch";

const Fruits = () => {

    const [games, setGames] = useState([]);
    const {user} = useAuthContext();

    const title = "Fruits";

    const letters = [
        ['ね', 'ら', 'ぜ', 'け', 'ん', 'な'],
        ['く', 'す', 'い', 'か', 'ぱ', 'し'],
        ['づ', 'い', 'ち', 'ご', 'ふ', 'ほ'],
        ['ぶ', 'さ', 'じ', 'ん', 'り', 'も'],
        ['ど', 'さ', 'く', 'ら', 'ん', 'ぼ'],
        ['う', 'め', 'も', 'も', 'ご', 'し']
    ];

    const correctAnswers = ['りんご', 'いちご', 'すいか', 'ぶどう', 'もも', 'なし', 'さくらんぼ', 'うめ', 'いちじく'];

    const englishTranslation = ['Apple ', 'Strawberry', 'Watermelon', 'Grapes ', 'Peach ', 'Pear', 'Cherry', 'Plum', 'Fig'];

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

export default Fruits;