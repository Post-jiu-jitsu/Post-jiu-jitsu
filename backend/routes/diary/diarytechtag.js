const express = require('express');
const router = express.Router();

//원하는 기술 카테고리의 기술태그(이름) 가져오기
const GetDiaryTechtagBytechCat = (req, res) =>{
    
}

router.get('/techcat', GetDiaryTechtagBytechCat);

module.exports = router;