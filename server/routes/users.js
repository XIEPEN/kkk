var express = require('express');
var router = express.Router();

 router.get("/",(req,res)=>{
   res.send("后端")
 });

module.exports = router;
