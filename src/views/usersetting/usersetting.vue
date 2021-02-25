<template>
  <div>
    <el-container style="min-height: 830px; border: 1px solid #eee ">

      <el-aside width="200px" style="background-color: #ffffff; ">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
                default-active="1"
                class="el-menu-vertical-demo">
              <el-menu-item index="1" @click="gotochangeinfo()">
                <i class="el-icon-menu"></i>
                <span slot="title">修改信息</span>
              </el-menu-item>
              <el-menu-item index="2" @click="gotochangeavatar()">
                <i class="el-icon-camera-solid"></i>
                <span slot="title">更换头像</span>
              </el-menu-item>
              <el-menu-item index="3" @click="gotochangepwd()">
                <i class="el-icon-document"></i>
                <span slot="title">修改密码</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>

      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>



.el-aside {
  color: #333;
}
</style>

<script>
export default {
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(10).fill(item)
    }
  },
  methods: {
    submitForm(formName) {

    },
    gotochangeinfo() {
      this.$router.push('/usersetting/changeinfo')
    },
    gotochangeavatar() {
      this.$router.push('/usersetting/changeavatar')
    },
    gotochangepwd() {
      this.$router.push('/usersetting/changepwd')
    },
  }
};
</script>
