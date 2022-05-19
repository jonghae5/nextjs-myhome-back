const express = require('express');
const app = express();
const port = process.env.PORT || 3065;
const abilityRouter = require('./routes/ability');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const basicRouter = require('./routes/basic');
const db = require('./models');
const dotenv = require('dotenv');
const passport = require('passport');
const passportConfig = require('./passport');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
dotenv.config();
passportConfig();

/* 부동산 데이터 가져오기*/
/* node-schedule 사용 필수(배포시)*/
const dataAPI = require('./util/dataAPI');
dataAPI.dataAPI();

// 법정동 코드저장
const dongAPI = require('./util/dongAPI');
// dongAPI.dongAPI();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 4 * 60 * 60 * 1000 }, // 4 hours
  })
);

db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 순서.... ㅅㅂ....
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use('/user', userRouter);
app.use('/ability', abilityRouter);
app.use('/auth', authRouter);
app.use('/basic', basicRouter);

app.listen(port, () => {
  console.log('Node 서버 실행 중');
});
