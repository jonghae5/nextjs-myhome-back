const express = require('express');
const router = express.Router();
const passport = require('passport');
const { User } = require('../models');
const KakaoStrategy = require('passport-kakao').Strategy;

// GET /
router.get('/', (req, res) => {
  res.send('auth');
});

// GET /logout
router.get('/logout', (req, res) => {
  req.logout();
  req.sesson.destroy();
  res.redirect('/');
});

// GET /kakao
router.get('/kakao', passport.authenticate('kakao'));

// GET /kakao/callback
router.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    // successRedirect: '/',
    failureRedirect: '/',
  }),
  (req, res) => {
    req.session.save(function () {
      console.log('session save....');
      return res.redirect('http://localhost:3000/');
    });
  }
);

module.exports = router;
