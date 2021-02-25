<template>
  <div>
    <el-container style=" border: 1px solid #eee">
      <div style="margin: 8px; min-height: 500px">
        <el-aside width="300px" style=" background: #ffffff">
          <div style="padding: 30px;line-height: 10px">
            <el-avatar :size="100" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            <p  style="font-weight: bold; font-size: 18px; margin: 15px ">
              <i v-bind:style="sex=='nan'?'color:lightskyblue':'color:hotpink'"
                 :class="sex=='nan'?'el-icon-male':'el-icon-female'"></i>{{username}}</p>
            <p  style="font-size: 14px; margin: 15px">{{introduce}}</p>
            <div style="text-align: left; line-height:20px; font-size: 14px;margin-top: 25px">
              <p>真实姓名：{{name}}</p>
              <p>现居地：{{location}}</p>
              <p>微信号：{{wechatnum}}</p>
              <p>专业班级：{{start_year}}{{subject}}{{class_}}</p>
              <p>职业：{{profession}}</p>
              <p>个人简介：{{profile}}</p>
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
              <el-menu-item index="1" @click="gotopost()">
                <span slot="title">发帖</span>
              </el-menu-item>
              <el-menu-item index="2" @click="gotoreply()">
                <span slot="title">回复</span>
              </el-menu-item>
              <el-menu-item index="3" @click="gotoalbum()">
                <span slot="title">相册</span>
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
      sex:'nan',
      name:'严捷伟',
      username:"Serati Ma",
      wechatnum: 'YanJiewei_',
      subject: '网络工程',
      start_year: '2017级',
      class_: '1班',
      location:'浙江省杭州市',
      profession: '程序猿',
      introduce:'海纳百川，有容乃大',
      profile: '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
    }
  },
  methods: {
    submitForm(formName) {

    },
    gotopost() {
      this.$router.push('/usercenter/post')
    },
    gotoreply() {
      this.$router.push('/usercenter/reply')
    },
    gotoalbum() {
      this.$router.push('/usercenter/album')
    },
  }
};
</script>
