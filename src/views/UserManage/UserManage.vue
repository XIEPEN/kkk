<template>
  <div class="user-manage">
    <!-- 头部 -->
    <Header></Header>
    <!-- 主体 -->
    <el-main>
      <el-card class="box-card">
        <!-- 面板标题 -->
        <div slot="header" class="clearfix">
          <span>账号管理</span>
        </div>
        <!-- 面板内容 -->
        <div class="text item">
          <!-- 账号管理列表 -->
          <el-table ref="userlist" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <!-- 选择框 -->
            <el-table-column type="selection">
            </el-table-column>
            <!-- 用户名称 -->
            <el-table-column prop="username" label="用户名称">
            </el-table-column>
            <!-- 用户组别 -->
            <el-table-column prop="usergroup" label="用户组">
            </el-table-column>

            <!-- 日期 -->
            <el-table-column label="日期">
              <template slot-scope="scope">{{ scope.row.cdate | formatCdate }}</template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleEdit(scope.row.id)">
                  <i class="el-icon-edit"></i>修改</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">
                  <i class="el-icon-delete"></i>删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 修改弹出的模态框 -->
          <el-dialog title="修改用户" :visible.sync="dialogFormVisible" width="40%">
            <!-- 修改用户表单 -->
            <el-form :model="editForm" status-icon :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
              <!-- 账号 -->
              <el-form-item label="账号" prop="username">
                <el-input type="text" v-model="editForm.username" autocomplete="off"></el-input>
              </el-form-item>
              <!-- 密码 -->
              <el-form-item label="密码" prop="password">
                <el-input type="text" v-model="editForm.password" autocomplete="off"></el-input>
              </el-form-item>
              <!-- 用户组 -->
              <el-form-item label="选择用户组" prop="usergroup">
                <el-select v-model="editForm.usergroup" placeholder="请选择用户组">
                  <el-option label="超级管理员" value="超级管理员"></el-option>
                  <el-option label="普通用户" value="普通用户"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
            </div>
          </el-dialog>

          <!-- 选择按钮 -->
          <div style="margin-top: 20px">
            <el-button type="danger" @click="batchDel">批量删除</el-button>
            <el-button @click="toggleSelection">取消选择</el-button>
          </div>
        </div>
      </el-card>
    </el-main>
    <!-- 尾部 -->
    <Footer></Footer>
  </div>
</template>
<script>
import moment from "moment";
import qs from 'qs';

import Header from "@/components/Header/Header.vue";
import Footer from "@/components/Footer/Footer.vue";

export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      dialogFormVisible: false, 
      tableData: [], 
      editId: '', 
      seletedUser: [],
      editForm: { 
        username: "",
        password: "",
        usergroup: ""
      },
      // 验证字段 
      rules: {
        // 验证用户名
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" }, // 非空验证
          { min: 3, max: 6, message: "长度必须 3 到 6 个字符", trigger: "blur" } // 长度验证
        ],
        // 验证密码
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }, // 非空验证
          { min: 3, max: 6, message: "长度必须 3 到 6 个字符", trigger: "blur" } // 长度验证
        ],
        // 验证用户组
        usergroup: [
          { required: true, message: "请选择用户组", trigger: "change" } // 非空验证
        ]
      }
    };
  },
 
  methods: {
    handleEdit(id) {
      this.editId = id;

      this.axios.get(`http://127.0.0.1:3000/users/edituser?id=${id}`)
        .then(response => {
          this.editForm.username = response.data[0].username;
          this.editForm.password = response.data[0].password;
          this.editForm.usergroup = response.data[0].usergroup;

          this.dialogFormVisible = true;
        })
    },
    handleDelete(id) {
      this.axios
        .get(`http://192.168.20.1:3000/users/deluser?id=${id}`)
        .then(response => {
          if (response.data.rstCode === 1) {
            this.$message({
              type: "success",
              message: response.data.msg
            });
            this.getUserList();
          } else {
            this.$message.error(response.data.msg);
          }
        });
    },
    toggleSelection() {
        this.$refs.userlist.clearSelection();
    },
    handleSelectionChange(val) {
 
      this.seletedUser = val;
    },
    batchDel () { 
      let idArr = this.seletedUser.map( v => v.id );

      if (!idArr.length) {
        this.$message.error('请选择以后再操作! 你是不是傻！')
        return
      }
      let param = {
        idArr: JSON.stringify(idArr)
      }

      this.axios.post('http://127.0.0.1:3000/users/batchdel', 
      qs.stringify(param), 
      { Header: { 'Content-Type': 'application/x-www-form-urlencoded' } } // 设置请求头
      ).then(response => {
        if (response.data.rstCode === 1) {
          this.$message({
            type: 'success',
            message: response.data.msg
          })
          this.getUserList();
        } else {
          this.$message.error(response.data.msg)
        }
      })
    },
    getUserList() {
      this.axios
        .get("http://192.168.20.1:3000/users/userlist")
        .then(response => { 
          this.tableData = response.data;
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            username: this.editForm.username,
            password: this.editForm.password,
            usergroup: this.editForm.usergroup,
            editId: this.editId
          }
          this.axios.post('http://127.0.0.1:3000/users/saveedit',
          qs.stringify(params),
          { Header: { 'Content-Type': 'application/x-www-form-urlencoded' } }
          ).then(response => {
            if (response.data.rstCode === 1) {
              this.$message({
                type: 'success',
                message: response.data.msg
              })
              this.getUserList()
            } else {
              this.$message.error(response.data.msg);
            }
          })
          this.dialogFormVisible = false;
        } else {
          console.log("前端验证不通过, 不能发送");
          return false;
        }
      });
    }
  },
  created() {
    this.getUserList();
  },
  filters: {
 
    formatCdate(value) {
      return moment(value).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>
<style lang="less">
.user-manage {
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
        .el-dialog {
          .el-dialog__header {
            font-weight: 700;
          }
          .el-dialog__body {
            .el-form {
              width: 80%;
            }
          }
        }
      }
    }
  }
}
</style>


