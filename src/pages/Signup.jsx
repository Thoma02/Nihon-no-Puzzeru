import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useNavigate } from 'react-router-dom'
import Navbar from "../components/Navbar/Navbar";
import "../components/Navbar/Navbar.scss";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, error, isLoading } = useSignup();
    const navigate = useNavigate();

    // console.log(error)
    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(email, password);

        if (!isLoading && error) {
            navigate('/login');
        }
    };

    return (
        <div className="games_parent">
            <Navbar />
            <form className="signup" onSubmit={handleSubmit}>
                <h3>Sign up</h3>
                <label htmlFor="">Email: </label>
                <input 
                    type="email" 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email}
                />
                <label htmlFor="">Password: </label>
                <input 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password}
                />
                <button disabled={isLoading}>Sign up</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default Signup;