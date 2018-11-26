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
  let userid = req.cookies.userid;
  let username = req.cookies.username;

  if (userid && username) {
    res.send({"isLogin": true})
  } else {
    res.send({"isLogin": false})
  }
})

/**
 * 接收请求 退出登录 /logout
 */
router.get('/logout', (req, res) => {
  res.clearCookie('userid');
  res.clearCookie('username');

  res.send({"rstCode":1, "msg":"退出成功！"})
})

router.get('/getusername', (req, res) => {
  let username = req.cookies.username;
  res.send(username)
})
router.get('/checkoldpwd', (req, res) => {
  let { oldPwd } = req.query;
  
  let id = req.cookies.userid;
  const sqlStr = `select * from users where id=${id}`;
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      if (data.length) {
        if ( oldPwd === data[0].password ) {
          res.send({"rstCode":1, "msg":"旧密码正确"})
        } else {
          res.send({"rstCode":0, "msg":"旧密码不正确"})
        }
      } else {
        res.send({"rstCode":501, "msg":"请求异常"})
      }
    }
  })
})

/**
 * 保存新密码 /savenewpwd
 */
router.get('/savenewpwd', (req, res) => {
  let { newPwd } = req.query;
  let id = req.cookies.userid;
  const sqlStr = `update users set password='${newPwd}' where id=${id}`;
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      if (data.affectedRows > 0) {
        res.clearCookie('userid');
        res.clearCookie('username');
        res.send({"rstCode":1, "msg":"修改密码成功！请重新登录！"})
      } else {
        res.send({"rstCode":1, "msg":"修改密码失败！"})
      }
    }
  })
  
})
router.post("/adduser",(req,res)=>{
  let {username, password, usergroup}=req.body
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




module.exports = router;
