import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../../components/Navbar/Navbar";
import WordSearch from "../../components/WordSearch/WordSearch";

const Vegetables = () => {

    const [games, setGames] = useState([]);
    const {user} = useAuthContext();

    const title = "Vegetables";

    const letters = [
        ['に', 'ふ', 'か', 'ぼ', 'ち', 'ゃ', 'と', 'た'],
        ['ん', 'て', 'ざ', 'ぎ', 'ぱ', 'し', 'い', 'ま'],
        ['に', 'ん', 'じ', 'ん', 'て', 'る', 'お', 'ね'],
        ['く', 'さ', 'ゃ', 'ん', 'り', 'も', 'へ', 'ぎ'],
        ['ど', 'き', 'が', 'ら', 'き', 'ゅ', 'う', 'り'],
        ['う', 'の', 'い', 'も', 'の', 'し', 'な', 'ら'],
        ['と', 'う', 'も', 'ろ', 'こ', 'し', 'す', 'ご'],
        ['ぬ', 'じ', 'め', 'も', 'か', 'ち', 'ゃ', 'ね']
    ];

    const correctAnswers = ['にんじん', 'きゅうり', 'じゃがいも', 'たまねぎ', 'にんにく', 'なす', 'かぼちゃ', 'きのこ', 'とうもろこし'];

    const englishTranslation = ['Carrot', 'Cucumber', 'Potato', 'Onion', 'Garlic', 'Eggplant', 'Pumpkin', 'Mushroom', 'Corn'];

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

export default Vegetables;