const express = require('express');
const router = express.Router();

router.get('/techcat', GetDiaryTechtagBytechCat);

//원하는 기술 카테고리의 기술태그(이름) 가져오기
const GetDiaryTechtagBytechCat = (req, res) =>{
    
}

module.exports = router;