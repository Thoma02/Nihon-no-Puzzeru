import React from "react";
import { Link } from "react-router-dom";
import "./PuzzleGrid.scss";

const PuzzleGrid = (props) => {

    return (
        <div className="puzzle_grid">
            {props.desiredOrder.map((name, index) => {
                const game = props.sortedGames.find(game => game.name === name);
                const isCompleted = game?.completed;
                const puzzlePreview = props.puzzlePreviews[index]; 

                return (
                    <Link
                        className={`cell ${isCompleted ? "completed" : ""}`}
                        key={index}
                        to={props.routes[index]}
                    >
                        <div className="preview-container">
                            {puzzlePreview && (
                                <img
                                    src={puzzlePreview}
                                    alt={`Preview for Puzzle ${index + 1}`}
                                    className="preview-image"
                                />
                            )}
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default PuzzleGrid;