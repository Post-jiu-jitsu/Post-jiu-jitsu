const sessionObj = {
    key: 'sid',
    secret: "wegf6124@#$@#!",  // salt -> 암호화를 할 때 필요한 요소값
    resave: false,
    saveUninitialized: true,
    // checkPeriod : 서버쪽 세션의 유효기간
    // 브라우저 쿠키의 유효기간
    cookie: {
        maxAge: 333
    }
    
}



module.exports = sessionObj