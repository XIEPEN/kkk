<template>
  <div class="home">
    <!-- 头部 -->
    <Header></Header>
    <!-- 主体 -->
    <el-main>
      <el-card class="box-card">
        <!-- 面板标题 -->
        <div slot="header" class="clearfix">
          <span>系统信息</span>
        </div>
        <!-- 面板内容 -->
        <div class="text item">
          <el-alert title="消息提示的文案" type="info">
          </el-alert>
          <el-alert title="成功提示的文案" type="success">
          </el-alert>
          <!-- 表格 -->
          <el-row :gutter="20">
            <el-col :span="12">
              <!-- 左侧表格 -->
              <el-card>
                <!-- 面板标题 -->
                <div slot="header" class="clearfix">
                  <span>销售排行</span>
                </div>
                <div class="text item">
                  <!-- 表格 -->
                  <el-table :data="tableDataLeft" style="width: 100%">
                    <el-table-column prop="goodsname" label="商品名称">
                    </el-table-column>
                    <el-table-column prop="sales" label="销量">
                    </el-table-column>
                  </el-table>
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <!-- 右侧表格 -->
              <el-card>
                <!-- 面板标题 -->
                <div slot="header" class="clearfix">
                  <span>缺货的商品</span>
                </div>
                <div class="text item">
                  <!-- 表格 -->
                  <el-table :data="tableDataRight" style="width: 100%">
                    <el-table-column prop="goodsname" label="商品名称">
                    </el-table-column>
                    <el-table-column prop="repertoryCount" label="库存">
                    </el-table-column>
                    <el-table-column prop="option" label="操作">
                    </el-table-column>

                  </el-table>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-main>
    <!-- 尾部 -->
    <Footer></Footer>
  </div>
</template>
<script>
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
    return {
      // 左侧表格数据
      tableDataLeft: [
        {
          goodsname: "李青",
          sales: 4800
        },
        {
          goodsname: "李青",
          sales: 4800
        },
        {
          goodsname: "李青",
          sales: 4800
        },
        {
          goodsname: "李青",
          sales: 4800
        }
      ],
      tableDataRight: [
        {
          goodsname: "李青",
          repertoryCount: 4800,
          option: "入库"
        },
        {
          goodsname: "李青",
          repertoryCount: 4800,
          option: "入库"
        },
        {
          goodsname: "李青",
          repertoryCount: 4800,
          option: "入库"
        },
        {
          goodsname: "李青",
          repertoryCount: 4800,
          option: "入库"
        }
      ]
    };
  }
};
</script>
<style lang="less">
.home {
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
          .el-alert {
            margin-bottom: 20px;
          }
        }
      }
    }
  }
}
</style>


