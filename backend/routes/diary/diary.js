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

//전체 다이어리 내용 받아오기
const GetDiaryAll = (req, res) => {
  GetDiaryAllSQL =
    "select * from diary where user_id = '" + user_id_by_session + "'";
  db.query(GetDiaryAllSQL, function (error, results, fields) {
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
            diary_title: results[i].diary_title,
            diary_time: results[i].diary_time,
            diary_content: results[i].diary_content,
            diary_cal_cat: [],
            techtag: [],
          },
        };
        //cal_cat 배열 추가
        for (let j = 0; j < diary_cal_cat_array.length; j++) {
          response[i].diary.diary_cal_cat.push({
            name: diary_cal_cat_array[j],
          });
        }
        GetTechTagByDiaryIdSQL =
          "select * from techtag where diary_id = '" +
          results[i].diary_id +
          "'";

        // async로 논리적 한계점 찾아 sync로 변경해 코딩했음 추후에 error예외처리 필요(논리적으로 error없어보임)
        techtag_array = sync_db.query(GetTechTagByDiaryIdSQL);
        for (let j = 0; j < techtag_array.length; j++) {
          response[i].diary.techtag.push({
            category1: techtag_array[j].techtag_cat1,
            category2: techtag_array[j].techtag_cat2,
            category3: techtag_array[j].techtag_cat3,
            tech_title: techtag_array[j].techtag_name,
          });
        }

        // async로 논리적 한계점 찾아 sync로 변경해 코딩했음
        // db.query(GetTechTagByDiaryIdSQL, function (error, results2, fields) {
        //   if (error) {
        //     res.send(error);
        //   } else {
        //     techtag_array = new Array(results2.length);
        //     //techtag 프로퍼티 추가
        // for (let j = 0; j < results2.length; j++) {
        //   response[i].diary.techtag.push({
        //     category1: results2[j].techtag_cat1,
        //     category2: results2[j].techtag_cat2,
        //     category3: results2[j].techtag_cat3,
        //     tech_title: results2[j].techtag_name,
        //   });
        //     }
        //   }
        // });
      }
      res.send(response);
    }
  });
};

//원하는 달의 다이어리 내용 받아오기
const GetDiaryByMonth = (req, res) => {
  console.log(req.query.year);
  const diary_start_day = req.query.year + "-" + req.query.month + "-01";
  const diary_end_day =
    req.query.year + "-" + (parseInt(req.query.month) + 1) + "-01";

  //원하는 달의 diary 가져오기
  GetDiaryByMonthSQL =
    "select * from diary where user_id = '" +
    user_id_by_session +
    "'" +
    " and diary_day >= '" +
    diary_start_day +
    "' and diary_day < '" +
    diary_end_day +
    "'";
  db.query(GetDiaryByMonthSQL, function (error, results, fields) {
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
            diary_title: results[i].diary_title,
            diary_time: results[i].diary_time,
            diary_content: results[i].diary_content,
            diary_cal_cat: [],
            techtag: [],
          },
        };
        //cal_cat 배열 추가
        for (let j = 0; j < diary_cal_cat_array.length; j++) {
          response[i].diary.diary_cal_cat.push({
            name: diary_cal_cat_array[j],
          });
        }
        GetTechTagByDiaryIdSQL =
          "select * from techtag where diary_id = '" +
          results[i].diary_id +
          "'";

        // async로 논리적 한계점 찾아 sync로 변경해 코딩했음 추후에 error예외처리 필요(논리적으로 error없어보임)
        techtag_array = sync_db.query(GetTechTagByDiaryIdSQL);
        for (let j = 0; j < techtag_array.length; j++) {
          response[i].diary.techtag.push({
            category1: techtag_array[j].techtag_cat1,
            category2: techtag_array[j].techtag_cat2,
            category3: techtag_array[j].techtag_cat3,
            tech_title: techtag_array[j].techtag_name,
          });
        }

        // async로 논리적 한계점 찾아 sync로 변경해 코딩했음
        // db.query(GetTechTagByDiaryIdSQL, function (error, results2, fields) {
        //   if (error) {
        //     res.send(error);
        //   } else {
        //     techtag_array = new Array(results2.length);
        //     //techtag 프로퍼티 추가
        // for (let j = 0; j < results2.length; j++) {
        //   response[i].diary.techtag.push({
        //     category1: results2[j].techtag_cat1,
        //     category2: results2[j].techtag_cat2,
        //     category3: results2[j].techtag_cat3,
        //     tech_title: results2[j].techtag_name,
        //   });
        //     }
        //   }
        // });
      }
      res.send(response);
    }
  });
};

//원하는 날짜의 다이어리 내용 받아오기
const GetDiaryByDay = (req, res) => {
  const diary_day =
    req.query.year + "-" + req.query.month + "-" + req.query.day;
  const GetDiaryByDaySQL =
    "select * from diary where user_id = '" +
    user_id_by_session +
    "' and diary_day = '" +
    diary_day +
    "'";
  db.query(GetDiaryByDaySQL, function (error, results, fields) {
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
          diary_title: results[0].diary_title,
          diary_time: results[0].diary_time,
          diary_content: results[0].diary_content,
          diary_cal_cat: [],
          techtag: [],
        },
      };
      //cal_cat 배열 추가
      for (let i = 0; i < diary_cal_cat_array.length; i++) {
        response.diary.diary_cal_cat.push({ name: diary_cal_cat_array[i] });
      }

      //techtag 배열 추가
      const GetTechTagByDiaryIdSQL =
        "select * from techtag where diary_id = " + results[0].diary_id + ";";
      let techtag_array = [];
      db.query(GetTechTagByDiaryIdSQL, function (error, results2, fields) {
        if (error) {
          res.send(error);
        } else {
          techtag_array = new Array(results2.length);
          for (let i = 0; i < results2.length; i++) {
            response.diary.techtag.push({
              category1: results2[i].techtag_cat1,
              category2: results2[i].techtag_cat2,
              category3: results2[i].techtag_cat3,
              tech_title: results2[i].techtag_name,
            });
          }
          res.send(response);
        }
      });
    }
  });
};

//원하는 기술태그의 다이어리 내용 받아오기
const GetDiaryBytechtag = (req, res) => {

  //원하는 기술태그의 diary_id 가져오기
  let GetDiaryIDBytechtagSQL =
    "select diary_id from techtag where techtag_name = '" +
    req.query.name +
    "'";
  db.query(GetDiaryIDBytechtagSQL, function (error, results, fields) {
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
            diary_title: Diary_obj[0].diary_title,
            diary_time: Diary_obj[0].diary_time,
            diary_content: Diary_obj[0].diary_content,
            diary_cal_cat: [],
            techtag: [],
          },
        };
        //cal_cat 배열 추가
        for (let j = 0; j < diary_cal_cat_array.length; j++) {
          response[i].diary.diary_cal_cat.push({
            name: diary_cal_cat_array[j],
          });
        }
        GetTechTagByDiaryIdSQL =
          "select * from techtag where diary_id = '" +
          results[i].diary_id +
          "'";
        // async로 논리적 한계점 찾아 sync로 변경해 코딩했음 추후에 error예외처리 필요(논리적으로 error없어보임)
        techtag_array = sync_db.query(GetTechTagByDiaryIdSQL);
        for (let j = 0; j < techtag_array.length; j++) {
          response[i].diary.techtag.push({
            category1: techtag_array[j].techtag_cat1,
            category2: techtag_array[j].techtag_cat2,
            category3: techtag_array[j].techtag_cat3,
            tech_title: techtag_array[j].techtag_name,
          });
        }
      }
      res.send(response);
    }
  });
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

router.get("/all", GetDiaryAll);
router.get("/month", GetDiaryByMonth);
router.get("/day", GetDiaryByDay);
router.get("/techtag", GetDiaryBytechtag);

router.post("/", PostDiary);

module.exports = router;