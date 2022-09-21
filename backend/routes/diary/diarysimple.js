const express = require('express');
const router = express.Router();

router.get('/all', GetDiarySimpleAll);
router.get('/month', GetDiarySimpleByMonth);
router.get('/day', GetDiarySimpleDay);
router.get('/techtag', GetDiarySimpleBytechtag);

//전체 다이어리simple 내용 받아오기
const GetDiarySimpleAll = (req, res) =>{
    
}

//원하는 달의 다이어리simple 내용 받아오기
const GetDiarySimpleByMonth = (req, res) =>{

}

//원하는 날짜의 다이어리simple 내용 받아오기
const GetDiarySimpleDay = (req, res) =>{

}

//원하는 기술태그의 다이어리simple 내용 받아오기
const GetDiarySimpleBytechtag = (req, res) =>{

}

module.exports = router;