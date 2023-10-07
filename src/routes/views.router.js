import { Router } from 'express';
import productsModel from "../dao/models/products.model.js";
import requireAuth from "../middleware/auth.js"

const router = Router();

// Ruta protegida: (solo accesible si el usuario no está autenticado)
router.get('/register', (req, res) => {
    if (req.session.user) {
        return res.redirect('/profile'); // Redirige al usuario autenticado a su perfil si intenta acceder al 'register'
    }
    res.render('register');
});

// Ruta protegida: (solo accesible si el usuario no está autenticado)
router.get('/login', (req, res) => {
    if (req.session.user) {
        return res.redirect('/profile'); // Redirige al usuario autenticado a su perfil si intenta acceder al 'login'
    }
    res.render('login');
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
});

router.get('/', (req, res) => {
    res.render('login', {
        user: req.session.user
    });
})

router.get('/home', (req, res) => {
    res.render('home', {
        user: req.session.user
    });
})

// Ruta requiere estar autenticado
router.get('/profile', requireAuth, (req, res) => {
    res.render('profile', {
        user: req.session.user
    });
})

// Ruta requiere estar autenticado
router.get('/products', requireAuth, async (req, res) => {
    const { page = 1 } = req.query;
    const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await productsModel.paginate({}, { limit: 8, page, lean: true });
    const products = docs;
    res.render('products', {
        user: req.session.user,
        products,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage
    });
})

export default router;