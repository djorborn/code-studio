import head from './../lib/head';
import uniqid from 'uniqid';

export default function (app, User, Track) {
    // Render Track, Render Empty Studio or Get New Id
    app.get('/', (req, res) =>{
        if (req.query.track) {
            Track.sync({force: false}).then(() => {
                Track.findOne({where: {uniqid: req.query.track}})
                    .then(track => {
                        if (track) {
                            res.render('studio', {
                                styles: head.styles(),
                                scripts: head.scripts(),
                                title: track.title,
                                track: track
                            });
                        } else {
                            res.render('studio', {
                                styles: head.styles(),
                                scripts: head.scripts()
                            });
                        }
                    });
            });
        } else {
            res.redirect('/new');
        }
    });
    // Get New Uniqid For New Track
    app.get('/new', (req, res) => {
        res.redirect('/?track=' + uniqid());
    });

    // Save Track On Login And Initial Save
    app.get('/save-current-track', (req, res) => {
        Track.sync({force: false}).then(() => {
            Track.create({
                title: req.body.title,
                html: req.body.html,
                css: req.body.css,
                js: req.body.js,
                userId: req.user.githubId,
                // I get uniqid from sessionStorage
                // because could come from login
                uniqid: req.body.uniqid
            }).then(() => res.redirect('/?track=' + req.body.uniqid));
        });
    });

    // POST
    // Update Saved Track
    app.post('/update-track', (req, res) => {
        Track.findOne({where: {uniqid: req.query.track}})
            .then(track => {
                track.update({
                    userId: req.user.githubId,
                    title: req.body.title,
                    html: req.body.html,
                    css: req.body.css,
                    js: req.body.js
                }).then(() => {
                    res.sendStatus(200);
                });
            });
    });

    app.post('/update-title', (req, res) => {
        Track.findOne({where: {uniqid: req.query.track}})
            .then(track => {
                track.update({
                    title: req.body.tilte
                }).then(() => {
                    res.sendStatus(200);
                });
            });
    });

    app.post('/track-data', (req, res) => {
        Track.sync({force: false}).then(() => {
            Track.findOne({where: {uniqid: req.query.track}})
                .then(track => {
                    if (!track) {
                        res.json({status: 'OK', track: false});
                    } else {
                        res.json({status: 'OK', track: track});
                    }
                });
        });
    });

    // DASHBOARD CALLS
    app.post('/get-user-tracks', (req, res) => {
        Track.sync({force: false}).then(() => {
            Track.findAll({where: {userId: req.user.githubId}})
                .then(tracks => {
                    if (tracks) {
                        res.send(tracks);
                    } else {
                        res.send('No Tracks');
                    }
                });
        });
    });

    app.post('/get-all-tracks', (req, res) => {
        Track.sync({force: false}).then(() => {
            Track.findAll().then(tracks => res.send(tracks));
        });
    });

}
