import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../../components/Navbar/Navbar";
// import DaysWeek from "../components/4.DaysWeek/DaysWeek";
import Months from "../../components/DragAndDrop/DragAndDrop";

const PersonalPronounsRU = () => {

    const [games, setGames] = useState([])
    const {user} = useAuthContext()

    const kanji = ["моя", "моё", "Мой", "мои"];
    const correctAnswers = ["Мой", "моё", "моя", "мои"];
    const gameName = "Possessive Pronouns RU";
    const info = "Drag the appropriate pronoun to its translation";
    const labelValues = [
        'I', 'you', 'he', 'she', 'it', 'we', 'you (pl.)', 'they'
    ];
    const answerAddon = "";
    const specificClass = "words_8";
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
            <Months 
                games={games} 
                gameName={gameName} 
                info={info} 
                labelValues={labelValues} 
                answerAddon={answerAddon} 
                specificClass={specificClass}
                startTime={startTime} 
                kanji={kanji} 
                correctAnswers={correctAnswers} 
                // answersLength={answersLength}
            />
        </div>
    )
}

export default PersonalPronounsRU;