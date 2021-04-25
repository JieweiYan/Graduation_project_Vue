<template>
  <div>
    <p style="font-weight: bold; font-size: 18px">搜索帖子</p>
    <div style="margin-bottom: 15px">
      <el-input v-model="input" placeholder="请输入关键词"
                @keyup.enter.native="submit" style="width: 300px">
      </el-input>
      <el-button type="primary" style="margin-left: 10px" @click="submit">搜索</el-button>
    </div>


    <el-card class="box-card" shadow="hover" v-for="(item, index) in postlist">
      <el-row style="align-content: center; margin: 10px">
        <el-col :span="3" @click.native="gotousercenter(index)">
          <div>
            <el-avatar :size="45" shape="square"
                       v-bind:src="item.useravatar"></el-avatar>
            <p style="font-size: 12px; margin: 5px ">{{ item.username }}</p>
          </div>
        </el-col>
        <el-col :span="16">
          <div>
            <el-link type="primary" style="font-size: 14px" @click="gotoreadpost(index)">{{item.title}}</el-link>
<!--            <p style="font-size: 13px">我想问一下这样到底怎么举报还是说我们拿这种人无能为力？举报原因只有这么几</p>-->
          </div>
        </el-col>
        <el-col :span="3">
          <div>
            <p style="font-size: 13px"><i class="el-icon-chat-square" style="color: #838589; size: 25px"></i>{{item.reply}}</p>
          </div>
        </el-col>
        <el-col :span="2">
          <div>
            <p style="font-size: 12px">{{item.date}}</p>
          </div>
        </el-col>

      </el-row>
    </el-card>

    <el-pagination
        style="margin: 15px"
        background
        :current-page="currentPage"
        :hide-on-single-page="true"
        @current-change="handleCurrentChange"
        :page-size="10"
        layout="prev, pager, next"
        :total="totlepost">
    </el-pagination>


  </div>
</template>

<script>
export default {
  name: "searchpost",
  data() {
    return {
      totlepost:0,
      currentPage: 1,
      input: '',
      postlist:[{
        id:'',
        userid:'',
        useravatar:'',
        username:'',
        title:'',
        content:'',
        reply:'',
        view:'',
        lastpost:'',
        date:'',
      }],
    };
  },

  created() {
    this.postlist = [];
  },

  methods: {
    //切换上下页
    handleCurrentChange(val) {
      let this1 = this
      this.currentPage = val
      axios.post('http://localhost:8100/postcontent/searchpostnum', {tag:this.input}).then(function (resp){
        console.log(this1.input)
        this1.totlepost = resp.data
        console.log(resp.data)
      })
      axios.post('http://localhost:8100/postcontent/searchpost/'+val, {tag:this.input}).then(function (resp) {
        this1.postlist = resp.data.records
        for(var i = 0; i < this1.postlist.length; i++){
          var date = new Date();
          var postdate = new Date(this1.postlist[i].lastpost)
          if(date.getFullYear() == postdate.getFullYear() && date.getMonth() == postdate.getMonth() && date.getDate()==postdate.getDate()){
            // this1.postlist[i].date = postdate.getHours() + ':' + (postdate.getMinutes() > 9)?postdate.getMinutes():( postdate.getMinutes())
            if(postdate.getMinutes() < 10)
              this1.postlist[i].date = postdate.getHours() + ':0' + postdate.getMinutes()
            else
              this1.postlist[i].date = postdate.getHours() + ':' + postdate.getMinutes()
          }
          else{
            this1.postlist[i].date = (postdate.getMonth()+1) + '-' + postdate.getDate()
          }
        }

      })
    },
    gotosearch() {
      this.$router.push('/search')
    },
    gotousercenter(index) {
      this.$router.push({path:'/usercenter', query:{id:this.postlist[index].userid}})
    },
    gotoreadpost(index) {
      this.$router.push({path:'/forum/readpost', query:{postid:this.postlist[index].id}})
    },
    submit(){
      var this1 = this
      axios.post('http://localhost:8100/postcontent/searchpostnum', {tag:this.input}).then(function (resp){
        if(resp.data == 0){
          this1.$message({
            message: '啥也没搜到哦！试着换换关键词吧',
            type: 'warning'
          });
        }
        this1.totlepost = resp.data
      })
      axios.post('http://localhost:8100/postcontent/searchpost/1', {tag:this.input}).then(function (resp) {
        this1.postlist = resp.data.records
        for(var i = 0; i < this1.postlist.length; i++){
          var date = new Date();
          var postdate = new Date(this1.postlist[i].lastpost)
          if(date.getFullYear() == postdate.getFullYear() && date.getMonth() == postdate.getMonth() && date.getDate()==postdate.getDate()){
            // this1.postlist[i].date = postdate.getHours() + ':' + (postdate.getMinutes() > 9)?postdate.getMinutes():( postdate.getMinutes())
            if(postdate.getMinutes() < 10)
              this1.postlist[i].date = postdate.getHours() + ':0' + postdate.getMinutes()
            else
              this1.postlist[i].date = postdate.getHours() + ':' + postdate.getMinutes()
          }
          else{
            this1.postlist[i].date = (postdate.getMonth()+1) + '-' + postdate.getDate()
          }
        }
      })
    },
  }

}
</script>

<style scoped>

</style>
