const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const db = require("../../database/dbconfig");
const sync_db = require("../../database/sync_dbconfig");

let user_id_by_session = "choyoungwoo9@naver.com";

//post에서 body쉽게(인코딩, 이벤트처리 도움) 추출가능(중첩객체 파싱옵션 true)
router.use(bodyParser.urlencoded({ extended: true }));
//json형식 parsing 지원
router.use(bodyParser.json());

//전체 다이어리simple 내용 받아오기
const GetDiarySimpleAll = (req, res) =>{
    GetDiarySimpleAllSQL =
    "select * from diary where user_id = '" + user_id_by_session + "'";
  db.query(GetDiarySimpleAllSQL, function (error, results, fields) {
    if (error) {
      res.send(error);
    } else {
      console.log(results);
      //response객체 배열 생성
      let response = new Array(results.length);
      for (let i = 0; i < results.length; i++) {
        //diary_cal_cat 파싱하여 약속된 데이터로 변환
        let diary_cal_cat_array = new Array(results[i].diary_cal_cat.length);
        for (let j = 0; j < results[i].diary_cal_cat.length; j++) {
          let cat = "";
          if (results[i].diary_cal_cat.charAt(j) == "a") {
            cat = "기술 연습";
          } else if (results[i].diary_cal_cat.charAt(j) == "b") {
            cat = "스파링 데이";
          } else if (results[i].diary_cal_cat.charAt(j) == "c") {
            cat = "승급";
          } else if (results[i].diary_cal_cat.charAt(j) == "d") {
            cat = "오픈매트";
          } else if (results[i].diary_cal_cat.charAt(j) == "e") {
            cat = "대회";
          }
          diary_cal_cat_array[j] = cat;
        }
        console.log(diary_cal_cat_array);
        response[i] = {
          diary: {
            diary_day: results[i].diary_day,
            diary_cal_cat: [],
          },
        };
        //cal_cat 배열 추가
        for (let j = 0; j < diary_cal_cat_array.length; j++) {
          response[i].diary.diary_cal_cat.push({
            name: diary_cal_cat_array[j],
          });
        }
      }
      res.send(response);
    }
  });
}

//원하는 달의 다이어리simple 내용 받아오기
const GetDiarySimpleByMonth = (req, res) =>{
    console.log(req.query.year);
  const diary_start_day = req.query.year + "-" + req.query.month + "-01";
  const diary_end_day =
    req.query.year + "-" + (parseInt(req.query.month) + 1) + "-01";

  //원하는 달의 diary 가져오기
  GetDiarySimpleByMonthSQL =
    "select * from diary where user_id = '" +
    user_id_by_session +
    "'" +
    " and diary_day >= '" +
    diary_start_day +
    "' and diary_day < '" +
    diary_end_day +
    "'";
  db.query(GetDiarySimpleByMonthSQL, function (error, results, fields) {
    if (error) {
      res.send(error);
    } else {
      //response객체 배열 생성
      let response = new Array(results.length);
      for (let i = 0; i < results.length; i++) {
        //diary_cal_cat 파싱하여 약속된 데이터로 변환
        let diary_cal_cat_array = new Array(results[i].diary_cal_cat.length);
        for (let j = 0; j < results[i].diary_cal_cat.length; j++) {
          let cat = "";
          if (results[i].diary_cal_cat.charAt(j) == "a") {
            cat = "기술 연습";
          } else if (results[i].diary_cal_cat.charAt(j) == "b") {
            cat = "스파링 데이";
          } else if (results[i].diary_cal_cat.charAt(j) == "c") {
            cat = "승급";
          } else if (results[i].diary_cal_cat.charAt(j) == "d") {
            cat = "오픈매트";
          } else if (results[i].diary_cal_cat.charAt(j) == "e") {
            cat = "대회";
          }
          diary_cal_cat_array[j] = cat;
        }
        response[i] = {
          diary: {
            diary_day: results[i].diary_day,
            diary_cal_cat: [],
          }
        };
        //cal_cat 배열 추가
        for (let j = 0; j < diary_cal_cat_array.length; j++) {
          response[i].diary.diary_cal_cat.push({
            name: diary_cal_cat_array[j],
          });
        }
      }
      res.send(response);
    }
  });
}

//원하는 날짜의 다이어리simple 내용 받아오기
const GetDiarySimpleDay = (req, res) =>{
    const diary_day =
    req.query.year + "-" + req.query.month + "-" + req.query.day;
  const GetDiarySimpleByDaySQL =
    "select * from diary where user_id = '" +
    user_id_by_session +
    "' and diary_day = '" +
    diary_day +
    "'";
  db.query(GetDiarySimpleByDaySQL, function (error, results, fields) {
    if (error) {
      res.send(error);
    } else {
      //diary_cal_cat 파싱하여 약속된 데이터로 변환
      let diary_cal_cat_array = new Array(results[0].diary_cal_cat.length);
      for (let i = 0; i < results[0].diary_cal_cat.length; i++) {
        let cat = "";
        if (results[0].diary_cal_cat.charAt(i) == "a") {
          cat = "기술 연습";
        } else if (results[0].diary_cal_cat.charAt(i) == "b") {
          cat = "스파링 데이";
        } else if (results[0].diary_cal_cat.charAt(i) == "c") {
          cat = "승급";
        } else if (results[0].diary_cal_cat.charAt(i) == "d") {
          cat = "오픈매트";
        } else if (results[0].diary_cal_cat.charAt(i) == "e") {
          cat = "대회";
        }

        diary_cal_cat_array[i] = cat;
      }
      //response 객체 작성
      let response = {
        diary: {
          diary_day: results[0].diary_day,
          diary_cal_cat: [],
        }
      };
      //cal_cat 배열 추가
      for (let i = 0; i < diary_cal_cat_array.length; i++) {
        response.diary.diary_cal_cat.push({ name: diary_cal_cat_array[i] });
      }
      res.send(response);
    }
  });
}

//원하는 기술태그의 다이어리simple 내용 받아오기
const GetDiarySimpleBytechtag = (req, res) =>{
    //원하는 기술태그의 diary_id 가져오기
  let GetDiarySimpleIDBytechtagSQL =
  "select diary_id from techtag where techtag_name = '" +
  req.query.name +
  "'";
db.query(GetDiarySimpleIDBytechtagSQL, function (error, results, fields) {
  if (error) {
    res.send(error);
  } else {
    //세션의 유저가 쓴글의 ID모두 가져옴
    let GetDiaryIDByUserID =
      "select diary_id from diary where user_id = '"+ user_id_by_session +"'";
    //세션값으로 결정되므로 논리적으로 오류없으나 예외처리 필요
    b = sync_db.query(GetDiaryIDByUserID);
    let Diary_id_array = [];
    for (let i = 0; i < results.length; i++) {
      for (let j = 0; j < b.length; j++) {
        if (results[i].diary_id == b[j].diary_id) {
          Diary_id_array.push({ diary_id: results[i].diary_id });
        }
      }
    }

    let response = new Array(Diary_id_array.length);
    //Diary_id를 바탕으로 query 생성
    for (let i = 0; i < Diary_id_array.length; i++) {
      GetDiaryByDiaryIDSQL =
        "select * from diary " +
        "where diary_id = " +
        Diary_id_array[i].diary_id;
      Diary_obj = sync_db.query(GetDiaryByDiaryIDSQL);
      //diary_cal_cat 파싱하여 약속된 데이터로 변환
      let diary_cal_cat_array = new Array(Diary_obj[0].diary_cal_cat.length);
      for (let j = 0; j < Diary_obj[0].diary_cal_cat.length; j++) {
        let cat = "";
        if (Diary_obj[0].diary_cal_cat.charAt(j) == "a") {
          cat = "기술 연습";
        } else if (Diary_obj[0].diary_cal_cat.charAt(j) == "b") {
          cat = "스파링 데이";
        } else if (Diary_obj[0].diary_cal_cat.charAt(j) == "c") {
          cat = "승급";
        } else if (Diary_obj[0].diary_cal_cat.charAt(j) == "d") {
          cat = "오픈매트";
        } else if (Diary_obj[0].diary_cal_cat.charAt(j) == "e") {
          cat = "대회";
        }
        diary_cal_cat_array[j] = cat;
      }
      response[i] = {
        diary: {
          diary_day: Diary_obj[0].diary_day,
          diary_cal_cat: [],
        },
      };
      //cal_cat 배열 추가
      for (let j = 0; j < diary_cal_cat_array.length; j++) {
        response[i].diary.diary_cal_cat.push({
          name: diary_cal_cat_array[j],
        });
      }
    }
    res.send(response);
  }
});
}

router.get('/all', GetDiarySimpleAll);
router.get('/month', GetDiarySimpleByMonth);
router.get('/day', GetDiarySimpleDay);
router.get('/techtag', GetDiarySimpleBytechtag);

module.exports = router;