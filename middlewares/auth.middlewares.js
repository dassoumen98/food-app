import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const authMiddleware = (req, res, next) => {
    
    let token = req.headers['authorization'].split(' ')[1];
    console.log(token);
    // Check if token is provided
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        else{
            req.user = decoded;
            console.log(req.user);
            
            console.log('User is authenticated');
            // req.user will contain the user data in the request object, so you can use it in your routes.
            // Example: req.user.id, req.user.email, etc.
        }
        
        next();
    });

}