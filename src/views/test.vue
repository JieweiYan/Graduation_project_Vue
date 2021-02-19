<template>
  <div>
    <el-card class="box-card">
      <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
      </el-steps>
      <div style="height: 50px"></div>
      <!-- <p style="text-align:center;font-size: 25px">注册</p>-->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <!--表单1-->
        <div v-if="active == 0">
          <el-form-item label="手机号" prop="telnum">
            <el-input v-model.number="ruleForm.telnum"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input v-model.number="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="gotologin()" style="margin-left: 40px;">返回登录</el-button>
            <el-button type="primary" @click="next" style="margin-left: 40px;">下一步</el-button>
          </el-form-item>
        </div>
        <!--表单2-->
        <div v-if="active==1">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="你的真实姓名" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="你的专业" prop="subject">
              <el-select v-model="ruleForm.subject" placeholder="请选择专业">
                <el-option label="计算机" value="cs"></el-option>
                <el-option label="软件工程" value="se"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="入学年份" prop="start_year">
              <el-select v-model="ruleForm.start_year" placeholder="请选择年份">
                <el-option label="2017" value="2017"></el-option>
                <el-option label="2016" value="2016"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="你的班级" prop="class">
              <el-select v-model="ruleForm.class" placeholder="请选择班级">
                <el-option label="1班" value="class1"></el-option>
                <el-option label="2班" value="class2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="你的出生日期" required>
              <el-col :span="11">
                <el-form-item prop="date">
                  <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1"
                                  style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="你的职业" prop="profession">
              <el-input v-model="ruleForm.profession"></el-input>
            </el-form-item>
            <el-form-item label="你的微信号" prop="wechatnum">
              <el-input v-model="ruleForm.wechatnum"></el-input>
            </el-form-item>
            <el-form-item label="个人简介" prop="profile">
              <el-input type="textarea" v-model="ruleForm.profile"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button  @click="pre()">上一步</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-form>

    </el-card>
  </div>

</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var validatePass3 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('号码不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入电话号码'));
        } else {
          if (value > 99999999999 || value < 10000000000) {
            callback(new Error('请输入正确的电话号码'));
          } else {
            callback();
          }
        }
      }, 1000)
    };

    return {
      active: 0,
      ruleForm: {
        telnum: '',
        username: '',
        pass: '',
        checkPass: '',
        name: '',
        subject: '',
        start_year: '',
        class: '',
        date: '',
        profession:'',
        wechatnum:'',
        profile:'',
      },
      rules: {
        telnum: [
          {required: true, validator: validatePass3, trigger: 'blur'}
        ],
        username: [
          {required: true, message: '用户名不能为空', trigger: 'blur'}
        ],
        pass: [
          {required: true, validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {required: true, validator: validatePass2, trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入活动名称', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        subject: [
          {required: true, message: '请选择专业', trigger: 'change'}
        ],
        start_year: [
          {required: true, message: '请选择入学年份', trigger: 'change'}
        ],
        class: [
          {required: true, message: '请选择班级', trigger: 'change'}
        ],
        date: [
          {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
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
    gotologin() {
      this.$router.push('/login')
    },
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    pre(){
      this.active--;
    }
  }
}
</script>

<style>
.box-card {
  width: 600px;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}

</style>