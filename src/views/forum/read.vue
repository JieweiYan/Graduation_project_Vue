<template>
  <div>
    <el-card class="box-card" shadow="hover" v-for="item in repeat">
      <el-row style="align-content: center; margin: 10px">
        <el-col :span="3" @click.native="gotousercenter">
          <div>
            <el-avatar :size="45" shape="square"
                       src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            <p style="font-size: 12px; margin: 5px ">皮这一下真的非常开心</p>
          </div>
        </el-col>
        <el-col :span="16">
          <div>
            <el-link type="primary" style="font-size: 14px" @click="gotoreadpost">我想问一下这样到底怎么举报还是说我们拿这种人无能为力？举报原
            </el-link>
            <p style="font-size: 13px">我想问一下这样到底怎么举报还是说我们拿这种人无能为力？举报原因只有这么几</p>
          </div>
        </el-col>
        <el-col :span="3">
          <div>
            <p style="font-size: 13px"><i class="el-icon-chat-square" style="color: #838589; size: 25px"></i>130</p>
          </div>
        </el-col>
        <el-col :span="2">
          <div>
            <p style="font-size: 12px">12:09</p>
          </div>
        </el-col>

      </el-row>
    </el-card>


    <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
    </el-pagination>

    <div style="margin: 10px;  text-align: left;" >
      <div style="border: 1px solid; min-height: 300px">
        <section>
          <div id="div5"></div>
          <div id="div6"></div>
        </section>
      </div>

      <div style="text-align: center; margin: 10px">
        <el-button @click="submit">获取文本内容</el-button>
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
      HTMLstr: "",
      repeat: ['1', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3'],

    }
  },
  methods: {
    //想获取文本编译框内的html，可以添加事件获取
    submit(){
      this.HTMLstr = editor.txt.html();
      console.log(editor.txt.html());
    },
    submitForm(formName) {

    },
    gotoreadpost() {
      this.$router.push('/forum/readpost')
    },
    gotousercenter() {
      this.$router.push('/usercenter')
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
      'emoticon',  // 表情
      'image',  // 插入图片
      'undo',  // 撤销
    ]
    editor.config.uploadImgShowBase64 = true;
    editor.config.uploadImgServer = 'http://localhost:8100/postcontent/uploadpic'
    editor.config.uploadImgMaxLength = 1;
    editor.config.uploadFileName = 'myFile';
    editor.config.uploadImgMaxSize = 3 * 1024 * 1024;
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
