<template>
  <div style="margin-left: 80px">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
             label-width="120px" class="demo-ruleForm" style="width: 600px">
      <!--表单1-->
      <div >
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
          <el-button type="primary" @click="next" style="margin-right: 90px;">确认修改</el-button>
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
        prepass:'',
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

  }
}
</script>

