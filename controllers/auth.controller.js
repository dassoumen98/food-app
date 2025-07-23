import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export let registerController = async (req, res) => {
    try {
        let { username, email, password, phone, address } = req.body;
        console.log(username, email, password, phone, address);

        // Validation
        if (!username || !email || !password || !phone || !address) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all fields'
            });
        }

        // Check if user already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: 'Email already registered, please login'
            });
        }
        // Hash password
        const salt = bcrypt.genSaltSync(10);
        const hashpassword =await bcrypt.hash(password, salt);


        // Create new user
        let newUser = await User.create({ username, email, password:hashpassword, phone, address });

        res.status(201).send({
            success: true,
            message: 'User registered successfully',
            user: newUser
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};


export let loginController = async (req, res) => {
    try {
        let { email, password } = req.body;
        // Validation
        if (!email ||!password) {
            return res.status(400).send({
                success: false,
                message: 'Please provide email and password'
            });
        }
        // Check if user exists
        let user =await User.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }

        // Check password
        let isMatch =await bcrypt.compare(password,user.password)
        if(!isMatch){
         return res.status(401).send({
                success: false,
                message: 'Invalid password'
            });  // If password does not match, send unauthorized response

        }
        // If password matches, send success response with user data
        user.password = undefined;  // Remove password from user object before sending it
    
        let token =jwt.sign({id:user.id,username:user.username},process.env.JWT_SECRET,{expiresIn:'1d'});
        res.status(200).send({
            success: true,
            message: 'User logged in successfully',
            token:token,
            user: user
        })


    }
    catch(error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}
