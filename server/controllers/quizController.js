const Quiz = require("../models/Quiz");
const User = require("../models/User");
const ApiError = require("../error/ApiError");

class QuizController {
    async create(req, res, next) {
        try {
            const quiz = new Quiz(req.body);
            await quiz.save();

            res.json(quiz);
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const quiz = await Quiz.find({}).lean();

            res.json(quiz);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

}

module.exports = new QuizController()