'use stritc';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users = require('../models/users');

passport.serializeUser((usuario, done) => {
    done(null, usuario._id);
});

passport.deserializeUser((id, done) => {
    users.find(id, (err, usuario) => {
        done(err, usuario);
    });
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (email, password, done) => {
    users.findOne({
        email
    }, (err, usuario) => {
        if (!usuario) {
            return done(null, false, {
                message: `Este email ${email} no esta regsitrado`
            });
        } else {
            users.compararPassword(password, (err, sonIguales) => {
                if (sonIguales) {
                    return done(null, usuario);
                } else {
                    return done(null, false, {
                        message: `La contraseña no es validad`
                    });
                }
            });
        }
    });
}));

exports.estaAutenticado = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    };
    res.status(401).send('Tienes que hacer login para acceder a este recurso');
};