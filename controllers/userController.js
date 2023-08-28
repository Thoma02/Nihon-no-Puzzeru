const User = require('../models/userModel');
const Game = require('../models/gameModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        //create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// signup
const signupUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.signup(email, password);

        // Create game records for the user
        const gameDataArray = [
            {
                name: "Months",
                completed: false,
                bestScore: 0
            },
            {
                name: "Everyday Objects",
                completed: false,
                bestScore: 0,
            },
            {
                name: "Color Sudoku",
                completed: false,
                bestScore: 0
            },
            {
                name: "Days of the Week",
                completed: false,
                bestScore: 0
            },
            {
                name: "Weather Sudoku",
                completed: false,
                bestScore: 0
            },
            {
                name: "Weather Sudoku 9x9",
                completed: false,
                bestScore: 0
            },
            {
                name: "Animal Sudoku",
                completed: false,
                bestScore: 0
            },
        ];

        const user_id = user._id;

        const createdGames = await Game.insertMany(
            gameDataArray.map(gameData => ({
                ...gameData,
                user_id: user_id,
            }))
        );

        //create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { loginUser, signupUser }