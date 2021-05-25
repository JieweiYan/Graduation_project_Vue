<template>
  <div style="width: 850px; align-content: center; line-height: 20px; margin: 0px auto 0px auto; background: #ffffff">
    <div>
      <el-row style="align-content: center; margin: 10px; padding: 10px 20px 10px 20px">
        <el-col :span="3">
          <div>
            <p style="font-size: 14px; margin: 5px; font-weight: bold">发起人</p>
          </div>
        </el-col>
        <el-col :span="14">
          <div>
            <p style="font-size: 14px; margin: 5px; font-weight: bold">活动名称</p>
          </div>
        </el-col>
        <el-col :span="3">
          <div>
            <p style="font-size: 14px; margin: 5px; font-weight: bold">已参加人数/可参加人数</p>
          </div>
        </el-col>
        <el-col :span="4">
          <div>
            <p style="font-size: 14px; margin: 5px; font-weight: bold">报名截止时间</p>
          </div>
        </el-col>
      </el-row>

    </div>

    <el-card class="box-card" shadow="hover" v-for="(item, index) in activitylist">
      <el-row style="align-content: center; margin: 10px">
        <el-col :span="3" @click.native="gotousercenter(index)">
          <div>
            <el-avatar :size="45" shape="square"
                       v-bind:src="item.useravatar"></el-avatar>
            <p style="font-size: 12px; margin: 5px ">{{ item.username }}</p>
          </div>
        </el-col>
        <el-col :span="14">
          <div>
            <el-link type="primary" style="font-size: 14px" @click="gotoreadactivity(index)">{{ item.activityname }}</el-link>
            <!--            <p style="font-size: 13px" v-html="item.content"></p>-->
          </div>
        </el-col>
        <el-col :span="3">
          <div>
            <p style="font-size: 13px">{{item.participantednum}}/{{item.participantsnum}}</p>
          </div>
        </el-col>
        <el-col :span="4">
          <div>
            <p style="font-size: 13px">{{ item.deadline }}</p>
          </div>
        </el-col>
      </el-row>
    </el-card>


    <el-pagination
        background
        :current-page="currentPage"
        @current-change="handleCurrentChange"
        :page-size="12"
        :hide-on-single-page="true"
        layout="prev, pager, next"
        :total="totlepost">
    </el-pagination>

    <div style="padding: 15px" v-show="haveauthority==1">
      <el-form ref="form" label-width="80px" style="margin: 10px">
        <el-form-item label="活动名称">
          <el-input v-model="form.activityname" maxlength="30" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="活动可参加人数" label-width=auto style="text-align: left">
          <el-input-number v-model="form.participantsnum" :min="1" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="活动开始时间："  label-width=auto style="text-align: left ">
            <el-date-picker
                format="yyyy-M-d HH:mm"
                v-model="form.starttime"
                type="datetime"
                placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="报名截止时间：" label-width=auto style="text-align: left">
            <el-date-picker
                format="yyyy-M-d HH:mm"
                v-model="form.deadline"
                type="datetime"
                placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
      </el-form>

      <div style="border: 1px solid lightgray; min-height: 300px; text-align: left">
        <section>
          <div id="div5"></div>
          <div id="div6"></div>
        </section>
      </div>
npm
      <div style="text-align: center; margin: 10px">
        <el-button type="primary" @c lick="submit">发布新活动</el-button>
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
      totlepost: 0,
      currentPage: 1,
      haveauthority:'',
      form: {
        activityname: '',
        content: '',
        participantsnum: '',
        deadline: '',
        starttime: '',
      },
      activitylist: [{
        id: '',
        userid: '',
        username: '',
        useravatar: '',
        activityname: '',
        participantsnum: '',
        participantednum: '',
        deadline: '',
        content: '',
      }],

    }
  },
  created() {
    var id = window.localStorage.getItem("id");
    var token = window.localStorage.getItem("token")
    var this1 = this
    axios.get('http://localhost:8100/user/haveauthority/'+id+'/'+token).then(function (resp) {
      this1.totlepost = resp.data
      if(resp.data == ""){
        console.log(resp.data)
        window.localStorage.clear()
        this1.$message.error("出了一点小问题，请您重新登录哦！")
        this1.$router.go(0)
      }
      else{
        this1.haveauthority = resp.data
      }
    })
    axios.get('http://localhost:8100/activity/findallactivitynum').then(function (resp) {
      this1.totlepost = resp.data
      console.log(resp.data)
    })
    axios.get('http://localhost:8100/activity/findallactivity/' + this.currentPage).then(function (resp) {
      this1.activitylist = resp.data.records
      console.log(resp)
      for (var i = 0; i < this1.activitylist.length; i++) {
        var date = new Date();
        var deadlinedate = new Date(this1.activitylist[i].deadline)
        var starttimedate = new Date(this1.activitylist[i].starttime)
        if(starttimedate < date){
          this1.activitylist[i].deadline = "活动已结束"
        }
        else if(deadlinedate < date) {
          this1.activitylist[i].deadline = "报名已结束"
          console.log(this1.activitylist[i].deadline)
        }else{
          this1.activitylist[i].deadline = (deadlinedate.getMonth()+1) + '-'+ deadlinedate.getDate()+' '+deadlinedate.getHours() + ':' + (deadlinedate.getMinutes()== '0'?'00':deadlinedate.getMinutes())
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
      axios.get('http://localhost:8100/postcontent/findallpostnum').then(function (resp) {
        this1.totlepost = resp.data
        console.log(resp.data)
      })
      axios.get('http://localhost:8100/postcontent/findallpost/' + this.currentPage).then(function (resp) {
        this1.postlist = resp.data.records
        console.log(resp)
        for (var i = 0; i < this1.postlist.length; i++) {
          var date = new Date();
          var postdate = new Date(this1.postlist[i].lastpost)
          if (date.getFullYear() == postdate.getFullYear() && date.getMonth() == postdate.getMonth() && date.getDate() == postdate.getDate()) {
            if (postdate.getMinutes() < 10)
              this1.postlist[i].date = postdate.getHours() + ':0' + postdate.getMinutes()
            else
              this1.postlist[i].date = postdate.getHours() + ':' + postdate.getMinutes()
          } else {
            this1.postlist[i].date = (postdate.getMonth() + 1) + '-' + postdate.getDate()
          }
        }
      })
    },


    //想获取文本编译框内的html，可以添加事件获取
    submit() {
      var xss = require("xss");
      this.form.content = xss(editor.txt.html());
      var this1 = this
      var id = window.localStorage.getItem("id")
      var token = window.localStorage.getItem("token")
      console.log(this1.form.deadline1)
      axios.post('http://localhost:8100/activity/postactivity/' + id + '/' + token, this.form).then(function (resp) {
        if (resp.data == "") {
          window.localStorage.clear()
          this1.$message.error("出了一点小问题，请您重新登录哦！")
          this1.$router.go(0)
        } else {
          this1.$message.success("发布成功！")
          this1.$router.go(0)
        }
      })

    },
    gotoreadactivity(index) {
      this.$router.push({path: '/activity/readactivity', query: {activityid: this.activitylist[index].id}})
    },
    gotousercenter(index) {
      let userid = this.postlist[index].userid
      this.$router.push({path: '/usercenter', query: {id: this.postlist[index].userid}})
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
