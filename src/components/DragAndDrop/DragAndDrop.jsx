import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import "./DragAndDrop.scss";
import completedSound from "../../assets/audio/mixkit-instant-win-2021.wav";
import Congratulations from "../Congratulations/Congratulations";

const DragAndDrop = (props) => {

    //Keeps track of the current game is document from the database for the specific user
    const [game, setGame] = useState(null);

    //The answers array contains all given answers
    const [answers, setAnswers] = useState(Array(props.answersLength).fill(""));
    
    //Keeps track of the score
    const [score, setScore] = useState(null);

    //Keeps track of whether the user wants to check the answers by clicking the button
    const [check, setCheck] = useState(false);

    //Keeps track of error messages if there are any
    const [error, setError] = useState(null);

    //Keeps track of whether the resetComponent should be displayed
    // const [resetComponent, setResetComponent] = useState(false);

    //Keeps track of whether the game has been completed woth a perfect score
    const [isCompleted, setIsCompleted] = useState(false);

    //Access the user from the authentication context hook
    const {user} = useAuthContext();

    //Stores the best score from the game document until the current playtrhough
    const bestScore = game ? game.bestScore : 0;

    //Makes use of the useNavigate hook
    const navigate = useNavigate()

    //Updates game to be the current game being played if the games array is available (if there is a user)
    useEffect(() => {

        if (props.games.length > 0) {
            const foundGame = props.games.find(game => game.name === props.gameName);
            if (foundGame) {
                setGame(foundGame);
            }
        }
    }, [props.games, props.gameName]);

    const calculateScore = (newScore) => {
        const totalAnswers = newScore.length;
        const correctCount = newScore.filter(item => item === true).length;

        const correctPercentage = (correctCount / totalAnswers) * 100;

        return correctPercentage
    };

    const handleClick = async (event) => {
        event.preventDefault();
        // setResetComponent(true);
        
        const newScore = answers.map((answer, index) => answer === props.correctAnswers[index]);
        setScore(newScore);
        setCheck(true);
        const isGameCompleted = newScore.every(item => item);
        const finalScore = calculateScore(newScore)

        // Calculate the timePlayed for this playthrough
        const currentTime = new Date();
        const timePlayedInSeconds = Math.floor((currentTime - props.startTime) / 1000); // Convert to seconds

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
                score: finalScore.toFixed(2),
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

            if (finalScore > bestScore) {
                
                // Update the bestScore in the backend
                const response = await fetch(`/api/games/${gameId}`, {
                    method: 'PATCH',
                    body: JSON.stringify({ bestScore: finalScore.toFixed(2) }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                const updatedGame = await response.json();
                console.log("Updated Game:", updatedGame);
            }

            if (isGameCompleted) {
                setIsCompleted(true);

                // Update the completed status in the backend
                const response = await fetch(`/api/games/${gameId}`, {
                    method: 'PATCH',
                    body: JSON.stringify({ completed: isGameCompleted }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                const updatedGame = await response.json();
                console.log("Updated Game:", updatedGame);
            }
        } catch (error) {
            console.error("Error updating game:", error);
        }
    };

    //Reload the page and start a new "playthrough" when clicking on the "Start Over" button
    const handleStartOver = () => {
        window.location.reload();
    };

    // Plays sound effect when a game is completed with a perfect score
    useEffect(() => {
        if (isCompleted) {
            const audio = new Audio(completedSound);
            audio.play();
        }
    }, [isCompleted]);

    const handleDragStart = (event, month) => {
        event.dataTransfer.setData('text/plain', month);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDropContainer = (event, index) => {
        event.preventDefault();

        const draggedMonth = event.dataTransfer.getData('text/plain');
        const newAnswers = [...answers];
        newAnswers[index] = `${draggedMonth}${props.answerAddon}`;
        setAnswers(newAnswers);
    };

    return (
        <div className="months_parent">
            <div className="header">
                <a className="back" href="/drag-and-drop-puzzles">←Back</a>
                <div className="title">
                    <h1>{props.gameName}</h1>
                </div>
                {props.info}
            </div>
            <div className={`word_segments  ${props.specificClass}`}>
                {props.kanji.map((month, index) => (
                    <div
                        key={index}
                        className={`month ${props.specificClass}` + index}
                        draggable={true}
                        onDragStart={(e) => handleDragStart(e, month)}
                        onDragOver={handleDragOver}
                    >
                        {month}
                    </div>
                ))}
            </div>
            <div className="answer_column">
                {Array.from({ length: props.answersLength }, (_, index) => (
                    <div
                        key={index}
                        className={!check ? `input_group ${props.specificClass}` : `input_group answers ${props.specificClass}`}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDropContainer(e, index)}
                    >
                        <label htmlFor={`input_${index + 1}`}>{props.labelValues[index] + ':'}</label>
                        <div
                            className={`answer_box ${props.specificClass} ${check === true ? score !== null && answers[index] === props.correctAnswers[index] ? "correct_answer" : "wrong_answer" : ""}`}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDropContainer(e, index)}
                        >
                            {check === true ? answers[index] === props.correctAnswers[index] ? answers[index] : `${answers[index]} (${props.correctAnswers[index]})` : answers[index]}
                        </div>
                    </div>
                ))}
            </div>
            <div className="submit">
                {check ? (
                    <button onClick={handleStartOver}>Start Over</button>
                ) : (
                    <button onClick={handleClick}>Check</button>
                )}
                {check ? (
                    <button onClick={() => {navigate('/')}}>Home</button>
                ) : null}
            </div>
            {isCompleted && (
                <Congratulations />
            )}
            {check && !isCompleted ? (<div className="score">Score: {calculateScore(answers.map((answer, index) => answer === props.correctAnswers[index])).toFixed(2)}%</div>) : null}
            {error && <div className="error">{error}</div>}
        </div>
    )
}

export default DragAndDrop;  