const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateJwt = (id, name, role) => {
    return jwt.sign(
        {id, name, role},
        process.env.SECRET_KEY,
        {expiresIn: '2h'}
    )
}

class UserController {

    async registration(req, res, next) {
        const {name, password, role} = req.body;

        let user = await User.findOne({name});

        if (user) {
            return next(ApiError.badRequest('User is already exists'));
        }

        user = new User({
            name,
            password,
            role
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        const token = generateJwt(user.id, user.name, user.role);
        return res.json({token})
    }

    async login(req, res, next) {

        const {name, password} = req.body;

        let user = await User.findOne({name});

        if (!user) {
            return next(ApiError.internal('Invalid name'))
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return next(ApiError.internal('Invalid password'))
        }

        const token = generateJwt(user.id, user.name, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({ token })
    }
}

module.exports = new UserController()