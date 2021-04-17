<template>
  <div>
    <el-container style=" border: 1px solid #eee">
      <div style="margin: 8px; min-height: 500px">
        <el-aside width="300px" style=" background: #ffffff">
          <div style="padding: 30px;line-height: 10px">
            <el-avatar :size="100"
                       src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            <p style="font-weight: bold; font-size: 18px; margin: 15px ">
              <i v-bind:style="user.sex=='nan'?'color:lightskyblue':'color:hotpink'"
                 :class="user.sex=='nan'?'el-icon-male':'el-icon-female'"></i>{{user.name}}</p>
            <p style="font-size: 14px; margin: 15px; min-height: auto">{{user.introduce}}</p>
            <div style="text-align: left; line-height:20px; font-size: 14px;margin-top: 25px">
              <p>现居地：{{user.location}}</p>
              <p>微信号：{{user.wechatnum}}</p>
              <p>专业班级：{{user.start_year}}{{user.subject}}{{user.class1}}</p>
              <p>职业：{{user.profession}}</p>
              <p>个人简介：{{user.profile}}</p>
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
import Vuex from 'vuex'
export default {
  data() {
    return {
      user: {
        // id: '1',
        sex: 'nan',
        name: '严伟',
        username: "皮这一下真的非常开心",
        wechatnum: 'YanJiewei_',
        subject: '网络工程',
        start_year: '2017级',
        class1: '1班',
        location: '浙江省杭州市',
        profession: '程序猿',
        introduce: '海纳百川，有容乃大, 海纳百chua',
        profile: '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
      }
    }
  },
  created(){
    console.log("hhhhhh")
    const this1 = this
    axios.get('http://localhost:8100/user/findbyid/1', this.form).then(function (resp){
      console.log(resp)
      this1.user = resp.data
    })
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
