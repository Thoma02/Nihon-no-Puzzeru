const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    bestScore: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    playthrough: [
        {
            playNumber: { type: Number },
            score: { type: Number },
            timePlayed: { type: String }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Game', gameSchema);

