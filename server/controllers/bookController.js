const Book = require("../models/Book");
const User = require("../models/User");
const ApiError = require("../error/ApiError");

class BookController {
    async create(req, res, next) {
        try {
            const book = new Book(req.body);
            await book.save();

            res.json(book);
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const books = await Book.find({});
            res.json(books);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async getById(req, res, next) {
        try {
            const book = await Book.findById(req.params.bookId);
            if (!book) {
                return next(ApiError.badRequest('Book not found'));
            }
            res.json(book);
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async deleteById(req, res, next) {
        try {
            const book = await Book.findByIdAndDelete(req.params.bookId);
            if (!book) {
                return next(ApiError.badRequest('Book not found'));
            }
            res.json(book);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async updateById(req, res, next) {
        try {
            const { bookId } = req.params;
            const { titles, descriptions, author, genre, publicationYear, quantityAvailable, price } = req.body;

            let book = await Book.findById(bookId);
            if (!book) {
                return next(ApiError.badRequest('Book not found'));
            }

            book.titles = titles;
            book.descriptions = descriptions;
            book.author = author;
            book.genre = genre;
            book.publicationYear = publicationYear;
            book.quantityAvailable = quantityAvailable;
            book.price = price;
            book.updatedAt = new Date();

            await book.save();

            res.json(book);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }


}

module.exports = new BookController()