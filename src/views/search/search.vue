<template>
  <div style="text-align: center">
    <el-container style=" border: 1px solid #eee">



      <div style=" width: 800px; margin: auto; ">
        <el-container width="800px" style="min-height: 830px; ">
          <el-header width="800px">
            <el-menu
                mode="horizontal"
                default-active="1"
                class="el-menu-vertical-demo">
              <el-menu-item index="1" @click="gotosearchpost()">
                <span slot="title">搜索帖子</span>
              </el-menu-item>
              <el-menu-item index="2" @click="gotoclassalbum()">
                <span slot="title">搜索人</span>
              </el-menu-item>
            </el-menu>
          </el-header>

          <el-main style="line-height: normal">
            <router-view></router-view>
          </el-main>

        </el-container>
      </div>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {

      input: '',
    };
  },
  methods:{
    gotosearchpost() {
      this.$router.push('/search/searchpost')
    },
  }
}
</script>

<style scoped>
.el-header {
  background-color: #ffffff;
  color: #333;
  line-height: 60px;
}
</style>
