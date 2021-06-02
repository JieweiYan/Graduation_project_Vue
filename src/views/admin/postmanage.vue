<template>
  <div>
    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column label="发帖人姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.username}}</span>
        </template>
      </el-table-column>

      <el-table-column label="发帖人头像">
        <template slot-scope="scope">
          <el-avatar :size="30" shape="square"
                     v-bind:src="scope.row.useravatar"></el-avatar>
        </template>
      </el-table-column>

      <el-table-column label="标题" width="300px">
        <template slot-scope="scope">
          <span>{{ scope.row.title}}</span>
        </template>
      </el-table-column>

<!--      <el-table-column label="发帖时间">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ scope.row.time}}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->

<!--      <el-table-column label="最后回复时间">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ scope.row.lastpost}}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->

      <el-table-column label="删除该贴">
        <template slot-scope="scope">
<!--          <el-button type="danger" size="small" @click="delete(scope.$index)">删除</el-button>-->
          <el-popconfirm title="确定删除吗？" @confirm="deletepost(scope.$index)">
            <el-button slot="reference" size="small"  type="danger">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>

    </el-table>
  </div>

</template>

<script>
export default {
  created() {
    var this1 = this
    axios.get('http://localhost:8100/postcontent/getallpost').then(function (resp) {
      this1.tableData = resp.data
    })
  },
  data() {
    return {
      value: '',
      tableData: [{
        id:0,
        username: '',
        useravatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        title:'网络工程',
        time:'',
        lastpost:'1班',
      },]
    }
  },
  methods: {
    deletepost(index){
      var this1 = this
      axios.post('http://localhost:8100/postcontent/delete/'+this.tableData[index].id).then(function (resp) {
        if(resp.status == 200)
          this1.$message.success("删除成功！")
          this1.$router.go(0)
      })
    },
    delete(index){
      console.log("hhhhh")
      var this1 = this
      this.$confirm('确定删除该贴？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('http://localhost:8100/postcontent/delete/'+this.tableData[index].id).then(function (resp) {
          if(resp.status == 200)
            this1.$message.success("删除成功！")
        })

      }).catch(() => {
        this1.$message.info("已取消删除")
      });
    }
  }
}
</script>
