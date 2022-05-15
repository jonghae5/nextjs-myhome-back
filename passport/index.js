const passport = require('passport');
const kakao = require('./kakaoStrategy'); // 카카오서버로 로그인할때
const naver = require('./naverStrategy'); // 네이버서버로 로그인할때

const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((data, done) => {
    console.log('serialize');

    done(null, { id: data.user.id, accessToken: data.accessToken || '' });
  });

  passport.deserializeUser(async (data, done) => {
    // data =  { id: data.user.id, accessToken: data.accessToken }
    console.log('deserialize');
    const initialUser = await User.findOne({
      where: { id: data.id },
    });
    const tokenUser = { data: initialUser, accessToken: data.accessToken };
    // req.user.data , req.user.accessToken 등..
    done(null, tokenUser);
  });
  kakao();
  naver();
};
