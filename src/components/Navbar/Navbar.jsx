import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./Navbar.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const [clicked, setClicked] = useState(false);
    const navigate = useNavigate();

    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleLogOut = () => {
        logout()
    }

    const handleClick = () => {
        setClicked(!clicked);
    };

    return (
        <nav>
            <Link to='/'>
                <h1>Nihon no Puzzeru Master</h1>
            </Link>
            <div onClick={handleClick} className={`burger_menu ${clicked ? 'clicked' : ''}`}>
                <div className="line top"></div>
                <div className="line middle"></div>
                <div className="line bottom"></div>
            </div>
            {user && (
                <div className={`user_container loged_in ${clicked ? 'clicked' : ''}`}>
                    <div className="sudoku_pages small" onClick={() => navigate('/sudoku-puzzles')}>
                        <p>Sudoku Puzzles</p>
                    </div>
                    <div className="sudoku_pages small" onClick={() => navigate('/word-search-puzzles')}>
                        <p>Word Search Puzzles</p>
                    </div>
                    <div className="sudoku_pages small" onClick={() => navigate('/drag-and-drop-puzzles')}>
                        <p>Drag And Drop Puzzles</p>
                    </div>
                    <span>{user.email}</span>
                    <button className="logout" onClick={handleLogOut}>Log out</button>
                </div>
            )}
            {!user && (
                <div className={`user_container loged_out ${clicked ? 'clicked' : ''}`}>    
                    <div className="sudoku_pages small" onClick={() => navigate('/sudoku-puzzles')}>
                        <p>Sudoku Puzzles</p>
                    </div>
                    <div className="sudoku_pages small" onClick={() => navigate('/word-search-puzzles')}>
                        <p>Word Search Puzzles</p>
                    </div>
                    <div className="sudoku_pages small" onClick={() => navigate('/drag-and-drop-puzzles')}>
                        <p>Drag And Drop Puzzles</p>
                    </div>
                    <Link to={'/login'}>Login</Link>
                    <Link to={'/signup'}>Signup</Link>
                </div>
            )}
        </nav>
    )
}

export default Navbar;