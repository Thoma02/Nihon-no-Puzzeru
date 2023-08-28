const express = require('express');
const {
    getGames,
    getGame,
    createGame,
    // createGames,
    deleteGame,
    // deleteGamesForUser,
    updateGame
} = require('../controllers/gameController');
const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

//requie auth for all Game routes
router.use(requireAuth);

//GET all Games
router.get('/', getGames);

//GET a single Game
router.get('/:id', getGame);

//POST a new Game
router.post('/', createGame);

//POST new Games
// router.post('/createGames', createGames);

//DELETE a Game
router.delete('/:id', deleteGame);
// router.delete('/', deleteGamesForUser);

//UPDATE a Game
router.patch('/:id', updateGame);

module.exports = router;