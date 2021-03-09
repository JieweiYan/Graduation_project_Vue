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

    <div style="align-content: center; padding: 5px">
      <el-row style="align-content: center; margin: 5px">
        <el-col :span="4">
          <p style="font-size: 14px; margin: 5px; font-weight: bold">姓名</p>
        </el-col>
        <el-col :span="4">
          <div>
            <p style="font-size: 14px; margin: 5px; font-weight: bold">专业班级</p>
          </div>
        </el-col>
        <el-col :span="3">
          <div>
            <p style="font-size: 14px; margin: 5px; font-weight: bold">现居地</p>
          </div>
        </el-col>

        <el-col :span="2">
          <div>
            <p style="font-size: 14px; margin: 5px; font-weight: bold">职业</p>
          </div>
        </el-col>

        <el-col :span="3">
          <div>
            <p style="font-size: 14px; margin: 5px; font-weight: bold">微信号</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <p style="font-size: 14px; margin: 5px; font-weight: bold">个人简介</p>
          </div>
        </el-col>
      </el-row>
    </div>

    <div>
      <el-card class="box-card" shadow="never" v-for="item in repeat" @click.native="gotousercenter">
        <el-row style="align-content: center; margin: 5px">
          <el-col :span="4">
            <div>
              <el-avatar :size="45" shape="square"
                         src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
              <p style="font-size: 12px; margin: 5px ">严捷伟</p>
            </div>
          </el-col>
          <el-col :span="4">
            <div>
              <p style="font-size: 13px; margin: 5px">2017级计算机科学与技术1班</p>
            </div>
          </el-col>
          <el-col :span="3">
            <div>
              <p style="font-size: 13px; margin: 5px">浙江省杭州市</p>
            </div>
          </el-col>

          <el-col :span="2">
            <div>
              <p style="font-size: 13px; margin: 5px">程序猿</p>
            </div>
          </el-col>

          <el-col :span="3">
            <div>
              <p style="font-size: 13px; margin: 5px">YanJiewei_</p>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <p style="font-size: 13px; margin: 5px">蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
                ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。</p>
            </div>
          </el-col>


        </el-row>
        <!--        <el-row style="align-content: center; margin: 10px" >-->
        <!--          <el-col style="text-align: right">-->
        <!--            <p style="font-size: 12px; color: #838589">1楼 2021-03-01 10:05</p>-->
        <!--          </el-col>-->
        <!--        </el-row>-->
      </el-card>
    </div>

    <div style="margin-top: 20px">
      <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
      </el-pagination>
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
      repeat: ['1', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3'],
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    gotousercenter() {
      this.$router.push('/usercenter')
    }
  }
}
</script>
