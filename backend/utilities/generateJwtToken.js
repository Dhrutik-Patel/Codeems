import jwt from 'jsonwebtoken';

const generateJwtToken = (res, userID) => {
    const token = jwt.sign({ _id: userID }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    // Send the token in a HTTP-only cookie
    const cookieOptions = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        httpOnly: true, // Prevents client side JS from reading the cookie
        secure: process.env.NODE_ENV === 'production' ? true : false, // Cookie will be sent with HTTPS only
        sameSite: 'strict', // Cookie will only be sent in a first-party context and not be sent along with requests initiated by third party websites
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    };

    res.cookie('jwt', token, cookieOptions);
};

export default generateJwtToken;
