const Book = require("../models/Book");
const User = require("../models/User");
const ApiError = require("../error/ApiError");

class BookController {
    async create(req, res, next) {
        try {
            const user = await User.findById(req.params.userId);
            if (!user) {
                return next(ApiError.badRequest('User not found'));
            }

            const book = new Book(req.body);
            await book.save();

            user.inventory.push(book);
            await user.save();
            res.json(book);
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const user = await User.findById(req.params.userId).populate('inventory');
            if (!user) {
                return next(ApiError.badRequest('User not found'));
            }
            res.json(user.inventory);
        } catch (error) {
            next(ApiError.badRequest(error.message))
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
            const user = await User.findById(req.params.userId);
            if (!user) {
                return next(ApiError.badRequest('User not found'));
            }
            const book = await Book.findByIdAndDelete(req.params.bookId);
            if (!book) {
                return next(ApiError.badRequest('Book not found'));
            }
            user.inventory = user.inventory.filter(bookId => bookId.toString() !== req.params.bookId);
            await user.save();
            res.json(book);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async updateById(req, res, next) {
        try {
            const { userId, bookId } = req.params;
            const { title, author, genre, publicationYear, quantityAvailable, price } = req.body;

            const user = await User.findById(userId);
            if (!user) {
                return next(ApiError.badRequest('User not found'));
            }

            let book = await Book.findById(bookId);
            if (!book) {
                return next(ApiError.badRequest('Book not found'));
            }

            book.title = title;
            book.author = author;
            book.genre = genre;
            book.publicationYear = publicationYear;
            book.quantityAvailable = quantityAvailable;
            book.price = price;

            await book.save();

            res.json(book);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

}

module.exports = new BookController()