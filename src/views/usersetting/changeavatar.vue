<template>
  <div>
    <div style="height: 120px; margin-top: 20px">
      <el-image
          style="width: 100px; height: 100px" :src="url">
      </el-image>

    </div>
    <div>
      <!--使用文档见https://github.com/acccccccb/vue-img-cutter/blob/master/README-zh-CN.md-->
      <ImgCutter v-on:cutDown="cutDown"
                 tool="false"
                 rate="1:1"
                 label="更换头像"
      ></ImgCutter>
    </div>


  </div>

</template>

<script>
import ImgCutter from 'vue-img-cutter'

export default {
  components: {
    ImgCutter
  },
  data() {
    return {
      url: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    }
  },
  created() {
    let id = window.localStorage.getItem("id")
    let this1 = this
    axios.get('http://localhost:8100/user/findbyid/'+id, this.ruleForm).then(function (resp){
      this1.url = resp.data.avatar
    })
  },

  methods: {
    cutDown(res) {
      let imgSrc = res.dataURL;
      let this1 = this;
      let id = localStorage.getItem("id")
      axios.post('http://localhost:8100/user/uploadavatar', {image: imgSrc, id: id}).then(function (resp) {
        this1.url = resp.data.avatar
        this1.$message({
          message: '修改成功，请手动刷新一下哦！',
          type: 'success'
        });
      })
    }
  },

}
</script>

<style scoped>


</style>
