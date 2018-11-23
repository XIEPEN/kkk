<template>
  <div class="login">
    <div class="login-form">
        <h1 class="title">
            <i class="el-icon-setting"></i>
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

          alert("前端验证通过，可以发送给后端!");
          let username = this.loginForm.username;
          let password = this.loginForm.password;

          console.log(username, password);直接获取路由对象
          this.$router.push('/');
          
        } else {
          console.log("前端验证不通过, 不能发送");
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
  background-image:url(./image/lu.jpeg);
  height: 100%;
  .login-form {
    width: 500px;
    height: 350px;
    background-color:red(0.5);
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
        color: #ffffff;
        font-size: 24px;
        margin-bottom: 30px;
    }
    .el-form {
       .el-form-item {
           .el-form-item__label {
               color: #ffffff;
           }
       }
    }
  }
}
</style>

