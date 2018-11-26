var express = require('express');
var router = express.Router();

const connection = require("./connect");

router.all("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8080");
  res.setHeader("Access-Control-Allow-Origin", true);

  next();
})

router.post("/checklogin", (req, res) => {
  let { username, password } = req.body;
  const sqlStr = `select * from users where username='${username}' and password='${password}'`;
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    }
    else {
      if (data.length) {
        res.cookie("userid", data[0].id);
        res.cookie("username", data[0].username);
        res.send({ "rstCode": 1, "msg": "登录成功!" })
      }
      else {
        res.send({ "rstCode": 1, "msg": "请检查用户名或密码" })
      }
    }
  })
})
router.get('/checkIsLogin', (req, res) => {
  // 获取浏览器的cookie
  let userid = req.cookies.userid;
  let username = req.cookies.username;

  // 如果都存在 证明用户登录过 
  if (userid && username) {
    // 存在 证明登录过
    res.send({"isLogin": true})
  } else {
    // 不存在 证明没有登录
    res.send({"isLogin": false})
  }
})

/**
 * 接收请求 退出登录 /logout
 */
router.get('/logout', (req, res) => {
  // 清除cookie
  res.clearCookie('userid');
  res.clearCookie('username');

  // 返回给前端 退出登录成功的信息
  res.send({"rstCode":1, "msg":"退出成功, 欢迎回来! 哥哥！"})
})
router.post("/adduser",(req,res)=>{
  let {username, password, usergroup}=req.bofy
  const sqlStr=`insert into users(username,password,usergroup) values(?,?,?)`;
  const sqlParams=[username,password,usergroup];
  connection.query(sqlStr,sqlParams,(err,data)=>{
    if(err){
      throw err;
    }
    else{
      if(data.affectedRows>0){
        res.send({"rstCode":1,"msg":"添加账号成功"})
      }
      else{
        res.send({"rstCode":0,"msg":"添加账号失败"})
      }
    }
  })
})
router.get("/userlist",(req,res)=>{
  const sqlStr="select * from users order by cdate desc"
  connection.query(sqlStr,(err,data)=>{
    if(err){
      throw err
    }
    else{
      res.send(data)
    }
  })
})

module.exports = router;
