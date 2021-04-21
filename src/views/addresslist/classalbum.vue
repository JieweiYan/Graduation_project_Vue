<template>
  <div>
    <div class="block">

      <el-upload
          name="avatar"
          style="margin-bottom: 30px"
          class="upload-demo"
          ref="upload"
          v-bind:action="uploadurl"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
          :on-success="handleSeccuce"
          multiple>
        <el-button slot="trigger" size="small" type="primary">选取照片</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
      </el-upload>


      <div class="block">
        <el-timeline >
          <el-timeline-item v-for="(list, index) in albumlist" :timestamp="list[0].yearmonth" placement="top">
            <el-card>
              <div class="demo-image" id="wrap">
                <div style="width: 120px; margin:0px 5px 5px 15px" v-for="(file) in list">
                  <el-card :body-style="{ padding: '0px' }" shadow="never">
                    <el-image
                        style="width: 100px; height: 100px"
                        :src="file.url"
                        :fit="'contain'"
                        :preview-src-list="srclist[index]">
                    </el-image>
<!--                    <el-popconfirm title="确定删除吗？" v-if="uploaddisplay()" @confirm="deletepic(file.id)">-->
<!--                      <el-button slot="reference" size="mini" >删除</el-button>-->
<!--                    </el-popconfirm>-->

                  </el-card>

                </div>

              </div>
            </el-card>
          </el-timeline-item>



        </el-timeline>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    var this1 = this
    this1.id = window.localStorage.getItem("id")
    console.log(this.id)
    axios.get('http://localhost:8100/user/findbyid/'+this1.id).then(function (resp) {

      this1.user = resp.data
      this1.uploadurl = 'http://localhost:8100/classalbum/uploadalbum/'+resp.data.class1+'/'+resp.data.subject+'/'+resp.data.startyear
      var this2 = this1
      axios.get('http://localhost:8100/classalbum/findallpic/'+resp.data.class1+'/'+resp.data.subject+'/'+resp.data.startyear).then(function (resp){
        this2.albumlist = resp.data
        for (var i = 0; i < resp.data.length; i++){
          var list = []
          for(var j = 0; j < resp.data[i].length; j++){
            list.push(resp.data[i][j].url)
          }
          this2.srclist.push(list)
        }
      })
    })
    console.log(this1.user)



  },
  data() {
    return {
      id:'',
      uploadurl:'',
      user:[{class1:'', subject:'', startyear:''}],
      albumlist:[
        [{createTime:'', userid:'', id:'', yearmonth:'', url:''}],
      ],
      srclist:[],
      fileList: []
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();

    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleSeccuce(response, file, fileList){
      if(response == true){
        this.fileList = []
        this.$router.go(0)
        this.$message({
          message: '上传成功！',
          type: 'success'
        });
      }
      else{
        this.$message({
          message: '上传失败！',
          type: 'error'
        });
      }
    },


    deletepic(id){
      var this1 = this
      console.log("hhhhhh")
      console.log(id)
      axios.post('http://localhost:8100/personalbum/deletepic/'+ id).then(function (resp) {
        if(resp.data == '200'){
          this1.$router.go(0)
          this1.$message({
            message: '删除成功！',
            type: 'success'
          });
        }
      })

    },

    uploaddisplay(){
      return this.id === window.localStorage.getItem('id');
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
