import jwt from 'jsonwebtoken';

exports.createAccessToken = async (payload) => {
    const token = await jwt.sign({ payload }, 'xyz123', {
        expiresIn: '1d'
    })
    return token;
}

exports.verifyAccessToken = async (token) => {
    const payloadDecoded = await jwt.verify(token, 'xyz123');
    return payloadDecoded;
}