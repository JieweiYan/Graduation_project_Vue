<template>
  <div>
    <el-container style="height: 2000px;border: 1px solid #eee">
      <el-header
          style="text-align: right;
          font-size: 12px;
          height: 70px;
          text-align: center;
          vertical-align: center">
        <el-row type="flex" class="row-bg grid-content bg-purple" justify="center" align="middle">
          <el-col :span="5">
            <div style="height: 65px">
              <a><img src="../assets/image/ncu.png" width="189px" height="60px"></a>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple">
              <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">
                  <router-link to="/home">首页</router-link>
                </el-menu-item>
                <el-menu-item index="2">
                  <router-link to="/forum">论坛</router-link>
                </el-menu-item>
                <el-menu-item index="3">
                  <router-link to="/directory">通讯录</router-link>
                </el-menu-item>
                <el-menu-item index="4">
                  <router-link to="/activity">活动</router-link>
                </el-menu-item>
              </el-menu>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">
              <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-submenu index="8">
                  <template slot="title">
                    <el-avatar :size="30" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    <span slot="title" style="margin-left: 10px">严捷伟</span>
                  </template>
                  <el-menu-item>
                    <router-link to="/user">个人中心</router-link>
                  </el-menu-item>
                  <el-menu-item>退出登录</el-menu-item>
                </el-submenu>
              </el-menu>
            </div>
          </el-col>
        </el-row>
      </el-header>


      <el-main>
        <router-view></router-view>
      </el-main>


      <el-footer>
        <template>
          <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
        </template>
      </el-footer>
    </el-container>
  </div>
</template>


<style>
.el-header, .el-footer {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

a {
  text-decoration: none;
  active-text-color: #303133;
  color: #838589;
}

.router-link-active {
  text-decoration: none;
  /*active-text-color:#303133;*/
  color: #838589;
}

.el-row {
  margin-bottom: 5px;

&
:last-child {
  margin-bottom: 0;
  height: 100%;
}

}
.el-col {
  border-radius: 4px;
  justify-content: center; /*主轴上居中*/
  align-items: center; /*侧轴上居中*/
}

.item {
  height: 10px;
  width: 10px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #ffffff;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 5px 0;
  background-color: #ffffff;
}

</style>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {


    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>