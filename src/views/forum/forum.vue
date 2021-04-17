<template>
  <div>
    <el-container style=" border: 1px solid #eee">

      <div style=" width: 800px; margin: 8px; ">
        <el-container width="800px" style="min-height: 830px;">
          <el-header width="800px">
            <el-menu
                mode="horizontal"
                default-active="1"
                class="el-menu-vertical-demo">
              <el-menu-item index="1" @click="gotoread()">
                <span slot="title">看帖</span>
              </el-menu-item>
              <el-menu-item index="2" @click="gotoboutique()">
                <span slot="title">精品</span>
              </el-menu-item>
              <el-menu-item index="3" @click="gotoboutique()">
                <span slot="title">公告</span>
              </el-menu-item>

            </el-menu>
          </el-header>
          <el-main style="line-height: normal">
            <router-view></router-view>
          </el-main>
        </el-container>
      </div>


      <div style=" min-height: 500px">
        <el-aside width="300px" style=" background: #E9EEF3; line-height: 15px">
<!--          <el-button type="primary" icon="el-icon-search">发新帖</el-button>-->
          <el-card class="box-card" shadow="hover" style="margin: 8px; ">
            <p style="font-weight: bold; font-size: 18px;">今日热榜</p>
            <el-row style="align-content: center; text-align: center; vertical-align: middle; " v-for="item in repeat">
              <div style="height: 40px">
                <el-col :span="20" style="height: 100%; vertical-align: middle">
                  <div style="height: 100%">
                    <el-link type="primary"
                             style="font-size: 14px; display:block; text-align: center;line-height:40px; ">我想问一下这样到底怎么举报
                    </el-link>
                  </div>
                </el-col>
                <el-col :span="4" style="height: 100%; vertical-align: middle ">
                  <div>
                    <p style="font-size: 13px"><i class="el-icon-view" style="color: #838589; size: 28px"></i>130</p>
                  </div>
                </el-col>
              </div>
            </el-row>
          </el-card>


          <el-card class="box-card" shadow="hover" style="margin: 8px; ">
            <p style="font-weight: bold; font-size: 18px;">本周热榜</p>
            <el-row style="align-content: center; text-align: center; vertical-align: middle; " v-for="item in repeat">
              <div style="height: 40px">
                <el-col :span="20" style="height: 100%; vertical-align: middle">
                  <div style="height: 100%">
                    <el-link type="primary"
                             style="font-size: 14px; display:block; text-align: center;line-height:40px; ">我想问一下这样到底怎么举报
                    </el-link>
                  </div>
                </el-col>
                <el-col :span="4" style="height: 100%; vertical-align: middle ">
                  <div>
                    <p style="font-size: 13px"><i class="el-icon-view" style="color: #838589; size: 28px"></i>130</p>
                  </div>
                </el-col>
              </div>
            </el-row>
          </el-card>
        </el-aside>
      </div>


    </el-container>


  </div>
</template>

<style>
.el-header {
  background-color: #ffffff;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  data() {
    return {
      repeat: ['1', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3'],
    }
  },
  methods: {
    submitForm(formName) {

    },
    gotoread() {
      this.$router.push('/forum/read')
    },
    gotoboutique() {
      this.$router.push('/forum/boutique')
    },

  }
};
</script>
