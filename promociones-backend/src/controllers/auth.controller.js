// src/controllers/auth.controller.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Controlador para registrar un nuevo usuario
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "El usuario ya existe" });

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 12);

        // Crear un nuevo usuario y guardarlo
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Usuario registrado con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al registrar el usuario" });
    }
};

// Controlador para iniciar sesión
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Verificar si el usuario existe
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        // Comparar la contraseña ingresada con la almacenada
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Credenciales incorrectas" });

        // Crear un token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: "Inicio de sesión exitoso", token });
    } catch (error) {
        res.status(500).json({ message: "Error al iniciar sesión" });
    }
};

