<template>
  <div>
    <el-card class="box-card">
      <!--      <div class="block">-->
      <!--        <el-image :src="url"></el-image>-->
      <!--      </div>-->
      <p style="text-align:center;font-size: 25px">登录</p>
      <el-form :label-position="labelPosition" label-width="80px" :model="loginForm" ref="loginForm">
        <el-form-item label="电话号码">
          <el-input v-model="loginForm.telnum"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item style="align-content: center;">
          <el-button type="primary" @click="submitForm()" style="margin-left: 42px;">登录</el-button>
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
      loginForm: {
        telnum: '',
        password: '',
      },
      url: "http://www.ncu.edu.cn/img/ncu.png"
    };
  },
  methods: {
    submitForm() {
      let this1 = this
      axios.post('http://localhost:8100/user/login', this.loginForm).then(function (resp) {
        let user1 = resp.data.user
        window.localStorage.setItem("id", user1.id)
        console.log(user1)
       if(resp.data.flag == "200"){
         this1.$message({
           message: '登录成功！',
           type: 'success'
         });
         this1.$router.push({path:"/home"})
       }
       else if(resp.data.flag == "500"){
         this1.$message.error("登录失败，请检查用户名或者密码是否错误！")
       }
       else{
         this1.$message.error("您还没注册哦，快去注册把")
       }
      })
    },
    gotoregister() {
      this.$router.push('/register')
    }
  }
}
</script>
