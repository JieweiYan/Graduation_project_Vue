<template>
  <div>
    <el-card class="box-card" shadow="hover" v-for="(item,index) in postlist">
      <el-row style="align-content: center; margin: 10px">
        <el-col :span="3">
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
            <p style="font-size: 13px"><i class="el-icon-chat-square" style="color: #838589; size: 25px"></i>{{ item.reply }}</p>
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
        background
        :current-page="currentPage"
        @current-change="handleCurrentChange"
        :page-size="10"
        :hide-on-single-page="true"
        layout="prev, pager, next"
        :total="totlepost">
    </el-pagination>

  </div>
</template>

<script>
export default {
  name: "post",
  data() {
    return {
      id:'',
      repeat: ['1', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3'],
      totlepost:0,
      currentPage: 1,
      post:{title:'', content:''},
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
    }
  },
  created() {
    if(this.$route.query.id != null)
      this.id = this.$route.query.id
    else
      this.id = window.localStorage.getItem("id")
    let this1 = this
    axios.get('http://localhost:8100/postcontent/searchpostnumbyuserid/'+this.id).then(function (resp){
      this1.totlepost = resp.data
    })
    axios.get('http://localhost:8100/postcontent/searchpost/'+this.id+'/'+this1.currentPage).then(function (resp){
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
  methods: {
    gotoreadpost(index) {
      this.$router.push({path:'/forum/readpost', query:{postid:this.postlist[index].id}})
    },

    handleCurrentChange(val) {
      this.currentPage = val
      var this1 = this
      axios.get('http://localhost:8100/postcontent/searchpostnumbyuserid/' + this.id).then(function (resp) {
        this1.totlepost = resp.data
      })
      axios.get('http://localhost:8100/postcontent/searchpost/'+this.id+'/'+this1.currentPage).then(function (resp){
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
    }
  },
}
</script>

<style scoped>

</style>
