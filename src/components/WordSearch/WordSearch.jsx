import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./WordSearch.scss";
import { useCallback } from "react";
import completedSound from "../../assets/audio/mixkit-instant-win-2021.wav";
import Congratulations from "../Congratulations/Congratulations";

const WordSearch = ({ games, startTime }) => {

    const [game, setGame] = useState(null)

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

    const colors = [
        "#fee15a", "#fccd7a", "#f9c0a0", "#f18992", "#ea99c7",
        "#cbe59c", "#9be0ba", "#99c9ef", "#9fb0fa", "#c7a3da",
        "#ebebeb", "#b6b6b6"
    ];

    const [score, setScore] = useState(0);
    const [current, setCurrent] = useState("");
    const [currentColorIndex, setCurrentColorIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [isCompleted, setIsCompleted] = useState(false);
    const [resetComponent, setResetComponent] = useState(false);
    const [error, setError] = useState(null)
    const {user} = useAuthContext();
    const bestScore = game ? game.bestScore : 0;

    useEffect(() => {

        if (games.length > 0) {
            const foundGame = games.find(game => game.name === "Everyday Objects");
            if (foundGame) {
                setGame(foundGame);
            }
        }
    }, [games]);

    const handleCellClick = async (event, letter) => {
        if (event.button === 0) { //left mouse button click
            event.preventDefault();
            setCurrent(current + letter); //Append the selected letter to current
            const word = current + letter
            if (correctAnswers.includes(word) && !selectedAnswers.includes(word)) {
                setScore(score + 1); //Update the score
                setSelectedAnswers([...selectedAnswers, word]); // Add the selected answer
                setCurrent(""); // Reset the current selected letters
                setCurrentColorIndex((currentColorIndex + 1) % colors.length); // Change color index
            }
            event.target.style.backgroundColor = colors[currentColorIndex];
            if (!user) {
                setError('The game is score wouldn"t be saved unless you are a registered user');
                return;
            }
        } else if (event.button === 2) { //right mouse button click
            event.preventDefault();
            setCurrent(current.slice(0, -1));
            event.target.style.backgroundColor = "#fff";
        }
    };

    // eslint-disable-next-line
    const updateGame = useCallback(async () => {
        try {
            if (game) {
                const gameId = game._id;

                if (score > bestScore) {
                    
                    // Update the bestScore in the backend
                    const response = await fetch(`/api/games/${gameId}`, {
                        method: 'PATCH',
                        body: JSON.stringify({ bestScore: score.toFixed(2) }),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${user.token}`
                        }
                    });

                    const updatedGame = await response.json();
                    console.log("Updated Game:", updatedGame);
                }

                if (isCompleted) {
                    // Update the completed status in the backend
                    const response = await fetch(`/api/games/${gameId}`, {
                        method: 'PATCH',
                        body: JSON.stringify({ completed: isCompleted }),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${user.token}`
                        }
                    });

                    const updatedGame = await response.json();
                    console.log("Updated Game:", updatedGame);
                }
            }
        } catch (error) {
            console.error("Error updating game:", error);
        }
    });


    useEffect(() => {
        
        if(user) {
            updateGame();
        }
    }, [updateGame, user]);


    const handleClick = async () => {
        
        setResetComponent(true)
        
        if(selectedAnswers.length === 10) {
            setIsCompleted(true);
        }

        // Calculate the timePlayed for this playthrough
        const currentTime = new Date();
        const timePlayedInSeconds = Math.floor((currentTime - startTime) / 1000); // Convert to seconds

        // Convert timePlayed to "MM:SS" format
        const minutes = Math.floor(timePlayedInSeconds / 60);
        const seconds = timePlayedInSeconds % 60;
        const formattedTimePlayed = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

        if (!user) {
            setError('The game is score wouldn"t be saved unless you are a registered user');
            return
        }

        try {
            const gameId = game._id;

             // Create a new entry for the timesPlayed array
            const newPlaythrough = {
                playNumber: game.playthrough ? game.playthrough.length + 1 : 1,
                score: ((score / 10) * 100).toFixed(2),
                timePlayed: formattedTimePlayed
            };

            // Update the timesPlayed array and game
            const updatedTimesPlayed = [...game.playthrough, newPlaythrough];

            const response = await fetch(`/api/games/${gameId}`, {
                    method: 'PATCH',
                    body: JSON.stringify({ 
                        playthrough: updatedTimesPlayed
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                });
    
            const updatedGame = await response.json();
            console.log("Updated Game:", updatedGame);
        } catch (error) {
            console.error("Error updating game:", error);
        }
    }

    const handleStartOver = () => {
        window.location.reload();
    }

    useEffect(() => {
        // Play sound when congratulation message is shown
        if (isCompleted) {
            const audio = new Audio(completedSound);
            audio.play();
        }
    }, [isCompleted]);

    return (
        <div className="things_parent">
            <div className="header">
                <a className="back" href="/drag-and-drop-puzzles">←Back</a>
                <div className="title">
                    <h1>Everyday objects</h1>
                </div>
                <p>Can you find these ten objects in the grid?</p>
                <ul>
                    {correctAnswers.map((word, index) => (
                            <li key={index} className={selectedAnswers.includes(word) ? "found" : ""}>
                                <b>{englishTranslation[index]}</b>
                            </li>
                    ))}
                </ul>
            </div>
            {letters.map((row, rowIndex) => (
                <div className="row" key={rowIndex}>
                    {row.map((letter, columnIndex) => (
                        <div
                            className={`cell`}
                            key={columnIndex}
                            onClick={(event) => handleCellClick(event, letter)}
                            onContextMenu={(event) => handleCellClick(event, letter)}
                        >
                            {letter}
                        </div>
                    ))}
                </div>
            ))}
            <div className="current">
                Currently selected:{" "}
                {current.split("").map((letter, index) => (
                    <span
                        key={index}
                        style={{ color: colors[index % colors.length] }} // Assign a unique color based on index
                    >
                        {letter}
                    </span>
                ))}
            </div>
            <div className="submit">
                {resetComponent ? (
                    <button onClick={handleStartOver}>Start Over</button>
                ) : (
                    <button onClick={handleClick}>Check</button>
                )}
            </div>
            {isCompleted && (
                <Congratulations />
            )}
            {resetComponent && !isCompleted ? (<div className="score">Score: {((score / 10) * 100)}%</div>) : null}
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default WordSearch;