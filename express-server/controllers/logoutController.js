export const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        domain: 'localhost'
    });
    res.json({ message: 'Logged out successfully' });
};

import jwt from 'jsonwebtoken';

export const verifyToken = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        res.json({ message: 'Token valid' });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};