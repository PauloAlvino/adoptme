const jwt = require('jsonwebtoken')
const User = require('../models/User');

const getUserByToken = async (token) => {
    if(!token) {
        return
    }
    const decoded = await jwt.verify(token, 'mysecret');
    const user = await User.findById(decoded.id);
    return user
}
module.exports = getUserByToken