<template>
  <div>
    <el-table
        :data="tableData"
        style="width: 100%">


      <el-table-column label="姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column label="头像">
        <template slot-scope="scope">
          <el-avatar :size="30" shape="square"
                     v-bind:src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>

      <el-table-column label="专业">
        <template slot-scope="scope">
          <span>{{ scope.row.subject}}</span>
        </template>
      </el-table-column>

      <el-table-column label="入学年份">
        <template slot-scope="scope">
          <span>{{ scope.row.startyear}}</span>
        </template>
      </el-table-column>

      <el-table-column label="班级">
        <template slot-scope="scope">
          <span>{{ scope.row.class1}}</span>
        </template>
      </el-table-column>

      <el-table-column label="发布活动权限">
        <template slot-scope="scope">
          <el-switch
              v-model="scope.row.haveauthority"
              @change="havechange(scope.$index)"
              active-color="#13ce66"
              inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="是否能发言">
        <template slot-scope="scope">
          <el-switch
              v-model="scope.row.sfnfy"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="jychange(scope.$index)">
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
export default {
  created() {
    var this1 = this
    axios.get('http://localhost:8100/user/getalluser').then(function (resp) {
      this1.tableData = resp.data
    })
  },
  data() {
    return {
      value: '',
      tableData: [{
        id:0,
        name: '王小虎',
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        subject:'网络工程',
        startyear:'2017级',
        class1:'1班',
        haveauthority: true,
        sfnfy:true,
      },]
    }
  },
  methods: {
    havechange(index){
      console.log(this.tableData[index].haveauthority)
      var this1 = this
      axios.post('http://localhost:8100/user/havechange/'+this.tableData[index].id+'/'+this.tableData[index].haveauthority).then(function (resp) {
        if(resp.status == 200)
          this1.$message.success("修改成功！")
      })

    },
    jychange(index){
      var this1 = this
      axios.post('http://localhost:8100/user/jychange/'+this.tableData[index].id+'/'+this.tableData[index].sfnfy).then(function (resp) {
        if(resp.status == 200)
          this1.$message.success("修改成功！")
      })
    }
  }
}
</script>
