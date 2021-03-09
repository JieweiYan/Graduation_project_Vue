<template>
  <div>
    <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="专业">
        <el-select v-model="formInline.region" placeholder="请选择专业" size="small">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年级">
        <el-select v-model="formInline.region" placeholder="请选择年级" size="small">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级">
        <el-select v-model="formInline.region" placeholder="请选择班级" size="small">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="formInline.user" placeholder="请输入姓名" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" size="mini">查询</el-button>
      </el-form-item>
    </el-form>
    </div>
    <div>
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
    </div>


  </div>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      repeat : ['1', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3'],
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>
