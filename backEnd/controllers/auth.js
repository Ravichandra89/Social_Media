import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.model';

export const register = async(req, res) => {
    try {
        const{
            firstName,
            lastName,
            email,
            password,
            pictureUrl,
            friends,
            location,
            occupation,
        } = req.body;

        // Logic to register user by hash password

        const SaltRounds = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, SaltRounds);

        // Update the password field
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            pictureUrl,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10),
        });

        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(500).json({error : err.message});
    }
};

// Login the users

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Find in the User DataBase
        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({msg: "User does not exist."});
        }

        // Match the password
        const isSame = await bcrypt.compare(password, user.password);
        if(!isSame) return res.status(400).json({msg: "Invalid Credentials."});

        // Generate the token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token, user});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}