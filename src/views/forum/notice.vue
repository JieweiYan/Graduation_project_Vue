<template>
<div style="text-align: left">
  <div style="margin: 20px" v-html="notice.content"></div>

  <div v-show="isadmin == 1" style="text-align: left">
  <div style="border: 1px solid lightgray; min-height: 300px">
    <section>
      <div id="div5"></div>
      <div id="div6"></div>
    </section>
  </div>

  <div style="text-align: center; margin: 10px">
    <el-button type="primary" @click="submit">更新公告</el-button>
  </div>
  </div>

</div>
</template>

<script>

var editor = new Editor("#div5", "#div6");
//script部分
import Editor from "wangeditor";

export default {
  name: "notice",
  data() {
    return {
      userid:'',
      isadmin:0,
      notice:{content:'',},
    }
  },
  created() {
    var id = window.localStorage.getItem("id")
    var token = window.localStorage.getItem("token")
    var this1 = this
    axios.get('http://localhost:8100/user/isadmin/'+id+'/'+token).then(function (resp) {
      if(resp.data != ""){
        this1.isadmin = resp.data
      }
    })
    axios.get('http://localhost:8100/notice/findnotice').then(function (resp) {
      if(resp.data == ""){
        console.log(resp.data)
        window.localStorage.clear()
        this1.$message.error("出了一点小问题，请您重新登录哦！")
        this1.$router.go(0)
      }
      else{
        this1.notice.content = resp.data.content
      }
    })


  },

  methods:{
    //想获取文本编译框内的html，可以添加事件获取
    submit(){
      var xss = require("xss");
      this.notice.content = xss(editor.txt.html());
      var this1 = this
      var id = window.localStorage.getItem("id")
      var token = window.localStorage.getItem("token")
      axios.post('http://localhost:8100/notice/updatenotice/'+id+'/'+token, this.notice).then(function (resp) {
        console.log("hhhh")
        console.log(resp)
        console.log("hhhh")
        if(resp.data == ""){
          window.localStorage.clear()
          this1.$message.error("出了一点小问题，请您重新登录哦！")
          this1.$router.go(0)
        }
        else{
          this1.$message.success("更新成功！")
          this1.$router.go(0)
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
