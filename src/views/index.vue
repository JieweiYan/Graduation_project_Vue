<template>
  <div style="width: 100%">
    <el-container type="flex" style="height: 100%; border: 1px solid #eee; ">
      <el-header style=" height: 75px;background-color: #ffffff;">
        <el-row type="flex" class="row-bg grid-content bg-purple" justify="center" align="middle">
          <el-col :span="4">
            <div style="height: 65px">
<!--/*              <font style="font-size: 32px; font-family: STXingkai">校友云平台</font>*/-->
              <a><img src="../assets/image/ncu.png" width="189px" height="60px"></a>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect">
<!--                <el-menu-item index="1" @click="gotohome()">-->
<!--                  首页-->
<!--                </el-menu-item>-->
                <el-menu-item index="2" @click="gotoforum()">
                  论坛
                </el-menu-item>
                <el-menu-item index="3" @click="gotoaddresslist()">
                  通讯录
                </el-menu-item>
                <el-menu-item index="4" @click="gotoactivity()">
                  活动
                </el-menu-item>
              </el-menu>
            </div>
          </el-col>

          <el-col :span="4">
            <div class="grid-content bg-purple">
              <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item>
                  <el-input v-model="input" size="small" placeholder="搜索人、帖子"
                            @keyup.enter.native="gotosearch">
                    <i class="el-icon-search"
                       slot="suffix"
                       @click="gotosearch">
                    </i>
                  </el-input>
                </el-menu-item>
              </el-menu>

            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">
              <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-submenu index="8">
                  <template slot="title">
                    <el-avatar :size="30" shape="square"
                               v-bind:src="user.avatar"></el-avatar>
                    <span slot="title" style="margin-left: 10px" >{{user.name}}</span>
                  </template>
                  <el-menu-item>
                    <router-link to="/usercenter">
                      <i class="el-icon-user"></i>
                      <span>个人中心</span>
                    </router-link>
                  </el-menu-item>
                  <el-menu-item>
                    <router-link to="/usersetting">
                      <i class="el-icon-setting"></i>
                      <span>个人设置</span>
                    </router-link>
                  </el-menu-item>
                  <el-menu-item @click="exit()">
                      <i class="iconfont icon-tuichu1" style="padding: 6px" ></i>
                      <span>退出登录</span>
                  </el-menu-item>
                </el-submenu>
              </el-menu>
            </div>
          </el-col>
        </el-row>
      </el-header>


      <el-main style="background: #E9EEF3">
        <div style="width: 1100px; min-height: 800px; margin: 0 auto">
          <router-view></router-view>
        </div>

      </el-main>


      <el-footer style="height: auto;background: #E9EEF3;">
        <div style="width: 100%;">
          <p>Design by JieweiYan</p>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>


<style>
.el-header {
  color: #333;
  text-align: center;
  line-height: 60px;
  font-size: 13px;
  vertical-align: center;

}

.el-footer {
  color: #333;
  text-align: center;
  line-height: 30px;
  font-size: 13px;
  vertical-align: center;
}

.el-main {
  background-color: #ffffff;
  color: #333;
  text-align: center;
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
  background: #ffffff;
}

.bg-purple {
  background: #ffffff;
}

.bg-purple-light {
  background: #ffffff;
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
      activeIndex2: '1',
      input: '',
      user:{
        avatar: "https://graduate-project1998.oss-cn-hangzhou.aliyuncs.com/testimage.jpg",
        name: "YanJiewei"
      },
    };
  },
  created() {
    let id = window.localStorage.getItem("id")
    let token = window.localStorage.getItem("token")
    var this1 = this
    axios.get('http://localhost:8100/user/findbyid/'+id+'/'+token, this.ruleForm).then(function (resp){
      this1.user = resp.data
      console.log(resp)
      if(resp.data == ""){
        window.localStorage.clear()
        this1.$message.error("出了一点小问题，请您重新登录哦！")
        this1.$router.go(0)
      }
    })
  },
  methods: {
    change() {
      this.activeIndex2 = '1'
    },
    gotosearch() {
      this.$router.push('/search')
    },
    gotohome() {
      this.$router.push('/home')
    },
    gotoforum() {
      this.$router.push('/forum')
    },
    gotoaddresslist() {
      this.$router.push('/addresslist')
    },
    gotoactivity() {
      this.$router.push('/activity')
    },
    exit(){
      window.localStorage.clear();
      this.$message({
        message: '退出成功！',
        type: 'success'
      });
      this.$router.push('/login')
    },

    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
