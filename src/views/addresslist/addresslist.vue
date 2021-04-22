<template>
  <div>
    <el-container style=" border: 1px solid #eee">
      <div style="margin: 8px; min-height: 500px">
        <el-aside width="350px" style=" background: #ffffff">
          <div style="padding: 30px;line-height: 10px">
            <p style="font-weight: bold; font-size: 17px">{{this.classmatelist[0].subject}}{{this.classmatelist[0].startyear}}{{this.classmatelist[0].class1}}</p>
            <div id="wrap" >
              <div v-for="item in classmatelist" style="margin: 10px" @click="gotousercenter(item.id)">
                <el-avatar :size="50"
                           v-bind:src="item.avatar"></el-avatar>
                <p style="font-size: 12px">
                  <i v-bind:style="item.sex=='男'?'color:lightskyblue':'color:hotpink'"
                     :class="item.sex=='男'?'el-icon-male':'el-icon-female'"></i>{{item.name}}</p>
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
      classmatelist:[
        {id:'', name:'', avatar:'',sex:'', class1:'', startyear:'', subject:''}
      ]
    }
  },
  created() {
    let id = window.localStorage.getItem("id")
    var token = window.localStorage.getItem("token")
    var this1 = this
    axios.get('http://localhost:8100/user/getclassmatelist/'+id+'/'+token).then(function (resp) {
      if(resp.data == ""){
        window.localStorage.clear()
        this1.$message.error("出了一点小问题，请您重新登录哦！")
        this1.$router.go(0)
      }
      this1.classmatelist = resp.data
    })
  },
  methods: {
    gotousercenter(id) {
      //传递参数给usercenter页面
      this.$router.push({path:'/usercenter', query: { id: id}})
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
