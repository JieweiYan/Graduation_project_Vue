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
  components:{
    ImgCutter
  },
  data() {
    return {
      url: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    }
  },

  methods: {
    cutDown(res){
      let imgSrc = res.dataURL;
      let file = res.file;
      console.log(file)
      console.log(imgSrc)
      this.url = imgSrc
    }
  },

}
</script>

<style scoped>



</style>
