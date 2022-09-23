var passport = require("passport");
var NaverStrategy = require("passport-naver").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new NaverStrategy(
    {
      clientID: process.env.naver_api_id,
      clientSecret: process.env.naver_api_password,
      callbackURL: process.env.naver_api_callbackurl,
      //svcType: 0, // optional. see http://gamedev.naver.com/index.php/%EC%98%A8%EB%9D%BC%EC%9D%B8%EA%B2%8C%EC%9E%84:OAuth_2.0_API
    },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        console.log("profile=");
        console.log(profile);
        // data to be saved in DB
        user = {
          name: profile.displayName,
          email: profile.emails[0].value,
          username: profile.displayName,
          provider: "naver",
          naver: profile._json,
        };
        console.log("user=");
        console.log(user);
        return done(null, profile);
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log("serial");
  console.log(user);
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  console.log("deserial");
  console.log(obj);
  console.log("end");
  done(null, obj);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.google_api_id,
      clientSecret: process.env.google_api_password,
      callbackURL: process.env.google_api_callbackurl,
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("profile=");
      console.log(profile);
      // data to be saved in DB
      user = {
        name: profile.displayName,
        email: profile.emails[0].value,
        username: profile.displayName,
        provider: "google",
        naver: profile._json,
      };
      console.log("user=");
      console.log(user);

      return done(null, profile);
    }
  )
);

module.exports = passport;
