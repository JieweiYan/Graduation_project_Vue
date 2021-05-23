<template>
  <div>
    <el-container style=" border: 1px solid #eee">

      <div style=" width: 800px; margin: 8px; ">
        <el-container width="800px" style="min-height: 830px;">
          <el-header width="800px">
            <el-menu
                mode="horizontal"
                class="el-menu-vertical-demo">
              <el-menu-item index="1" @click="gotoread()">
                <span slot="title">看帖</span>
              </el-menu-item>
<!--              <el-menu-item index="2" @click="gotoboutique()">-->
<!--                <span slot="title">精品</span>-->
<!--              </el-menu-item>-->
              <el-menu-item index="3" @click="gotonotice()">
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

          <el-card class="box-card" shadow="hover" style="margin: 8px; ">
            <p style="font-weight: bold; font-size: 18px;">今日热榜</p>
            <el-row style="align-content: center; text-align: center; vertical-align: middle; " v-for="(item, index) in todayhotlist" >
              <div style="height: 40px">
                <el-col :span="20" style="height: 100%; vertical-align: middle">
                  <div style="height: 100%" @click="todaygotoreadpost(index)">
                    <el-link type="primary"
                             style="font-size: 14px; display:block; text-align: center;line-height:40px; " >{{item.title}}
                    </el-link>
                  </div>
                </el-col>
                <el-col :span="4" style="height: 100%; vertical-align: middle ">
                  <div>
                    <p style="font-size: 13px"><i class="el-icon-view" style="color: #838589; size: 28px"></i>{{item.view}}</p>
                  </div>
                </el-col>
              </div>
            </el-row>
          </el-card>

          <el-card class="box-card" shadow="hover" style="margin: 8px; ">
            <p style="font-weight: bold; font-size: 18px;">本周热榜</p>
            <el-row style="align-content: center; text-align: center; vertical-align: middle; " v-for="(item, index) in weekhotlist" >
              <div style="height: 40px" >
                <el-col :span="20" style="height: 100%; vertical-align: middle">
                  <div style="height: 100%" @click="weekgotoreadpost(index)">
                    <el-link type="primary"
                             style="font-size: 14px; display:block; text-align: center;line-height:40px; ">{{item.title}}
                    </el-link>
                  </div>
                </el-col>
                <el-col :span="4" style="height: 100%; vertical-align: middle ">
                  <div>
                    <p style="font-size: 13px"><i class="el-icon-view" style="color: #838589; size: 28px"></i>{{item.view}}</p>
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
      weekhotlist:[{title:'', id:'', view:''}],
      todayhotlist:[{title:'', id:'', view:''}],
    }
  },
  created() {
    let this1 = this
    axios.get('http://localhost:8100/postcontent/weekhotlist').then(function (resp){
      this1.weekhotlist = resp.data
      for(var i = 0; i < this1.weekhotlist.length; i++){
        //如果标题太长，则截取并且加省略号
        if(this1.weekhotlist[i].title.length > 13){
          this1.weekhotlist[i].title = this1.weekhotlist[i].title.substr(0, 13) + "...";
        }
      }
    })
    axios.get('http://localhost:8100/postcontent/todayhotlist').then(function (resp){
      this1.todayhotlist = resp.data
      for(var i = 0; i < this1.todayhotlist.length; i++){
        //如果标题太长，则截取并且加省略号
        if(this1.todayhotlist[i].title.length > 13){
          this1.todayhotlist[i].title = this1.todayhotlist[i].title.substr(0, 13) + "...";
        }
      }
    })
  },
  methods: {
    gotoread() {
      this.$router.push('/forum/read')
    },
    gotoboutique() {
      this.$router.push('/forum/boutique')
    },
    gotonotice() {
      this.$router.push('/forum/notice')
    },
    todaygotoreadpost(index){
      // this.$router.push({path:'/forum/readpost', query:{postid:this.todayhotlist[index].id}})
      this.$router.push('/forum/readpost?postid=' + this.todayhotlist[index].id)
      this.$router.go(0)
    },
    weekgotoreadpost(index){
      this.$router.push('/forum/readpost?postid=' + this.weekhotlist[index].id)
      this.$router.go(0)
    }

  }
};
</script>
