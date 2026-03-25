import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Primero compruebo si ya existe un usuario con ese email.
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: 'Email ya registrado' });

        // La contraseña se cifra en el modelo antes de guardarse.
        const user = await User.create({ name, email, password });

        // Devuelvo un token directamente para no obligar a hacer login otra vez.
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Credenciales incorrectas' });

        // Comparo la contraseña introducida con la almacenada en la BD.
        const valid = await user.comparePassword(password);
        if (!valid) return res.status(400).json({ message: 'Credenciales incorrectas' });

        // Si las credenciales son correctas, genero el JWT para el cliente.
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const profile = async (req, res) => {
    try {
        // Quito la password por seguridad aunque este cifrada.
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
