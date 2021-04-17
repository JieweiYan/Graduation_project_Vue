<template>
  <div>
    <el-container style=" border: 1px solid #eee">
      <div style="margin: 8px; min-height: 500px">
        <el-aside width="350px" style=" background: #ffffff">
          <div style="padding: 30px;line-height: 10px">
            <p style="font-weight: bold; font-size: 17px">网络工程2017级1班</p>
            <div id="wrap" @click.native="gotousercenter">
              <div v-for="item in repeat" style="margin: 10px">
                <el-avatar :size="50"
                           src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                <p style="font-size: 12px">
                  <i v-bind:style="sex=='nan'?'color:lightskyblue':'color:hotpink'"
                     :class="sex=='nan'?'el-icon-male':'el-icon-female'"></i>严捷伟</p>
              </div>
            </div>


          </div>
        </el-aside>
      </div>

      <div style=" width: 800px; margin: 8px; ">
        <el-container width="800px" style="min-height: 830px;">
          <el-header width="800px">
            <el-menu
                mode="horizontal"
                default-active="1"
                class="el-menu-vertical-demo">
              <el-menu-item index="1" @click="gotochatroom()">
                <span slot="title">聊天室</span>
              </el-menu-item>
              <el-menu-item index="2" @click="gotoclassalbum()">
                <span slot="title">班级相册</span>
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
  name: "addresslist",
  data() {
    return {
      repeat: ['1', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3'],
      sex: 'nan',
    }
  },
  methods: {
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },
    gotousercenter() {
      this.$router.push('/usercenter')
    },
    gotochatroom() {
      this.$router.push('/addresslist/chatroom')
    },
    gotoclassalbum() {
      this.$router.push('/addresslist/classalbum')
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

#wrap {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
</style>
