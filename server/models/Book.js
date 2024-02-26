const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    titles: {
        type: Map,
        of: String,
        required: true
    },
    descriptions: {
        type: Map,
        of: String,
        required: true
    },
    pictures: [{
        type: String,
        required: true
    }],
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    publicationYear: {
        type: Number,
        required: true
    },
    quantityAvailable: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    deletedAt: {
        type: Date,
        default: null
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
