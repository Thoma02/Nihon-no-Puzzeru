const User = require('../models/userModel');
const Game = require('../models/gameModel');
const mongoose = require('mongoose');

//get all decks
const getGames = async (req, res) => {
    const user_id = req.user._id
    const games = await Game.find({ user_id }).sort({createdAt: -1});
    res.status(200).json(games);
}

//get a single deck
const getGame = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such game"})
    }

    const game = await Game.findById(id);

    if(!game) {
        return res.status(404).json({error: "No such game"});
    }

    res.status(200).json(game);
}

//create a new game
const createGame = async (req, res) => {
    const {name, completed, lastScore, bestScore} = req.body;

    //add doc to db
    try {
        const user_id = req.user._id
        const gameObject = await Game.create({name, completed, lastScore, bestScore, user_id})
        res.status(200).json(gameObject);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

//delete Game with Flashcards
const deleteGame = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such game"})
    }

    try {
        // Delete the game
        await Deck.findByIdAndDelete(id);

        res.status(200).json({ message: 'Game deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete game' });
    }
};

// Delete games based on user_id
// const deleteGamesForUser = async (req, res) => {
//     const { user_id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(user_id)) {
//         return res.status(404).json({ error: "Invalid user ID" });
//     }

//     try {
//         // Delete the games matching the user_id
//         const deleteResult = await Game.deleteMany({ user_id });

//         res.status(200).json({ message: `${deleteResult.deletedCount} games deleted` });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to delete games' });
//     }
// };

// module.exports = { deleteGamesForUser };

//update a game
const updateGame = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such game"});
    }

    // const game = await Game.findOneAndUpdate(
    //     { _id: id },
    //     { completed }, // Update only the completed field
    //     { new: true } // Return the updated document
    // );

    const game = await Game.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    if(!game) {
        return res.status(404).json({error: "No such game"});
    }

    res.status(200).json(game);
}

module.exports = {
    getGames,
    getGame,
    createGame,
    // createGames,
    // createInitialGames,
    deleteGame,
    // deleteGamesForUser,
    updateGame
}