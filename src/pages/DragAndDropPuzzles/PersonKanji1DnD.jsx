import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../../components/Navbar/Navbar";
// import DaysWeek from "../components/4.DaysWeek/DaysWeek";
import Months from "../../components/DragAndDrop/DragAndDrop";

const PersonVocab1DnD = () => {

    const [games, setGames] = useState([])
    const {user} = useAuthContext()

    const kanji = ['大人', '男の人', '女の人', '友人', '人間', '一人'];
    const correctAnswers = ['大人', '男の人', '女の人', '友人', '人間', '一人'];
    const gameName = "Person Vocab 1 DnD";
    const info = "Drag the appropriate kanji to its translation";
    const labelValues = [
        "Adult", "Man", "Woman", "Friend", "Human Being", "One Person, Alone"
    ];
    const answerAddon = "";
    const specificClass = "words_6";
    const lettersClass = "letters_3";
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
                lettersClass={lettersClass}
                // answersLength={answersLength}
            />
        </div>
    )
}

export default PersonVocab1DnD;