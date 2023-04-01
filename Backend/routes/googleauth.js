const express = require('express')
const router = express.Router();
const passport = require('passport')

//Login Page
router.get( '/google', passport.authenticate('google', { scope: ['profile', 'email'] }))


//Dashboard
router.get( '/google/callback', passport.authenticate('google', {failureRedirect: ''}), //Incase of failure redirect to "" our login page else to dashboard
 (req, resp )=> 
 {
    resp.redirect("/dashboard")   //Redirection on success
 }
)

router.get('/logout', function(req, res, next){
  req.logout(function(err) {
     if (err) { return next(err); }

     res.redirect('/');
   });
 });

module.exports = router;