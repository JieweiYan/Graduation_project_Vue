<template>
<div>

  <p style="font-weight: bold; font-size: 18px;">我想问一下这样到底怎么举报还是说我们拿这种人无能为力？举报原</p>
  <el-card class="box-card" shadow="never" v-for="item in repeat">
    <el-row style="align-content: center; margin: 10px" >
      <el-col :span="4" @click.native="gotousercenter">
        <div>
          <el-avatar :size="45" shape="square"
                     src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <p style="font-size: 12px; margin: 5px ">皮这一下真的非常开心</p>
        </div>
      </el-col>
      <el-col :span="20">
        <div>
          <p style="font-size: 13px">我想问一下这样到底怎么举报还是说我们拿这种人无能为力？举报原因只有这么几</p>
        </div>
      </el-col>

    </el-row>
    <el-row style="align-content: center; margin: 10px" >
      <el-col style="text-align: right">
        <p style="font-size: 12px; color: #838589">1楼 2021-03-01 10:05</p>
      </el-col>
    </el-row>
  </el-card>

  <el-pagination
      background
      layout="prev, pager, next"
      :total="1000">
  </el-pagination>


  <el-divider></el-divider>
  <p style="font-size: 17px; font-weight: bold; text-align: left">发表回复</p>

  <quill-editor ref="text"  class="myQuillEditor" :options="editorOption" />


</div>
</template>

<script>
import Quill from 'quill'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { container, ImageExtend } from 'quill-image-extend-module'
Quill.register('modules/ImageExtend', ImageExtend)

export default {
  components:{
    quillEditor
  },
  name: "readpost",
  data() {
    return {
      repeat : ['1', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3'],
      content: '',
      editorOption: {
        modules: {
          ImageExtend: {
            // 如果不作设置，即{}  则依然开启复制粘贴功能且以base64插入
            name: "file", // 图片参数名
            size: 3, // 可选参数 图片大小，单位为M，1M = 1024kb
            action: "/res/imgUpload", // 服务器地址, 如果action为空，则采用base64插入图片
            // response 为一个函数用来获取服务器返回的具体图片地址
            // 例如服务器返回{code: 200; data:{ url: 'baidu.com'}}
            // 则 return res.data.url
            response: res => {
              return res.data;
            },
            headers: xhr => {
              // 上传图片请求需要携带token的 在xhr.setRequestHeader中设置
              xhr.setRequestHeader(
                  "Authorization",
                  this.getCookie("username")
                      ? this.getCookie("username").token_type +
                      this.getCookie("username").access_token
                      : "Basic emh4eTp6aHh5"
              );
            }, // 可选参数 设置请求头部
            sizeError: () => {}, // 图片超过大小的回调
            start: () => {}, // 可选参数 自定义开始上传触发事件
            end: () => {}, // 可选参数 自定义上传结束触发的事件，无论成功或者失败
            error: () => {}, // 可选参数 上传失败触发的事件
            success: () => {}, // 可选参数  上传成功触发的事件
            change: (xhr, formData) => {
              // xhr.setRequestHeader('myHeader','myValue')
              // formData.append('token', 'myToken')
            } // 可选参数 每次选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
          },
          toolbar:{
            container:[
              ['bold', 'italic', 'underline', 'strike'],        //加粗，斜体，下划线，删除线
              ['blockquote', 'code-block'],         //引用，代码块
              [{ 'header': 1 }, { 'header': 2 }],               // 标题，键值对的形式；1、2表示字体大小
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],          //列表
              [{ 'script': 'sub'}, { 'script': 'super' }],      // 上下标
              [{ 'indent': '-1'}, { 'indent': '+1' }],          // 缩进
              [{ 'direction': 'rtl' }],                         // 文本方向
              [{ 'size': ['small', false, 'large', 'huge'] }],  // 字体大小
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],         //几级标题
              [{ 'color': [] }, { 'background': [] }],          // 字体颜色，字体背景颜色
              [{ 'font': [] }],         //字体
              [{ 'align': [] }],        //对齐方式
              ['clean'],        //清除字体样式
              ['image','video']        //上传图片、上传视频
            ]
          }
        },

      },
    }
  },
  methods:{
    gotousercenter(){
      this.$router.push('/usercenter')
    }
  }
}
</script>

<style scoped>

</style>
