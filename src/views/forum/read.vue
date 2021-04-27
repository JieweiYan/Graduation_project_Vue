<template>
  <div>
    <el-card class="box-card" shadow="hover" v-for="(item, index) in postlist">
      <el-row style="align-content: center; margin: 10px">
        <el-col :span="3" @click.native="gotousercenter(index)">
          <div>
            <el-avatar :size="45" shape="square"
                       v-bind:src="item.useravatar"></el-avatar>
            <p style="font-size: 12px; margin: 5px ">{{item.username}}</p>
          </div>
        </el-col>
        <el-col :span="16">
          <div>
            <el-link type="primary" style="font-size: 14px" @click="gotoreadpost(index)">{{item.title}}</el-link>
<!--            <p style="font-size: 13px" v-html="item.content"></p>-->
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


<!--    <el-collapse v-model="activeName" accordion v-for="(item, index) in postlist">-->
<!--      <el-collapse-item  v-bind:name="index">-->
<!--        <template slot="title" style="height: 300px">-->
<!--          <el-row style="align-content: center; margin: 10px">-->
<!--            <el-col :span="3" @click.native="gotousercenter">-->
<!--              <div>-->
<!--                <el-avatar :size="45" shape="square"-->
<!--                           v-bind:src="item.useravatar"></el-avatar>-->
<!--                <p style="font-size: 12px; margin: 5px ">{{item.username}}</p>-->
<!--              </div>-->
<!--            </el-col>-->
<!--            <el-col :span="16">-->
<!--              <div>-->
<!--                <el-link type="primary" style="font-size: 14px" @click="gotoreadpost">{{item.title}}</el-link>-->
<!--                <p style="font-size: 13px" v-html="item.content"></p>-->
<!--              </div>-->
<!--            </el-col>-->
<!--            <el-col :span="3">-->
<!--              <div>-->
<!--                <p style="font-size: 13px"><i class="el-icon-chat-square" style="color: #838589; size: 25px"></i>{{ item.reply }}</p>-->
<!--              </div>-->
<!--            </el-col>-->
<!--            <el-col :span="2">-->
<!--              <div>-->
<!--                <p style="font-size: 12px">{{item.lastpost}}</p>-->
<!--              </div>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--        </template>-->
<!--      </el-collapse-item>-->
<!--    </el-collapse>-->



    <el-pagination
        background
        :current-page="currentPage"
        @current-change="handleCurrentChange"
        :page-size="12"
        :hide-on-single-page="true"
        layout="prev, pager, next"
        :total="totlepost">
    </el-pagination>


    <div style="margin: 10px;  text-align: left;" >
      <el-input
          type="text"
          placeholder="标题"
          v-model="post.title"
          maxlength="30"
          show-word-limit
          style="margin: 10px 0px 10px 0px"
      >
      </el-input>
      <div style="border: 1px solid lightgray; min-height: 300px">
        <section>
          <div id="div5"></div>
          <div id="div6"></div>
        </section>
      </div>

      <div style="text-align: center; margin: 10px">
        <el-button type="primary" @click="submit">发布新贴</el-button>
      </div>
    </div>

  </div>
</template>

<script>
var editor = new Editor("#div5", "#div6");
//script部分
import Editor from "wangeditor";

export default {


  name: "read",
  data() {
    return {
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
    var this1 = this
    axios.get('http://localhost:8100/postcontent/findallpostnum').then(function (resp){
      this1.totlepost = resp.data
      console.log(resp.data)
    })
    axios.get('http://localhost:8100/postcontent/findallpost/'+ this.currentPage).then(function (resp){
      this1.postlist = resp.data.records
      console.log(resp)
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
    //切换上下页
    handleCurrentChange(val) {
      this.currentPage = val
      console.log(this.currentPage)
      var this1 = this
      axios.get('http://localhost:8100/postcontent/findallpostnum').then(function (resp){
        this1.totlepost = resp.data
        console.log(resp.data)
      })
      axios.get('http://localhost:8100/postcontent/findallpost/'+ this.currentPage).then(function (resp){
        this1.postlist = resp.data.records
        console.log(resp)
        for(var i = 0; i < this1.postlist.length; i++){
          var date = new Date();
          var postdate = new Date(this1.postlist[i].lastpost)
          if(date.getFullYear() == postdate.getFullYear() && date.getMonth() == postdate.getMonth() && date.getDate()==postdate.getDate()){
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


    //想获取文本编译框内的html，可以添加事件获取
    submit(){
      this.post.content = editor.txt.html();
      var xss = require("xss");
      const safeHtml = xss(this.post.content)
      console.log(editor.txt.html());
      console.log(safeHtml)
      var this1 = this
      var id = window.localStorage.getItem("id")
      var token = window.localStorage.getItem("token")
      axios.post('http://localhost:8100/postcontent/post/'+id+'/'+token, this.post).then(function (resp) {
        if(resp.data == ""){
          window.localStorage.clear()
          this1.$message.error("出了一点小问题，请您重新登录哦！")
          this1.$router.go(0)
        }
        else{
          this1.$message.success("发布成功！")
          this1.$router.go(0)
        }
      })

    },
    submitForm(formName) {

    },
    gotoreadpost(index) {
      this.$router.push({path:'/forum/readpost', query:{postid:this.postlist[index].id}})
    },
    gotousercenter(index) {
      let userid = this.postlist[index].userid
      this.$router.push({path:'/usercenter', query:{id:this.postlist[index].userid}})
    }
  },
  mounted() {

    editor.config.menus = [
      'head',
      'bold',
      'fontSize',  // 字号
      'italic',
      'underline',
      'justify',  // 对齐方式
      // 'emoticon',  // 表情
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
    editor.i18next = window.i18next
//可使用监听函数在上传图片的不同阶段做相应处理
    editor.create();
  },
}
</script>

<style scoped>

</style>
