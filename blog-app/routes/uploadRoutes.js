const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");


router.post("/image",upload.single("file"),(req,res)=>{
    try{
        return res.json({
            location:`uploads/${req.file.filename}`
        });
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Image Upload failed"});
    }
});

module.exports = router;
