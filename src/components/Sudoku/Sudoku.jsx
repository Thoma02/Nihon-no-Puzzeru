import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sudoku.scss";
import completedSound from "../../assets/audio/mixkit-instant-win-2021.wav";
import Congratulations from "../Congratulations/Congratulations";
import { sudokuPuzzles } from "../../assets/info/gameLists";

const Sudoku = (props) => {
    const location = useLocation(); // Get the current location
    const currentRouteIndex = sudokuPuzzles.indexOf(location.pathname);

    const [game, setGame] = useState(null);
    const [correctCount, setCorrectCount] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [resetComponent, setResetComponent] = useState(false);
    // const emptyCount = 15;
    const [error, setError] = useState(null);
    const {user} = useAuthContext();
    const bestScore = game ? game.bestScore : 0;
    const navigate = useNavigate();

    const navigateTo = (index, direction) => {
        let targetIndex;

        if (direction === "previous") {
            targetIndex = index === 0 ? sudokuPuzzles.length - 1 : index - 1;
        } else if (direction === "next") {
            targetIndex = index === sudokuPuzzles.length - 1 ? 0 : index + 1;
        }

        navigate(sudokuPuzzles[targetIndex]);
        console.log("Navigating to:", sudokuPuzzles[targetIndex]);
    };

    const handlePrevious = () => {
        navigateTo(currentRouteIndex, "previous");
    };

    const handleNext = () => {
        navigateTo(currentRouteIndex, "next");
    };

    useEffect(() => {

        // Update the game state when games data changes
        if (props.games.length > 0) {
            const foundGame = props.games.find(game => game.name === props.title);
            if (foundGame) {
                setGame(foundGame);
            }
        }
    }, [props.games, props.title]);

    const [userAnswers, setUserAnswers] = useState(props.unfilledGrid.map(row => row.map(() => "")));
    const [colors, setColors] = useState(props.unfilledGrid.map(row => row.map(() => "")));

    const compareAnswers = async () => {
        let newCorrectCount = correctCount;
        const newColors = props.unfilledGrid.map((row, rowIndex) =>
            row.map((letter, columnIndex) => {
                if (letter === '') {
                    const isCorrect = userAnswers[rowIndex][columnIndex] === props.correctAnswers[rowIndex][columnIndex];
                    if (isCorrect) {
                        newCorrectCount++;
                    }
                    return isCorrect ? "green" : "red";
                }
                return 'black'; // Replace with the appropriate default color class
            })
        );
        setColors(newColors);       
        setCorrectCount(newCorrectCount);

        // Calculate the score as a percentage
        const scorePercentage = (newCorrectCount / props.emptyCount) * 100;
        if(scorePercentage === 100) {
            setIsCompleted(true);
        }
        setResetComponent(true);

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
                score: scorePercentage.toFixed(2),
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

            if (scorePercentage > bestScore) {
                
                // Update the bestScore in the backend
                const response = await fetch(`/api/games/${gameId}`, {
                    method: 'PATCH',
                    body: JSON.stringify({ bestScore: scorePercentage.toFixed(2) }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                const updatedGame = await response.json();
                console.log("Updated Game:", updatedGame);
            }

            if (scorePercentage === 100) {
                // Update the completed status in the backend
                const response = await fetch(`/api/games/${gameId}`, {
                    method: 'PATCH',
                    body: JSON.stringify({ completed: true }),
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

    useEffect(() => {
        // Play sound when congratulation message is shown
        if (isCompleted) {
            const audio = new Audio(completedSound);
            audio.play();
        }
    }, [isCompleted]);

    
    const handleStartOver = () => {
        window.location.reload();
        // navigate(`/${props.link}`);
    }

    return (
        <div className={`color_sudoku_parent ${props.specificClass}`}>
            <div className="header">
                {/* <a className="back" href="/sudoku-puzzles">←Back</a> */}
                <h1>{props.title}</h1>
                <p>{props.info}</p>
                {/* <p>{props.reference}</p> */}
                <div className="reference">
                    <table>
                        <thead>
                            <tr>
                                <th>Kanji</th>
                                <th>Hiragana</th>
                                <th>Romaji</th>
                                <th>Translation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.reference.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.kanji}</td>
                                    <td>{item.hiragana}</td>
                                    <td>{item.romaji}</td>
                                    <td>{item.translation}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="color_sudoku">
                {props.unfilledGrid.map((row, rowIndex) => (
                    <div className="row" key={rowIndex}>
                        {row.map((letter, columnIndex) => (
                            <div
                                key={columnIndex}
                                className={`sudoku_cell ${letter !== '' ? 'empty-cell' : ''} ${props.specificClass}`}
                            >
                                {letter}
                                {letter === '' ? (
                                    <textarea 
                                        value={userAnswers[rowIndex][columnIndex]}
                                        onChange={(e) => {
                                                const newAnswers = [...userAnswers];
                                                newAnswers[rowIndex][columnIndex] = e.target.value;
                                                setUserAnswers(newAnswers);
                                        }}
                                        style={{ 
                                            color: colors[rowIndex][columnIndex], 
                                        }}
                                    /> 
                                ) : null}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="submit">
                {resetComponent ? (
                    <button onClick={handleStartOver}>Start Over</button>
                ) : (
                    <button onClick={compareAnswers}>Check</button>
                )}
                <div className="navigate_games">
                    <button onClick={handlePrevious}>Previous</button>
                    <button className="games_grid_link" onClick={() => {navigate('/sudoku-puzzles')}}>
                        <div className="white_line"></div>
                        <div className="white_line"></div>
                        <div className="white_line"></div>
                    </button>
                    <button onClick={handleNext}>Next</button>
                </div>
            </div>
                {resetComponent && !isCompleted ? 
                    <div className="score">
                        <p>Score: {correctCount} / {props.emptyCount}</p>
                    </div> 
                : null}
            {isCompleted && (
                <Congratulations />
            )}
            {error && <div className="error">{error}</div>}
        </div>
    )
}

export default Sudoku;

//rot - 赤, yellow - 黄色, blau - 青, grün - 緑, schwarz - 黒, weiss - 白