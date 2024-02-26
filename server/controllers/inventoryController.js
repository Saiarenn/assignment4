const Book = require("../models/Book");
const User = require("../models/User");
const ApiError = require("../error/ApiError");

class InventoryController {
    async addBook(req, res, next) {
        try {
            const { userId, bookId } = req.params;

            const user = await User.findById(userId);
            if (!user) {
                return next(ApiError.badRequest('User not found'));
            }

            const book = await Book.findById(bookId);
            if (!book) {
                return next(ApiError.badRequest('Book not found'));
            }

            if (user.inventory.includes(bookId)) {
                return next(ApiError.badRequest('Book already exists in the user\'s inventory'));
            }

            user.inventory.push(bookId);
            await user.save();

            res.json({ message: 'Book added to the user\'s inventory successfully' });
        } catch (error) {
            next(ApiError.badRequest(error.message));
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

    async removeById(req, res, next) {
        try {
            const { userId, bookId } = req.params;

            const user = await User.findById(userId);
            if (!user) {
                return next(ApiError.badRequest('User not found'));
            }

            const index = user.inventory.indexOf(bookId);
            if (index === -1) {
                return next(ApiError.badRequest('Book not found in user\'s inventory'));
            }

            user.inventory.splice(index, 1);
            await user.save();

            res.json({ message: 'Book removed from user\'s inventory successfully' });
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }
}

module.exports = new InventoryController()