<template>
  <div>
    <div class="block">

      <el-upload
          v-if="uploaddisplay()"
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
          accept=".jpg,.jpeg,.png"
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
                  <el-popconfirm title="确定删除吗？" v-if="uploaddisplay()" @confirm="deletepic(file.id)">
                    <el-button slot="reference" size="mini" >删除</el-button>
                  </el-popconfirm>

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
  name: "album",
  created() {
    var this1 = this
    //获得当前从usercent传过来的id，和localstorage的id比较，如果相同，说明是用户在查看自己的主页，就允许上传照片，否则不允许
    let id = this.$route.query.id
    this.id = id
    let token = window.localStorage.getItem("token")
    //上传照片前已经验证过token了，所以就不必带token了
    this.uploadurl = 'http://localhost:8100/personalbum/uploadalbum/'+id
    axios.get('http://localhost:8100/personalbum/findbyid/'+id+'/'+token).then(function (resp){
      if(resp.data == ""){
        window.localStorage.clear()
        this1.$router.go(0)
        this1.$message.error("出了一点小问题，请您重新登录哦！")
      }
      this1.albumlist = resp.data
      for (var i = 0; i < resp.data.length; i++){
        var list = []
        for(var j = 0; j < resp.data[i].length; j++){
          list.push(resp.data[i][j].url)
        }
        this1.srclist.push(list)
      }
    })

  },
  data() {
    return {
      id:'',
      uploadurl:'',
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
          message: '上传失败，请检查一下上传文件的格式',
          type: 'error'
        });
      }
    },


    deletepic(id){
      var this1 = this
      let userid = window.localStorage.getItem("id")
      let token = window.localStorage.getItem("token")
      console.log("hhhhhh")
      console.log(id)
      axios.post('http://localhost:8100/personalbum/deletepic/'+id+'/'+userid+'/'+token).then(function (resp) {
        if(resp.data == ""){
          window.localStorage.clear()
          this1.$message.error("出了一点小问题，请您重新登录哦！")
          this1.$router.go(0)
        }
        if(resp.data == '200'){
          this1.$router.go(0)
          this1.$message({
            message: '删除成功！',
            type: 'success'
          });
        }
      })

    },
    //获得当前从usercent传过来的id，和localstorage的id比较，如果相同，说明是用户在查看自己的主页，就允许上传照片，否则不允许
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
