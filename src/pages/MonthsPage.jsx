import React, {useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "../components/Navbar/Navbar";
import DragAndDrop from "../components/DragAndDrop/DragAndDrop";

const MonthsPage = () => {

    const [games, setGames] = useState([])
    const {user} = useAuthContext()

    const kanji = ['一', '二', '三', '四', '五', '六', '七', '八', '九' , '十', '十一', '十二'];
    const correctAnswers = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月' , '十月', '十一月', '十二月'];
    const answersLength = 12;
    const gameName = "Months";
    const info = (
        <div>
            Drag each kanji representing a 'number' to its corresponding month. The kanji for 'month, moon' (月) will be automatically added.
            <br />
            <br />
            <strong>Side note:</strong> If you wish to change your answer, simply place the other chosen kanji on top of your previous answer, and it will be replaced.
        </div>
    );
    const labelValues = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const answerAddon = "月";
    const specificClass = "month";

    // const [answers, setAnswers] = useState(Array(12).fill(""));
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
            <DragAndDrop 
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

export default MonthsPage;