<template>
  <div>
    <div class="block">

      <el-upload
          style="margin-bottom: 30px"
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-change="handleChange"
          :file-list="fileList"
          multiple>
        <el-button size="small" type="primary">点击上传<i class="el-icon-upload el-icon--right"></i></el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>


      <el-timeline>
        <el-timeline-item timestamp="2018年4月" placement="top">
          <el-card>
            <div class="demo-image" id="wrap">
              <div style="width: 120px; margin:0px 5px 5px 15px" v-for="file in fileList">
                <el-card :body-style="{ padding: '0px' }" shadow="hover">
                  <el-image
                      style="width: 100px; height: 100px"
                      :src="file.url"
                      :fit="'contain'"
                      :preview-src-list="srcList">

                  </el-image>
                  <span>{{file.time}}</span>
                  <div>
                    <div class="bottom clearfix">
                      <el-button type="text" class="button"><i class="el-icon-delete"></i></el-button>
                    </div>
                  </div>
                </el-card>

              </div>

            </div>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/3" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/3 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/2" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/2 20:46</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
export default {
  name: "album",
  data() {
    return {
      fileList: [{
        name: 'food.jpeg',
        time: '2018/4/12',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }, {
        name: 'food2.jpeg',
        time: '2018/4/12',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }, {
        name: '....',
        time: '2018/4/12',
        url: 'https://th.bing.com/th/id/OIP.XHR0ESekKzxVDwpuzYIJagHaEo?pid=ImgDet&rs=1'
      }, {
        name: 'sjfjf',
        time: '2018/4/12',
        url: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      }, {
        name: 'sjfjf',
        time: '2018/4/12',
        url: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      }, {
        name: 'sjfjf',
        time: '2018/4/12',
        url: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      }
      ],
      srcList: [
        'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        'https://th.bing.com/th/id/OIP.XHR0ESekKzxVDwpuzYIJagHaEo?pid=ImgDet&rs=1',
        'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      ]
    };
  },
  methods: {
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    }
  }

}
</script>

<style scoped>

#wrap {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
</style>
