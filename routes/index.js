const passport = require('passport');
const router = require('express').Router();

router.use('/', require('./swagger'));

router.use('/monsters', require('./monsters'));
router.use('/builds', require('./builds'));
router.use('/weapons', require('./weapons'));
router.use('/skills', require('./skills'));

router.get('/', (req, res) => res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : `Logged Out`));

router.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
(req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});

router.get('/login', passport.authenticate('github'), (req, res) => { console.table(req.session.user); console.table(res); });

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if(err) {
            return next(err);
        }
        res.redirect('/');
    });
});

module.exports = router;