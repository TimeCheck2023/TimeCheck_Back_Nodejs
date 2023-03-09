const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    //obtengo el token de las cookies
    const token = req.cookies.jwt
    if (!token) {
        console.log("no hay token");
        return res.status(500).json({ message: 'No se proporcionó un token' })
    }

    try {
        const decoded = jwt.verify(token, 'secret')
        // Verificar que el token no ha expirado
        if (decoded.exp <= Date.now() / 1000) {
            console.log("vencio");
            return res.status(401).json({ message: 'Token caducado' });
        }
        next();
        console.log("exito");
    } catch (error) {
        console.log("token invalido");
        return res.status(401).json({ message: 'Token inválido' });
    }

}

module.exports = {
    authMiddleware
}