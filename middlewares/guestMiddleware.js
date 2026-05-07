function guestMiddleware(req, res, next) {

    if (req.session.user) {
        return res.redirect('/perfil');
    }

    next();
}

module.exports = guestMiddleware;