import path from 'path';
import express from 'express';
import sass from 'express-sass-middleware';
import passport from 'passport';
import GitHubStrategy from 'passport-github2';
import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import session from 'express-session';
import SequelizeSessionInit from 'connect-session-sequelize';
import apis from './lib/apis';

dotenv.config();

// SEQUELIZE SETTINGS & MODELS
const SequelizeStore = SequelizeSessionInit(session.Store);
const sequelize = new Sequelize('codestudio', null, null, {
    dialect: 'sqlite',
    storage: path.join(process.cwd(), 'codestudio.sqlite'),
    operatorsAliases: false
});
const SqlStore = new SequelizeStore({db:sequelize});

// MAIN EXPORT MODULE FUNCTION
export default function (app) {

    // SEQUELIZE MODELS
    const User = sequelize.define('user', {
        username: Sequelize.STRING,
        name: Sequelize.STRING,
        imageUrl: Sequelize.STRING,
        email: Sequelize.STRING,
        githubId: Sequelize.STRING
    });

    const Track = sequelize.define('track', {
        userId: Sequelize.STRING,
        title: Sequelize.STRING,
        html: Sequelize.TEXT,
        css: Sequelize.TEXT,
        js: Sequelize.TEXT,
        uniqid: Sequelize.STRING
    });

    // SASS COMPILER MIDDLEWARE
    app.get('/mystyle.css', sass({
        file: './client/src/main.scss',
        watch: true,
        precompile: true,
        outputStyle: 'compressed',
        includePaths: [path.join(process.cwd(), 'node_modules')]
    }));

    app.get('/studio.css', sass({
        file: './client/src/studio.scss',
        watch: true,
        precompile: true,
        outputStyle: 'compressed'
    }));
    app.get('/dash.css', sass({
        file: './client/src/dash.scss',
        watch: true,
        precompile: true,
        outputStyle: 'compressed'
    }));
    // BOWER COMPONENT STATIC PATH
    app.use('/bower_components', express.static(
        path.join(process.cwd(), 'bower_components')
    ));

    // APPLICATION SESSION CONFIG
    app.use(
        session({
            secret: process.env.SECRET,
            store: SqlStore,
            resave: false,
            saveUninitialized: false
        }),
        passport.initialize(),
        passport.session()
    );
    SqlStore.sync({force: false});

    // PASSPORT CONFIGURATION
    passport.use( 'github',
        new GitHubStrategy({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK
        },
        function(accessToken, refreshToken, profile, done) {
            User.sync({force: false}).then( () => {
                User.findOne({where: { githubId: profile.id }}).then(user => {
                    if (user) {
                        user.update({
                            username: profile._json.login,
                            name: profile._json.name,
                            email: profile._json.email,
                            imageUrl: profile._json.avatar_url,
                            githubId: profile.id
                        }).then(() => done(null, user));
                    } else {
                        User.create({
                            username: profile._json.login,
                            name: profile._json.name,
                            email: profile._json.email,
                            imageUrl: profile._json.avatar_url,
                            githubId: profile.id
                        }).then(() => {
                            User.findOne({where: {githubId: profile.id}}).then(
                                user => done(null, user)
                            );
                        });
                    }
                });
            });
        }
        ));
    passport.serializeUser((user, done) => {
        return done(null, user.githubId);
    });
    passport.deserializeUser((githubId, done) => {
        User.sync({force: false}).then(() => {
            User.findOne({where: {githubId: githubId}})
                .then(user => done(null, user));
        });
    });

    apis(app, User, Track);

}
