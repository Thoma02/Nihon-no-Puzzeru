import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../../components/Navbar/Navbar";
// import DaysWeek from "../components/4.DaysWeek/DaysWeek";
import Months from "../../components/DragAndDrop/DragAndDrop";

const DaysWeekPage = () => {

    const [games, setGames] = useState([])
    const {user} = useAuthContext()

    const kanji = ['日', '月', '火', '水', '木', '金', '土'];
    const correctAnswers = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];
    const answersLength = 7;
    const gameName = "Days of the Week";
    const info = "Write the days of the week in the appropriate order using the correct kanji and adding '曜日' to the end of each.";
    const labelValues = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    const answerAddon = "曜日";
    const specificClass = "day";
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
                answersLength={answersLength}
            />
        </div>
    )
}

export default DaysWeekPage;