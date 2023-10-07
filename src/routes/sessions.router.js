import { Router } from "express";
import passport from "passport";

const router = Router();

router.post('/login', passport.authenticate('login', { failureRedirect: '/failLogin' }), async (req, res) => {
    if (!req.user) {
        return res.status(401).send({ status: "error", error: "Credenciales invalidas" });
    }
    delete req.user.password;
    // console.log(req.user)
    req.session.user = {
        name: `${req.user.first_name} ${req.user.last_name}`,
        email: req.user.email,
        rol: req.user.role
    }
    res.send({ status: "success", payload: req.session.user })
})

router.get('/failLogin', (req, res) => {
    console.log("Entrando en failLogin");
    res.send({ error: "Fallo el login" })
})

router.post('/register', passport.authenticate('register', { failureRedirect: '/failRegister' }), async (req, res) => {
    if (!req.user) {
        return res.status(401).send({ status: "error", error: "El usuario ya existe" });
    }
    res.status(200).json({ status: "success", message: "Usuario registrado correctamente" });
})

router.get('/failRegister', async (req, res) => {
    console.log("Fallo la estrategia");
    res.send({ error: "Fallo el registro" });
})

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { })

router.get('/githubCallback', passport.authenticate('github', { failureRedirect: '/loginFailed' }), async (req, res) => {
    // req.session.user = req.user;
    req.session.user = {
        name: `${req.user.email} - Github`,
        email: `${req.user.email} - (username)`,
        rol: req.user.role
    }

    res.redirect('/products')
})

router.get('/current', passport.authenticate('login'), (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({ status: "success", payload: req.session.user });
    } else {
        res.status(401).json({ status: "error", error: "No hay sesión de usuario actual" });
    }
});


export default router;