<template>
  <div>
    <el-card class="box-card" shadow="hover" v-for="item in repeat">
      <el-row style="align-content: center; margin: 10px" >
        <el-col :span="3">
          <div>
            <el-avatar :size="45" shape="square"
                       src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            <p style="font-size: 12px; margin: 5px ">皮这一下真的非常开心</p>
          </div>
        </el-col>
        <el-col :span="16">
          <div>
            <el-link type="primary" style="font-size: 14px" @click="gotoreadpost">我想问一下这样到底怎么举报还是说我们拿这种人无能为力？举报原</el-link>
            <p style="font-size: 13px">我想问一下这样到底怎么举报还是说我们拿这种人无能为力？举报原因只有这么几</p>
          </div>
        </el-col>
        <el-col :span="3">
          <div >
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
  </div>
</template>

<script>
export default {
  name: "read",
  data() {
    return {
      repeat : ['1', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3'],

    }
  },
  methods: {
    submitForm(formName) {

    },
    gotoreadpost(){
      this.$router.push('/forum/readpost')
    }
  }
}
</script>

<style scoped>

</style>
