<template>
    <div class="index">
        <el-container>
            <el-aside width="200px">
                <template>
                    <el-menu :default-active="$route.path" :unique-opened="true" active-text-color="rgb(64, 158, 255)" background-color="#2d3a4b" router>
                        <el-submenu index='0'>
                            <template slot="title"><i class="el-icon-setting"></i>系统管理</template>
                            <el-menu-item index='/'>
                                <i class="el-icon-menu"></i>
                                系统信息
                            </el-menu-item>
                        </el-submenu>
                        <!-- 导航一 -->
                        <el-submenu index="1">
                            <template slot="title"><i class="el-icon-message"></i>账号管理</template>
                            <el-menu-item index="/usermanage">账号管理</el-menu-item>
                            <el-menu-item index="/useradd">添加账号</el-menu-item>
                            <el-menu-item index="/editpassword">密码修改</el-menu-item>
                        </el-submenu>

                        <!-- 导航二 -->
                        <el-submenu index="2">
                            <template slot="title"><i class="el-icon-menu"></i>商品管理</template>
                            <el-menu-item index="/goodsmanage">商品管理</el-menu-item>
                            <el-menu-item index="/goodsadd">添加商品</el-menu-item>
                        </el-submenu>

                        <!-- 导航三 -->
                        <el-submenu index="3">
                            <template slot="title"><i class="el-icon-setting"></i>统计管理</template>
                            <el-menu-item index="/salescharts">销售统计</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </template>
            </el-aside>
            <!-- 头部 -->
            <template>
                <div class="header">
                    <el-header>
                        <h1 class="title">
                            <i class="el-icon-menu"></i>
                            华联超市管理系统
                        </h1>
                        <!-- 当前登录用户名 -->
                        <div class="username">
                            <!-- 下拉框 -->
                            <el-dropdown trigger="click">
                                <span class="el-dropdown-link">
                                    Admin <i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>个人中心</el-dropdown-item>
                                    <el-dropdown-item>退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <div class="avatar">
                                <img style="border-radius: 50%;" width="50px" height="50px" src="./avatar.jpg" alt="">
                            </div>
                        </div>
                    </el-header>
                </div>
            </template>
            <!-- 页脚 -->
            <template>
    <div class="footer">
        <el-footer>
            &copy; CopyRight 2018 华联超市管理系统
        </el-footer>
    </div>
</template>
        </el-container>

    </div>
</template>
<script>
export default {};
</script>
<style lang="less">
.index {
  height: 100%;
  .el-container {
    height: 100%;
    .el-aside {
      background: #ff6600;
      color: #fff;
    }
  }
}
.header {
        // 头
       .el-header {
           position: relative;
           height: 60px;
           line-height: 60px;
           background-color: #ffffff;
           text-align: right;
           border-bottom: 1px solid rgba(0, 0, 0, 0.1);
           .title {
               margin: 0;
               position: absolute;
               height: 60px;
               line-height: 60px;
           }
           .username {
               vertical-align: top;
               display: inline-block;
               height: 60px;
               line-height: 60px;
               margin-right: 20px;
               .avatar {
                   vertical-align: top;
                   margin-top: 5px;
                   display: inline-block;
                   margin-left: 10px;
                   height: 50px;
                   line-height: 50px;
                   border-radius: 50%;
                   text-align: center;
                   background-color: red;
               }
           }
       }
    }
    .footer {
        // 尾部
        .el-footer {
            height: 60px;
            line-height: 60px;
            background-color: #ffffff;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
            font-size: 12px;
            color: #2d3a4b;
        }
    }
</style>


