import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import "../DragAndDrop/DragAndDrop.scss";
import completedSound from "../../assets/audio/mixkit-instant-win-2021.wav";
import Congratulations from "../Congratulations/Congratulations";
import { dragAndDropPuzzles } from "../../assets/info/gameLists";

const FillSentence = (props) => {
    console.log(props.answersLength)

    const location = useLocation(); // Get the current location
    const currentRouteIndex = dragAndDropPuzzles.indexOf(location.pathname);

    //Keeps track of the current game is document from the database for the specific user
    const [game, setGame] = useState(null);

    //The answers array contains all given answers
    const [answers, setAnswers] = useState(Array(props.correctAnswers.length).fill(""));
    // const [answers, setAnswers] = useState({});
    
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

    const navigateTo = (index, direction) => {
        let targetIndex;

        if (direction === "previous") {
            console.log(index === 0)
            targetIndex = index === 0 ? dragAndDropPuzzles.length - 1 : index - 1;
            console.log(targetIndex)
        } else if (direction === "next") {
            targetIndex = index === dragAndDropPuzzles.length - 1 ? 0 : index + 1;
            console.log(targetIndex)
        }

        navigate(dragAndDropPuzzles[targetIndex]);
        console.log("Navigating to:", dragAndDropPuzzles[targetIndex]);
    };

    const handlePrevious = () => {
        navigateTo(currentRouteIndex, "previous");
    };

    const handleNext = () => {
        navigateTo(currentRouteIndex, "next");
    };

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
        console.log(answers)
        console.log(props.correctAnswers)
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

    const handleDragStart = (event, word) => {
        event.dataTransfer.setData('text/plain', word);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDropContainer = (event, inputIndex) => {
        event.preventDefault();

        const draggedWord = event.dataTransfer.getData('text/plain');
        const newAnswers = [...answers];
        newAnswers[inputIndex] = draggedWord;
        console.log(answers)
        setAnswers(newAnswers);
    };

    let inputIndex = 0;

    return (
        <div className="fill_sentence_parent">
            <div className="header">
                <div className="title">
                    <h1>{props.gameName}</h1>
                </div>
                {props.info}
            </div>
            <div className={`drag_elements__relative_parent`}>
                {props.words.map((word, index) => (
                    <div
                        key={index}
                        className={`drag_elements_relative`}
                        draggable={true}
                        onDragStart={(e) => handleDragStart(e, word)}
                        onDragOver={handleDragOver}
                    >
                        {word}
                    </div>
                ))}
            </div>
            <div className="answer_column">
                {props.sentences.map((sentence, sentenceIndex) => {

                    return (
                        <div
                            key={sentenceIndex}
                            className={!check ? `input_group` : `input_group answers`}
                            onDragOver={handleDragOver}
                        >
                            <div key={sentenceIndex} className="answer_container">
                                {sentence.split(' ').map((word, wordIndex) => {
                                    if (props.words.includes(word)) {
                                        const currentIndex = inputIndex;
                                        inputIndex++;

                                        return (
                                            <div
                                                key={wordIndex}
                                                className={`answer_box empty ${check === true ? score !== null && answers[currentIndex] === props.correctAnswers[currentIndex] ? "correct_answer" : "wrong_answer" : ""}`}
                                                onDragOver={handleDragOver}
                                                onDrop={(e) => handleDropContainer(e, currentIndex)}
                                            >
                                                {check === true ? answers[currentIndex] === props.correctAnswers[currentIndex] ? answers[currentIndex] : `${answers[currentIndex]} (${props.correctAnswers[currentIndex]})` : answers[currentIndex]}
                                            </div>
                                        );
                                    } else {
                                        return <span key={wordIndex}>{word} </span>;
                                    }
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="submit">
                {check ? (
                    <button onClick={handleStartOver}>Start Over</button>
                ) : (
                    <button onClick={handleClick}>Check</button>
                )}
                <div className="navigate_games">
                    <button onClick={handlePrevious}>Previous</button>
                    <button className="games_grid_link" onClick={() => {navigate('/drag-and-drop-puzzles')}}>
                        <div className="white_line"></div>
                        <div className="white_line"></div>
                        <div className="white_line"></div>
                    </button>
                    <button onClick={handleNext}>Next</button>
                </div>
            </div>
            {isCompleted && (
                <Congratulations />
            )}
            {check && !isCompleted ? (<div className="score">Score: {calculateScore(answers.map((answer, index) => answer === props.correctAnswers[index])).toFixed(2)}%</div>) : null}
            {error && <div className="error">{error}</div>}
        </div>
    )
}

export default FillSentence;  