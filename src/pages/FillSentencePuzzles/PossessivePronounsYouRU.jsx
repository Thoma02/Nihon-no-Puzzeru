import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../../components/Navbar/Navbar";
// import DaysWeek from "../components/4.DaysWeek/DaysWeek";
// import Months from "../../components/DragAndDrop/DragAndDrop";
import FillSentence from "../../components/FillSentence/FillSentence";

const PossessivePronounsRU = () => {

    const [games, setGames] = useState([])
    const {user} = useAuthContext()

    const words = ["моя", "моё", "Мой", "мои"];
    const correctAnswers = ["твой", "моё", "моя", "мои"];
    const gameName = "Possessive Pronouns RU";
    const info = "Fill in the sentences with the appropriate pronoun";
     const sentences = [
        'Вот я сразу увидел твой потенциал.',
        'Так это твоя была идея - меня с ней свести?',
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
                // answerAddon={answerAddon} 
                // specificClass={specificClass}
                startTime={startTime} 
                words={words} 
                correctAnswers={correctAnswers} 
                // answersLength={answersLength}
            />
        </div>
    )
}

export default PossessivePronounsRU;