'use strict';
const passport = require('../config/passport');
const users = require('../models/users');
const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/signup', (req, res, next) => {
	res.render('user/signup');
});

router.get('/signin', (req, res, next) => {
	res.render('user/signin');
});

router.get('/logout', passport.estaAutenticado, (req, res) => {
	req.logOut();
	res.send('Logout exitoso');
});

/*POST users listing. */
router.post('/signup', (req, res, next) => {
	const nuevoUser = new users({
		nombre: req.body.nombre,
		apellidos: req.body.apellidos,
		email: req.body.email,
		password: req.body.password
	});

	users.findOne({
		email: req.body.email
	}, (err, usuarioExiste) => {
		if (usuarioExiste) {
			return res.status(400).send('Ese Correo ya esta registrado.')
		}
		nuevoUser.save((err) => {
			if (err) {
				next(err);
			}
			req.logIn(nuevoUser, (err) => {
				if (err) {
					next(err);
				}
				res.send('Usuario creado exitosamente.')
			});
		});
	});
});

router.post('/signin', (req, res, next) => {
	passport.authenticate('local', (err, usuario, info) => {
		if (err) {
			next(err);
		}
		if (!usuario) {
			return res.status(400).send('Email o Contraseña invalidasd');
		}

		req.logIn(usuario, (err) => {
			if (err) {
				next(err);
			}
			res.send('Login exitoso');
		});
	})(req, res, next);
});


module.exports = router;