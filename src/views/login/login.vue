<template>
  <div class="login">
    <div class="login-form">
        <h1 class="title">
            超市系统登录
        </h1>
        <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="账号" prop="username">
                    <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="text" v-model="loginForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPwd">
                    <el-input type="text" v-model="loginForm.checkPwd"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                    <el-button @click="resetForm('loginForm')">重置</el-button>
                </el-form-item>
            </el-form>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    const confirmPwd = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请再次输入密码'));
        } else if (value !== this.loginForm.password) {
            callback(new Error('两次密码不一致'))
        } else {
            callback()
        }
    }
    return {
      loginForm: {
        username: "",
        password: "",
        checkPwd: ""
      },   
      loginRules: {
        username: [
            { required: true, message: '账号不能为空', trigger: 'blur' }, 
            { min: 2, max: 6, message: '长度必须 2 到 6 个字符', trigger: 'blur' }
        ],
        password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { min: 6, max: 12, message: '长度必须 6 到 12 个字符', trigger: 'blur' } 
        ],
        checkPwd: [
            { required: true, validator: confirmPwd, trigger: 'blur' }, 
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
       if (valid) {
          // 收集
          let params = {
            username: this.loginForm.username,
            password: this.loginForm.password
          }

          // 允许携带cookie
          this.axios.defaults.withCredentials=true;
          
          // 写ajax 把用户名和密码 一起发送给后端
          this.axios.post('http://127.0.0.1:3000/users/checklogin',
            qs.stringify(params),
            { headers: {'Content-Type':'application/x-www-form-urlencoded'} }
          )
            .then(response => {
              // 接收后端响应的数据 判断
              if (response.data.rstCode === 1) {
                // 成功 弹出登录成功的提示
                this.$message({
                  type: 'success',
                  message: response.data.msg
                });

                // 跳转到首页
                setTimeout(() => {
                  this.$router.push("/");
                }, 500)
              } else {
                // 失败 弹出失败的提示
                this.$message.error(response.data.msg)
              }
            })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less">

.login {
  height: 100%;
  background-image:url(./image/cj3.jpg);
  height: 100%;
  .login-form {
    width: 500px;
    height: 350px;
    background-color:rgba(0, 0, 0, 0.1);
    border-radius: 7px;
    padding-right: 34px;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    .title {
        text-align: center;
        color:#ff6600;
        font-size: 24px;
        margin-bottom: 30px;
    }
    .el-form {
       .el-form-item {
           .el-form-item__label {
               color:#ff6600;
           }
       }
    }
  }
}
</style>

