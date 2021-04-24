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
        <el-col :span="22">
          <div>
            <p style="font-size: 13px" v-html="item.content"></p>
          </div>
        </el-col>
      </el-row>
      <el-row style="align-content: center; margin: 1px">
        <el-col style="text-align: right">
          <p style="font-size: 12px; color: #838589">{{index+1}}楼 {{item.date}}</p>
        </el-col>
      </el-row>
    </el-card>

    <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
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
      title:'',
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
    var this1 = this
    axios.get('http://localhost:8100/postcontent/findpostbyid/'+postid).then(function (resp){
      this1.user = resp.data
      console.log(resp.data)
      this1.title = resp.data.mainposttitle
      this1.postlist = resp.data.replypostlist
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
      this.post.content = editor.txt.html();
      var xss = require("xss");
      const safeHtml = xss(this.post.content)
      console.log(editor.txt.html());
      console.log(safeHtml)
      var this1 = this
      var id = window.localStorage.getItem("id")
      var token = window.localStorage.getItem("token")
      axios.post('http://localhost:8100/postcontent/reply/'+this.postlist[0].id+'/'+id+'/'+token, this.post).then(function (resp) {
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
      // 'video',
      'undo',  // 撤销
    ]
    let OSS = require('ali-oss');
    // let client = new OSS({
    //   // // region以杭州为例（oss-cn-hangzhou），其他region按实际情况填写。
    //   // region: '<Your region>',
    //   // // 阿里云主账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM账号进行API访问或日常运维，请登录RAM控制台创建RAM账号。
    //   // accessKeyId: '<Your AccessKeyId>',
    //   // accessKeySecret: '<Your AccessKeySecret>',
    //   // bucket: 'Your bucket name',
    // });
    // editor.config.height = 500
    editor.config.uploadImgShowBase64 = true;
    editor.config.uploadImgServer = 'http://localhost:8100/postcontent/uploadpic'
    editor.config.uploadImgMaxLength = 1;
    editor.config.uploadFileName = 'myFile';
    editor.config.uploadImgMaxSize = 5 * 1024 * 1024;
    editor.config.pasteIgnoreImg = true
    editor.config.uploadImgTimeout = 20 * 1000
//可使用监听函数在上传图片的不同阶段做相应处理
    editor.config.uploadImgHooks = {
      before: function (xhr, editor, files) {
        // 图片上传之前触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
        // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
        // return {
        //     prevent: true,
        //     msg: '放弃上传'
        // }
      },
      success: function (xhr, editor, result) {
        // 图片上传并返回结果，图片插入成功之后触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
      },
      fail: function (xhr, editor, result) {
        // 图片上传并返回结果，但图片插入错误时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
      },
      error: function (xhr, editor) {
        // 图片上传出错时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
      },
      timeout: function (xhr, editor) {
        // 图片上传超时时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
      },
      // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
      // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
      customInsert: function (insertImg, result, editor) {
        //这个是用来回显的
        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
        //data是我后台返回的图片调用地址：url
        var url = result.data;
        insertImg(url)
        // result 必须是一个 JSON 格式字符串！！！否则报错
      }
    },
        editor.create();
  },

}
</script>

<style scoped>

</style>
