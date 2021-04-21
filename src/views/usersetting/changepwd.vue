<template>
  <div style="margin-left: 80px">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
             label-width="120px" class="demo-ruleForm" style="width: 600px">
      <!--表单1-->
      <div>
        <el-form-item label="原始密码" prop="prepass">
          <el-input type="password" v-model="ruleForm.prepass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button type="primary" @click="submitForm" style="margin-right: 90px;">确认修改</el-button>
        </el-form-item>
      </div>

    </el-form>

  </div>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    return {
      active: 0,
      ruleForm: {
        prepass: '',
        pass: '',
        checkPass: '',
      },
      rules: {
        prepass: [
          {required: true, message: '原密码不能为空', trigger: 'blur'}
        ],
        pass: [
          {required: true, validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {required: true, validator: validatePass2, trigger: 'blur'}
        ],

      }
    };
  },
  methods: {
    submitForm() {
      const this1 = this
      let id = window.localStorage.getItem("id")

      axios.post('http://localhost:8100/user/changepwd', {prepwd: this.ruleForm.prepass, pwd: this.ruleForm.pass, id: id}).then(function (resp){
        if(resp.data == "200"){
          this1.$message({
            message: '修改成功！',
            type: 'success'
          });
        }
        else{
          this1.$message({
            message: '修改失败，请检查一下原密码！',
            type: 'error'
          });
        }
      })
    },

  }
}
</script>

