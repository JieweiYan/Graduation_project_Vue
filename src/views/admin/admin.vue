<template>
  <div style="width: 850px; align-content: center; line-height: 20px; margin: 0px auto 0px auto; background: #ffffff">
    <div style=" width: 800px; margin: 8px; ">
      <el-container width="850px" style="min-height: 830px;">
        <el-header width="850px" style="background: #ffffff">
          <el-menu
              mode="horizontal"
              default-active="1"
              class="el-menu-vertical-demo">
            <el-menu-item index="1" @click="gotousermanage">
              <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="2" @click="gotopostmanage">
              <span slot="title">帖子管理</span>
            </el-menu-item>
          </el-menu>
        </el-header>
        <el-main style="line-height: normal">
          <router-view></router-view>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    gotousercenter(id) {
      //传递参数给usercenter页面
      this.$router.push({path:'/usercenter', query: { id: id}})
    },
    gotousermanage() {
      this.$router.push('/admin/usermanage')
    },
    gotopostmanage() {
      this.$router.push('/admin/postmanage')
    },
  }
}
</script>



<style scoped>

</style>
