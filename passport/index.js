const passport = require('passport');
const kakao = require('./kakaoStrategy'); // 카카오서버로 로그인할때
const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log('serialize');

    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log('deserialize');

    const user = await User.findOne({
      where: { id },
    });
    done(null, user);
  });
  kakao();
};
