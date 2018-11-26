var express = require('express');
var router = express.Router();

const connection = require("./connect");

router.all("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8080");
  res.setHeader("Access-Control-Allow-Credentials", true);

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

router.get('/userlistbypage', (req, res) => {

  // 接收两个参数 （两个分页条件）currentPage(当前页码)  pageSize(每页多少条)
  let { currentPage, pageSize } = req.query;

  /* 设置默然参数 */
  currentPage = currentPage ? currentPage : 1;
  pageSize = pageSize ? pageSize : 3;

  let sqlStr = 'select * from users order by cdate desc' ;
  // 执行sql语句 查询所有数据 计算出数据总条数
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err // 如果有错 抛出错误
    } else {
      let totalCount = data.length;
      
      // 计算分页条件
      let n = (currentPage - 1) * pageSize;
      // 构造分页查询的sql语句
      sqlStr += ` limit ${n}, ${pageSize}`;
      // 执行sql语句
      connection.query(sqlStr, (err, data) => {
        if (err) {
          throw err;
        } else {
          res.send({"totalCount": totalCount, "data":data});
        }
      })
    }
  })
})

/**
 * 接收单条删除的请求 /deluser
 */
router.get('/deluser', (req, res) => {
  // 接收id
  let { id } = req.query
  // 构造sql 根据接收到的id 删除这一条数据
  const sqlStr = `delete from users where id = ${id}`

  // 执行sql语句（单条删除操作）
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err
    } else {
      // 根据结果判断 如果受影响行数 > 0 就是删除成功
      if (data.affectedRows > 0) {
        // 返回删除成功的信息给前端
        res.send({"rstCode": 1, "msg":"删除成功,哈哈！"})
      } else {
        // 否则就是删除失败 返回删除失败的信息给前端
        res.send({"rstCode": 0, "msg":"删除失败,呵呵!"})
      }
    }
  })
  
})

/**
 * 接收修改用户请求 - 数据回显 /edituser
 */
router.get('/edituser', (req, res) => {
  // 接收需要修改的数据的id
  let { id } = req.query;

  // 构造sql语句
  const sqlStr = `select * from users where id=${id}`;
  // 执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      res.send(data);
    }
  })
})

/**
 * 接收保存修改用户的请求  /saveedit
 */
router.post('/saveedit', (req, res) => {
  // 接收新的数据 和 一个原来的id
  let { username, password, usergroup, editId }  = req.body;

  // 构造sql语句（修改的sql）
  const sqlStr = `update users set username='${username}', password='${password}', usergroup='${usergroup}' where id=${editId}`;
  // 执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      // 如果受影响行数 大于0 就是修改成功 返回给前端修改成功的信息
      if (data.affectedRows > 0) {
        res.send({"rstCode":1, "msg":"修改成功!"})
      } else {
        // 否则就是修改失败 返回给前端修改失败的信息
        res.send({"rstCode":0, "msg":"修改失败!"})
      }
    }
  })
})

/**
 * 批量删除请求路由 /batchdel
 */
router.post('/batchdel', (req, res) => {
  // 接收前端传过来的需要批量删除的id数组
  let { idArr } = req.body;
  // 把字符串类型数据转为数组
  idArr = JSON.parse(idArr);

  // 构造sql语句 执行批量删除
  const sqlStr = `delete from users where id in (${idArr})`;
  // 执行sql语句 
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      // 如果受影响行数 大于 0 就是删除成功 返回删除成功的信息给前端
      if (data.affectedRows > 0) {
        res.send({"rstCode":1, "msg":"批量删除成功"})
      } else {
        // 否则就是失败 返回失败的信息给前端
        res.send({"rstCode":0, "msg":"批量删除失败"})
      }
    }
  })
})



module.exports = router;
