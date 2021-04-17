<template>
  <div>
    <el-card class="box-card">
      <!--      <div class="block">-->
      <!--        <el-image :src="url"></el-image>-->
      <!--      </div>-->
      <p style="text-align:center;font-size: 25px">登录</p>
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="用户名">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formLabelAlign.region"></el-input>
        </el-form-item>
        <el-form-item style="align-content: center;">
          <el-button type="primary" @click="submitForm('ruleForm')" style="margin-left: 42px;">登录</el-button>
          <el-button @click="gotoregister()" style="margin-left: 42px;">去注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style>
.text {
  font-size: 14px;
}


.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}
</style>


<script>
export default {
  data() {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      url: "http://www.ncu.edu.cn/img/ncu.png"
    };
  },
  methods: {
    submitForm(formName) {

    },
    gotoregister() {
      this.$router.push('/register')
    }
  }
}
</script>
