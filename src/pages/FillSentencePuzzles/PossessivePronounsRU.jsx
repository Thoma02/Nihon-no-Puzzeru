import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../../components/Navbar/Navbar";
import FillSentence from "../../components/FillSentence/FillSentence";

const PossessivePronounsRU = () => {

    const [games, setGames] = useState([])
    const {user} = useAuthContext()

    const words = ["моя", "моё", "Мой", "мои"];
    const correctAnswers = ["Мой", "моё", "моя", "мои"];
    const gameName = "Possessive Pronouns RU";
    const info = "Fill in the sentences with the appropriate pronoun";
     const sentences = [
        'Вот познакомься. Мой шеф-повар Елена.',
        'Это моё блюдо. Шеф, это моя вина.',
        'Судьба вознаградила меня за мои старания.'
    ];
    // const answerAddon = "";
    // const specificClass = "words_8";
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
            <FillSentence 
                games={games} 
                gameName={gameName} 
                info={info} 
                sentences={sentences} 
                startTime={startTime} 
                words={words} 
                correctAnswers={correctAnswers} 
            />
        </div>
    )
}

export default PossessivePronounsRU;