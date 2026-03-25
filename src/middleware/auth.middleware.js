import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    // El token se espera en la cabecera Authorization con formato Bearer.
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No autorizado' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Guardo el usuario decodificado para reutilizarlo en la ruta protegida.
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ message: 'Token inválido' });
    }
};
