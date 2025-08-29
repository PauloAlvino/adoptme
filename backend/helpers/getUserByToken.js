const jwt = require('jsonwebtoken')
const User = require('../models/User');

const getUserByToken = async (token) => {
    if(!token) {
        return
    }
    const decoded = jwt.verify(token, 'mysecret');
    const user = await User.findById(decoded.id).select('-password');
    return user
}
module.exports = getUserByToken