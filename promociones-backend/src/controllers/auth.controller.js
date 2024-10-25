import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const signup = async (req, res) => {
    try {
        const { nombre, fechaNacimiento, ciudad, cedula, telefono, password } = req.body;

        const userExists = await User.findOne({ cedula });
        if (userExists) {
            return res.status(400).json({ message: 'Usuario ya existe' });
        }

        const user = await User.create({
            nombre,
            fechaNacimiento,
            ciudad,
            cedula,
            telefono,
            password
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                nombre: user.nombre,
                token: generateToken(user._id)
            });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { cedula, password } = req.body;
        const user = await User.findOne({ cedula });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                nombre: user.nombre,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Credenciales inválidas' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

export { signup, login };