import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

    const navigate = useNavigate();

    return (
        <div className="games_parent">
            <Navbar />
            <div className="puzzle_grid">
                <div className="sudoku_pages" onClick={() => navigate('/sudoku-puzzles')}>
                    <p>Sudoku Puzzles</p>
                </div>
                <div className="sudoku_pages" onClick={() => navigate('/word-search-puzzles')}>
                    <p>Word Search Puzzles</p>
                </div>
                <div className="sudoku_pages" onClick={() => navigate('/drag-and-drop-puzzles')}>
                    <p>Drag And Drop Puzzles</p>
                </div>
            </div>
        </div>
    )
}

export default HomePage;