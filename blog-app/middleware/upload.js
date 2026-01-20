const multer = require("multer");
const path = require("path");

//Disk Storage
const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,"public/uploads");
    },
    filename:function (req,file,cb){
        cb(null,Date.now()+'_'+file.originalname);
    }
});


//Accepting images only
const fileFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith("image/")){
        cb(null,true);
    }else{

        cb(new Error("only images allowed"),false);
    }
};

module.exports = multer({storage,fileFilter});

