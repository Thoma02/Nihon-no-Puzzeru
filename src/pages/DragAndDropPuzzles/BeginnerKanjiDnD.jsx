import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../../components/Navbar/Navbar";
// import DaysWeek from "../components/4.DaysWeek/DaysWeek";
import Months from "../../components/DragAndDrop/DragAndDrop";

const BeginnerKanji1DnD = () => {

    const [games, setGames] = useState([])
    const {user} = useAuthContext()

    const kanji = ['大', '入', '木', '人', '本', '犬'];
    const correctAnswers = ['人', '大', '入', '木', '本', '犬'];
    const gameName = "Beginner Kanji 1 DnD";
    const info = "Drag the appropriate kanji to its translation";
    const labelValues = [
        "Person", "Big", "Enter", "Tree", "Book", "Dog"
    ];
    const answerAddon = "";
    const specificClass = "words_6";
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

export default BeginnerKanji1DnD;