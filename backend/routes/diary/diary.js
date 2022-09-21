const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const db = require("../../database/dbconfig");
const send = require("send");

//post에서 body쉽게(인코딩, 이벤트처리 도움) 추출가능(중첩객체 파싱옵션 true)
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//전체 다이어리 내용 받아오기
const GetDiaryAll = (req, res) => {};

//원하는 달의 다이어리 내용 받아오기
const GetDiaryByMonth = (req, res) => {};

//원하는 날짜의 다이어리 내용 받아오기
const GetDiaryByDay = (req, res) => {};

//원하는 기술태그의 다이어리 내용 받아오기
const GetDiaryBytechtag = (req, res) => {
  db.prependOnceListener;
};

//다이어리 게시하기
const PostDiary = (req, res) => {
  //달력 카테고리 여러개 들어갈수있으므로 abced로 변환하여 저장
  let diary_cal_cat_str = "";
  for (let i = 0; i < req.body.diary["diary_cal_cat"].length; i++) {
    if (req.body.diary["diary_cal_cat"][i]["name"] == "기술 연습") {
      diary_cal_cat_str = diary_cal_cat_str + "a";
    } else if (req.body.diary["diary_cal_cat"][i]["name"] == "스파링 데이") {
      diary_cal_cat_str = diary_cal_cat_str + "b";
    } else if (req.body.diary["diary_cal_cat"][i]["name"] == "대회") {
      diary_cal_cat_str = diary_cal_cat_str + "c";
    } else if (req.body.diary["diary_cal_cat"][i]["name"] == "승급") {
      diary_cal_cat_str = diary_cal_cat_str + "d";
    } else if (req.body.diary["diary_cal_cat"][i]["name"] == "오픈매트") {
      diary_cal_cat_str = diary_cal_cat_str + "e";
    }
  }
  //Diary 테이블에 일지기록 Create
  let CreateDiarySQL =
    "INSERT INTO diary (diary_time, diary_content, diary_day, diary_cal_cat, user_id, diary_title) VALUES ('" +
    req.body.diary["diary_time"] +
    "', '" +
    req.body.diary["diary_content"] +
    "', '" +
    req.body.diary["diary_day"] +
    "', '" +
    diary_cal_cat_str +
    "', 'choyoungwoo9@naver.com','" +
    req.body.diary["diary_title"] +
    "')";
  let SelectDiaryIdSQL =
    "Select diary_id from diary where user_id = 'choyoungwoo9@naver.com' and diary_day = '" +
    req.body.diary["diary_day"] +
    "'";

  //Create Diary
  db.query(CreateDiarySQL, function (error, results, fields) {
    if (error) {
        res.status(409);
      res.send(error);
    } else {
      //Read DiaryID
      db.query(SelectDiaryIdSQL, function (error, results, fields) {
        if (error) {
            res.status(409);
          res.send(error);
        } else {
          const diary_id = results[0]["diary_id"];
          //Create TechTag
          for (let i = 0; i < req.body.diary["techtag"].length; i++) {
            const CreateTechtagSQL =
              "INSERT INTO techtag (techtag_cat1, techtag_cat2, techtag_cat3, techtag_name, diary_id) VALUES" +
              " ('" +
              req.body.diary["techtag"][i]["category1"] +
              "', '" +
              req.body.diary["techtag"][i]["category2"] +
              "', '" +
              req.body.diary["techtag"][i]["category3"] +
              "', '" +
              req.body.diary["techtag"][i]["tech_title"] +
              "', " +
              diary_id +
              ")";
            db.query(CreateTechtagSQL, function (error, results, fields) {
              if (error) {
                res.status(409);
                res.send(error);
              }
            });
          }
          res.send("OK");
        }
      });
    }
  });
  db.end;
};

// const DBOPEN = (req, res) => {
//   db.query("select * from user", function (error, results, fields) {
//     if (error) {
//     }
//     console.log(results);
//     res.send("ok");
//   });
//   db.end;
// };

router.get("/all", GetDiaryAll);
router.get("/month", GetDiaryByMonth);
router.get("/day", GetDiaryByDay);
router.get("/techtag", GetDiaryBytechtag);

router.post("/", PostDiary);

// router.get("/dbopen", DBOPEN);

module.exports = router;
