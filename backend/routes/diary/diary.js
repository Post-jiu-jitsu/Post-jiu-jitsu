const express = require('express');
const router = express.Router();

router.get('/all', GetDiaryAll);
router.get('/month', GetDiaryByMonth);
router.get('/day', GetDiaryByDay);
router.get('/techtag', GetDiaryBytechtag);

router.post('/', PostDiary);


//전체 다이어리 내용 받아오기
const GetDiaryAll = (req, res) =>{
    
}

//원하는 달의 다이어리 내용 받아오기
const GetDiaryByMonth = (req, res) =>{

}

//원하는 날짜의 다이어리 내용 받아오기
const GetDiaryByDay = (req, res) =>{

}

//원하는 기술태그의 다이어리 내용 받아오기
const GetDiaryBytechtag = (req, res) =>{

}

//다이어리 게시하기
const PostDiary = (req, res) =>{

}


module.exports = router;