import { useState } from "react"
import { useLogin } from "../hooks/useLogin";
import Navbar from "../components/Navbar/Navbar";

const Login = (visible) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
        <div className="games_parent">
            <Navbar />
            <form className={`login ${visible ? "visible" : "hidden"}`} onSubmit={handleSubmit}>
                <h3>Login</h3>
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
                <button disabled={isLoading}>Login</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default Login;