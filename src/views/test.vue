<template>
  <div>
    <section>
      <div id="div5"></div>
      <div id="div6"></div>
      <el-button @click="submit">获取文本内容</el-button>
    </section>
  </div>
</template>


<script>
var editor = new Editor("#div5", "#div6");
//script部分
import Editor from "wangeditor";
export default {
  data() {
    return {
      HTMLstr: "",
    };
  },
  methods: {
    //想获取文本编译框内的html，可以添加事件获取
    submit(){
      this.HTMLstr = editor.txt.html();
      console.log(editor.txt.html());
    }
  },
  mounted() {
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
    console.log(editor);
    editor.create();
  },
};
</script>
