const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');

module.exports.authUser = async (req, res, next) => {
    // Safely extract token from cookies or headers
    const authHeader = req.headers.authorization;
    const token = req.cookies.token || (authHeader && authHeader.startsWith("bearer ") && authHeader.split(" ")[1]);

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token: token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid authentication token' });
    }
};
module.exports.authCaptain = async (req, res, next) => {
    // Safely extract token from cookies or headers
    const authHeader = req.headers.authorization;
    const token = req.cookies.token || (authHeader && authHeader.startsWith("bearer ") && authHeader.split(" ")[1]);
    console.log("Token:", token);
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token: token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);

        if (!captain) {
            return res.status(401).json({ message: 'Captain not found' });
        }

        req.captain = captain;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid authentication token' });
    }
}
