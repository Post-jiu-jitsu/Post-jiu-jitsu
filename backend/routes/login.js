var express = require("express");
const router = express.Router();
//var passport = require('passport')
var passport = require("../config/passport");

router.get("/", function (req, res) {
  console.log("/");
  console.log("현재 세션값");
  console.log(req.session);
  
  res.json({
    "req.session": req.session, // 세션 데이터
    "req.user": req.user, // 유저 데이터(뒷 부분에서 설명)
    "req._passport": req._passport, // 패스포트 데이터(뒷 부분에서 설명)
  })
});

// Setting the naver oauth routes
router.get("/naver", passport.authenticate("naver", null), function (req, res) {
  console.log("/auth/naver failed, stopped");
});

// creates an account if no account of the new user
router.get(
  "/naver/callback",
  passport.authenticate("naver", {
    failureRedirect: "/users/loginfail",
  }),
  function (req, res) {
    console.log("콜백함수 실행");
    console.log(req.session);
    res.redirect("/users");
  }
);

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

router.get("/google", passport.authenticate("google", { scope: ['profile', 'email'] }), function (req, res) {
  console.log("/auth/naver google, stopped");
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/users/loginfail",
  }),
  function (req, res) {
    res.redirect("/users");
  }
);

module.exports = router;
