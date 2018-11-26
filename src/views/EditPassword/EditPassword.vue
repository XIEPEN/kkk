<template>
  <div class="user-add">
    <!-- 头部 -->
    <Header></Header>
    <!-- 主体 -->
    <el-main>
      <el-card class="box-card">
        <!-- 面板标题 -->
        <div slot="header" class="clearfix">
          <span>密码修改</span>
        </div>

        <!-- 面板内容 -->
        <div class="text item">
          <!-- 添加账户表单 -->
          <el-form :model="editPwdForm" status-icon :rules="rules" ref="editPwdForm" label-width="100px" class="demo-ruleForm">
            <!-- 密码 -->
            <el-form-item label="旧的密码" prop="oldPwd">
              <el-input type="text" v-model="editPwdForm.oldPwd" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item label="新的密码" prop="newPwd">
              <el-input type="text" v-model="editPwdForm.newPwd" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 确认密码 -->
            <el-form-item label="确认新密码" prop="confirmPwd">
              <el-input type="text" v-model="editPwdForm.confirmPwd"></el-input>
            </el-form-item>

            <!-- 添加按钮 -->
            <el-form-item>
              <el-button type="primary" @click="submitForm('editPwdForm')">修改</el-button>
              <el-button @click="resetForm('editPwdForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-main>
    <!-- 尾部 -->
    <Footer></Footer>
  </div>
</template>
<script>
import qs from "qs";

// 引入头部组件 和 尾部组件
import Header from "@/components/Header/Header.vue";
import Footer from "@/components/Footer/Footer.vue";

export default {
  // 注册组件
  components: {
    Header,
    Footer
  },
  data() {
    const checkOldPwd = (rule, value, callback) => {
      this.axios.get(`http://127.0.0.1:3000/users/checkoldpwd?oldPwd=${value}`)
        .then(response => {
          if (response.data.rstCode === 1) {
            callback();
          } else if (response.data.rstCode === 0) {
            callback(new Error(response.data.msg));
          }
        });
    };
    const checkPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.editPwdForm.newPwd) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    return {
      editPwdForm: {
        oldPwd: "",
        newPwd: "",
        confirmPwd: ""
      },
      rules: {
        oldPwd: [{ required: true, validator: checkOldPwd, trigger: "blur" }],
      
        newPwd: [
          { required: true, message: "新密码不能为空", trigger: "blur" }, 
          { min: 2, max: 6, message: "长度必须 2 到 6 个字符", trigger: "blur" } 
        ],
        confirmPwd: [{ required: true, validator: checkPwd, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios.get(`http://127.0.0.1:3000/users/savenewpwd?newPwd=${this.editPwdForm.newPwd}`)
            .then(response => {
              if (response.data.rstCode === 1) {
                this.$message({
                  type: "success",
                  message: response.data.msg
                });
                setTimeout(() => {
                  this.$router.push("/login");
                }, 1000);
              } else {
                this.$message.error(response.data.msg);
              }
            });
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
.user-add {
  width: 100%;
  display: flex; 
  flex-direction: column; 
  .el-main {
    flex: 1;
    .el-card {
      .el-card__header {
        font-weight: 700;
        font-size: 15px;
        background-color: #f1f1f1;
      }
      .el-card__body {
        .item {
          .el-form {
            width: 300px;
            .el-form-item {
              .el-form-item__label {
                height: 35px;
                line-height: 35px;
              }
              .el-form-item__content {
                height: 35px;
                line-height: 35px;
                .el-input__inner {
                  height: 35px;
                  line-height: 35px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>


