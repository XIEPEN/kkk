<template>
    <div class="user-add">
        <Header></Header>
        <!-- 主体 -->
        <el-main>
            <el-card class="box-card">
                <!-- 面板标题 -->
                <div slot="header" class="clearfix">
                    <span>添加账号</span>
                </div>

                <!-- 面板内容 -->
                <div class="text item">
                    <!-- 添加账户表单 -->
                    <el-form :model="addUserForm" status-icon :rules="addUserRules" ref="addUserForm" label-width="100px" class="demo-ruleForm">
                        <!-- 账号 -->
                        <el-form-item label="账号" prop="username">
                            <el-input type="text" v-model="addUserForm.username" autocomplete="off"></el-input>
                        </el-form-item>
                        <!-- 密码 -->
                        <el-form-item label="密码" prop="password">
                            <el-input type="text" v-model="addUserForm.password" autocomplete="off"></el-input>
                        </el-form-item>
                        <!-- 确认密码 -->
                        <el-form-item label="确认密码" prop="checkPwd">
                            <el-input type="text" v-model="addUserForm.checkPwd"></el-input>
                        </el-form-item>
                        <!-- 用户组 -->
                        <el-form-item label="选择用户组" prop="usergroup">
                            <el-select v-model="addUserForm.usergroup" placeholder="请选择用户组">
                                <el-option label="超级管理员" value="超级管理员"></el-option>
                                <el-option label="普通用户" value="普通用户"></el-option>
                            </el-select>
                        </el-form-item>
                        <!-- 添加按钮 -->
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('addUserForm')">添加</el-button>
                            <el-button @click="resetForm('addUserForm')">重置</el-button>
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
import qs from "qs"
import Header from "@/components/Header/Header.vue";
import Footer from "@/components/Footer/Footer.vue";
export default {
    
    components:{
        Header,
        Footer
    },
    data(){
        const confirmPwd=(rule,value,callback)=>{
            if(value===""){
                callback(new Error("请再次输入密码"));
            }
            else if(value !==this.addUserForm.password){
                callback(new Error("两次密码不一致"));
            }
            else{
                callback();
            }
        };
        return{
            addUserForm:{
                username:"",
                password:"",
                checkPwd:"",
                usergroup:""
            },
            addUserForm:{
                // 用户
                username:[
                    {required:true,message:"账号不能为空",trigger:"blur"},
                    {min:2,max:6,message:"长度必须2到6个字符",trigger:"blur"}
                ],
                //密码
                password:[
                    {required:true,message:"密码不能为空",trigger:"blur"},
                    {min:6,max:12,message:"长度必须6到12个字符",trigger:"blur"}
                ],
                checkPwd:[
                    {required:true,validator:confirmPwd,trigger:"blur"}
                ],
                // 用户组
                usergroup:[
                    {required:true,message:"请选者用户组",trigger:"blur"}
                ]
            }
        }
    },
    methods:{
        submitForm(formName){
            this.$refs[formName].validate(valid=>{
                if(valid){
                    let params={
                        username: this.addUserForm.username,
                        password: this.addUserForm.password,
                        usergroup: this.addUserForm.usergroup
                    }
                    this.axios.post('http://192.168.20.3:3000/users/adduser',qs.stringify(params),
                    {"headers":{"Cont-Type":"application/x-www-form-urlencoded"}}).then(Response=>{
                        if(response.data.rstCode===1){
                            this.$message({
                                type:"success",
                                message:response.data.msg
                            })
                            this.$router.push("/usermanage")
                        }
                        else{
                            this.$messahe.error(response.data.msg)
                        }
                    })
                }
                else{
                    return false;
                }
            });
        },
        resetForm(formName){
            this.$refs[formName].resetFields();
        }
    }
};
</script>
<style lang="less">
.user-add {
  width: 100%;
  display: flex; // 让这个盒子 变为一个可以伸缩的盒子
  flex-direction: column; // 方向是 纵向
  // 主体
  .el-main {
    flex: 1; // 自动增长 撑满
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


