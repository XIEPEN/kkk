
var express=require("express");
var router=express.Router();
router.git("/",function(req,res,next){
    res.render("index",{title:"商品路由"});
});
router.all("*",(req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://127.0.0.1:8080");
    res.setHeader("Access-Control-Allow-Credentials",true);
    next()
})
const connection=require("./connect");

router.post("/addgoods",(req,res)=>{
    let { cateName, barCode, goodsName, salePrice, marketPrice, costPrice, goodsNum, goodsWeight, unit, discount, promotion, goodsDesc } = req.body;
})