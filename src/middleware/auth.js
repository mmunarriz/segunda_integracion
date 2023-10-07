// Middleware de autenticación para verificar si el usuario está autenticado. 
const requireAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login'); // Redirige al usuario a la página de 'login' si no está autenticado.
    }
    next(); // Continúa con la siguiente función de middleware si el usuario está autenticado.
};

export default requireAuth;
