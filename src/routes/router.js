import head from './../lib/head';
import passport from 'passport';
import uniqid from 'uniqid';
export default function (app) {
  app.get('/preview', (req, res) => {
    res.render('preview')
  })

  app.get('/dash', (req, res) => {
      if(!req.user) {
          // res.redirect('/error')
          res.render('dash')
      } else {
          res.render('dash', {
              name: req.user.name,
              username: req.user.username,
              imageUrl: req.user.imageUrl
          })
      }
  })

  // Login And Authentication
  app.get(
    '/login',
    passport.authenticate('github')
  )

  app.get(
    '/auth/github/callback',
    passport.authenticate('github', {
      successRedirect: '/save-current-track',
      failureRedirect: '/error'
    })
  )

  app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  app.get('/error', (req, res) => {
    res.send('error')
  })

}
