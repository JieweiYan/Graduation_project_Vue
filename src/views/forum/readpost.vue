<template>
  <div>

    <p style="font-weight: bold; font-size: 18px;">{{ title }}</p>
    <el-card class="box-card" shadow="never" v-for="(item, index) in postlist">
      <el-row style="align-content: center; margin: 10px">
        <el-col :span="2" @click.native="gotousercenter(index)">
          <div>
            <el-avatar :size="45" shape="square"
                       v-bind:src="item.useravatar"></el-avatar>
            <p style="font-size: 12px; margin: 5px ">{{item.username}}</p>
          </div>
        </el-col>
        <el-col :span="22" style="text-align: left">
          <div style="margin: 0px 10px 10px 10px">
            <p style="font-size: 15px" v-html="item.content"></p>
          </div>
        </el-col>
      </el-row>
      <el-row style="align-content: center; margin: 1px">
        <el-col style="text-align: right">
          <p style="font-size: 12px; color: #838589">{{ ((index)+(currentPage - 2)*11 + 12) + (currentPage>1?1:0) }}楼 {{item.date}}</p>
        </el-col>
      </el-row>
    </el-card>

    <el-pagination
        background
        :current-page="currentPage"
        :page-size="11"
        @current-change="handleCurrentChange"
        :hide-on-single-page="true"
        layout="prev, pager, next"
        :total="totlepost">
    </el-pagination>


<!--    <p style="font-size: 17px; font-weight: bold; text-align: center">发表回复</p>-->
    <div style="border: 1px solid lightgray; min-height: 300px; text-align: left; margin-top: 20px">
      <section>
        <div id="div5"></div>
        <div id="div6"></div>
      </section>
    </div>

    <div style="text-align: center; margin: 10px">
      <el-button type="primary"  @click="submit">回复</el-button>
    </div>


  </div>
</template>


<script>
var editor = new Editor("#div5", "#div6");
//script部分
import Editor from "wangeditor";


export default {
  name: "readpost",
  data() {
    return {
      postid:'',
      totlepost:0,
      currentPage: 1,
      title:'',
      mainpostid:'',
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
        time:'',
        date:'',
      }],
    }
  },
  created() {
    var postid = this.$route.query.postid
    this.postid = postid
    var this1 = this
    axios.get('http://localhost:8100/postcontent/findpostnumbyid/'+postid).then(function (resp){
      this1.totlepost = resp.data
    })
    axios.get('http://localhost:8100/postcontent/findpostbyid/'+postid+'/'+this.currentPage).then(function (resp){
      this1.title = resp.data.mainposttitle
      console.log(resp.data)
      this1.postlist = resp.data.mainpost
      this1.postlist = this1.postlist.concat(resp.data.replypostlist.records)
      this1.mainpostid = this1.postlist[0].id
      for(var i = 0; i < this1.postlist.length; i++){
        var postdate = new Date(this1.postlist[i].time)
        if(postdate.getMinutes() < 10)
          this1.postlist[i].date = postdate.getFullYear()+'-'+postdate.getMonth()+'-'+postdate.getDate()+' '+postdate.getHours() + ':0' + postdate.getMinutes()
        else
          this1.postlist[i].date = postdate.getFullYear()+'-'+postdate.getMonth()+'-'+postdate.getDate()+' '+postdate.getHours() + ':' + postdate.getMinutes()
      }
    })
  },

  methods: {
    gotousercenter(index) {
      let userid = this.postlist[index].userid
      this.$router.push('/usercenter')
    },
    //想获取文本编译框内的html，可以添加事件获取
    submit(){
      var xss = require("xss");
      const safeHtml = xss(editor.txt.html())
      this.post.content = safeHtml;
      console.log(safeHtml)
      var this1 = this
      var id = window.localStorage.getItem("id")
      var token = window.localStorage.getItem("token")
      axios.post('http://localhost:8100/postcontent/reply/'+this.mainpostid +'/'+id+'/'+token, this.post).then(function (resp) {
        if(resp.data == ""){
          window.localStorage.clear()
          this1.$message.error("出了一点小问题，请您重新登录哦！")
          this1.$router.go(0)
        }
        else{
          this1.$message.success("回复成功！")
          this1.$router.go(0)
        }
      })
    },

    handleCurrentChange(val) {
      this.currentPage = val
      var this1 = this
      var postid = this.postid
      axios.get('http://localhost:8100/postcontent/findpostnumbyid/'+postid).then(function (resp){
        this1.totlepost = resp.data
        console.log(this1.totlepost)
      })
      axios.get('http://localhost:8100/postcontent/findpostbyid/'+postid+'/'+this.currentPage).then(function (resp){
        console.log(resp)
        this1.title = resp.data.mainposttitle
        if(this1.currentPage == 1){
          this1.postlist = resp.data.mainpost
          this1.postlist = this1.postlist.concat(resp.data.replypostlist.records)
          for(var i = 0; i < this1.postlist.length; i++){
            var postdate = new Date(this1.postlist[i].time)
            if(postdate.getMinutes() < 10)
              this1.postlist[i].date = postdate.getFullYear()+'-'+postdate.getMonth()+'-'+postdate.getDate()+' '+postdate.getHours() + ':0' + postdate.getMinutes()
            else
              this1.postlist[i].date = postdate.getFullYear()+'-'+postdate.getMonth()+'-'+postdate.getDate()+' '+postdate.getHours() + ':' + postdate.getMinutes()
          }
        }
        else{
          this1.postlist = resp.data.replypostlist.records
          for(var i = 0; i < this1.postlist.length; i++){
            var postdate = new Date(this1.postlist[i].time)
            if(postdate.getMinutes() < 10)
              this1.postlist[i].date = postdate.getFullYear()+'-'+postdate.getMonth()+'-'+postdate.getDate()+' '+postdate.getHours() + ':0' + postdate.getMinutes()
            else
              this1.postlist[i].date = postdate.getFullYear()+'-'+postdate.getMonth()+'-'+postdate.getDate()+' '+postdate.getHours() + ':' + postdate.getMinutes()
          }
        }

      })
    },
  },
  mounted() {

    editor.config.menus = [
      'head',
      'bold',
      'fontSize',  // 字号
      'italic',
      'underline',
      'justify',  // 对齐方式
      'emoticon',  // 表情
      'image',  // 插入图片
      'link', // 插入链接
      'list', // 列表
      // 'code', // 插入代码
      // 'video',
      'undo',  // 撤销
    ]
    editor.config.uploadImgShowBase64 = true;
    editor.config.uploadImgServer = 'http://localhost:8100/postcontent/uploadpic'
    editor.config.uploadImgMaxLength = 1;
    editor.config.uploadFileName = 'myFile';
    editor.config.uploadImgMaxSize = 5 * 1024 * 1024;
    editor.config.pasteIgnoreImg = true
    editor.config.uploadImgTimeout = 20 * 1000
//可使用监听函数在上传图片的不同阶段做相应处理
    editor.create();
  },

}
</script>

<style scoped>

</style>
