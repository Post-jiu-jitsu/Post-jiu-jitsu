const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const _ = require("lodash");

const db = require("../../database/dbconfig");
const sync_db = require("../../database/sync_dbconfig");
const { result } = require("underscore");

let user_id_by_session = "choyoungwoo9@naver.com";

//post에서 body쉽게(인코딩, 이벤트처리 도움) 추출가능(중첩객체 파싱옵션 true)
router.use(bodyParser.urlencoded({ extended: true }));
//json형식 parsing 지원
router.use(bodyParser.json());

//원하는 기술 카테고리의 기술태그(이름) 가져오기
const GetTechtagBytechCat = (req, res) => {
  let category1 = req.query.category1;
  let category2 = req.query.category2;
  let category3 = req.query.category3;
  let GetTechtagBytechCatSQL;
  //쿼리 파라미터의 개수에 따라 다른 SQL생성
  if (category1 == "" || category1 == undefined) {
    GetTechtagBytechCatSQL =
      "select techtag_name from techtag where user_id = '" +
      user_id_by_session +
      "'";
  } else if (category2 == "" || category2 == undefined) {
    GetTechtagBytechCatSQL =
      "select techtag_name from techtag where user_id = '" +
      user_id_by_session +
      "' and techtag_cat1 = '" +
      category1 +
      "'";
  } else if (category3 == "" || category3 == undefined) {
    GetTechtagBytechCatSQL =
      "select techtag_name from techtag where user_id = '" +
      user_id_by_session +
      "' and techtag_cat1 = '" +
      category1 +
      "' and techtag_cat2 = '" +
      category2 +
      "'";
  } else {
    GetTechtagBytechCatSQL =
      "select techtag_name from techtag where user_id = '" +
      user_id_by_session +
      "' and techtag_cat1 = '" +
      category1 +
      "' and techtag_cat2 = '" +
      category2 +
      "' and techtag_cat3 = '" +
      category3 +
      "'";
  }

  db.query(GetTechtagBytechCatSQL, function (error, results, fields) {
    if (error) {
      res.send(error);
    } else {
      //loadash로 중복제거
      let set_results = _.uniqBy(results, "techtag_name");
      res.send(set_results);
    }
  });
};

router.get("/", GetTechtagBytechCat);

module.exports = router;
