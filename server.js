const express = require('express');
const bodyParser = require('body-parser');
const mongoDb = require('./data/database');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const app = express();
const port = process.env.port || 3000;

app
    .use(bodyParser.json())
    .use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Controll-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Z-key, Authorization' 
        );
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    })
    .use(cors({methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
    .use(cors({origin: '*'}))
    .use('/', require('./routes'));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(acccessToken, refreshToken, profile, done) {
    return done(null, profile); 
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `cuaght exception: ${err}\n` + `Exception Origin: ${origin}\n`);
});

mongoDb.initDb((err)=> {
    if(err) {
        console.error(err);
    } else {
        app.listen(port, () => console.log(`Datadase Listening and node running on port: ${port}`));
    }
});