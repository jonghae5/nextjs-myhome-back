const express = require('express');
const router = express.Router();
const passport = require('passport');
const { User } = require('../models');
const KakaoStrategy = require('passport-kakao').Strategy;
const axios = require('axios');
// GET /
router.get('/', (req, res) => {
  res.send('auth');
});

// KAKAO,NAVER LOGOUT
// auth//kakao/logout
router.get('/logout', async (req, res) => {
  if (req.user?.data.provider === 'kakao') {
    try {
      // https://kapi.kakao/com/v1/user/logout
      const ACCESS_TOKEN = req.user.accessToken;
      // logout
      await axios({
        method: 'post',
        url: 'https://kapi.kakao.com/v1/user/unlink',
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
    } catch (error) {
      console.error(error);
      res.json(error);
    }
  }
  // 세션 정리
  req.logout();
  req.session.destroy();

  res.redirect('http://localhost:3000');
});

// GET /kakao
router.get('/kakao', passport.authenticate('kakao'));

// GET /kakao/callback
router.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    failureRedirect: 'http://localhost:3000/login/',
  }),
  (req, res) => {
    req.session.save(function () {
      console.log('session save....');
      return res.redirect('http://localhost:3000/');
    });
  }
);

//* 네이버로 로그인하기 라우터 *

// GET /naver
router.get('/naver', passport.authenticate('naver', { authType: 'reprompt' }));

// GET /naver/callback
router.get(
  '/naver/callback',
  // naverStrategy로 가서 카카오계정 정보와 DB를 비교해서 회원가입시키거나 로그인 처리
  passport.authenticate('naver', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://localhost:3000/');
  }
);

module.exports = router;
