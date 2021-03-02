<template>
  <div>
    <el-card class="box-card">
      <el-steps :active="active" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="完善信息"></el-step>
      </el-steps>
      <div style="height: 50px"></div>
      <!-- <p style="text-align:center;font-size: 25px">注册</p>-->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <!--表单1-->
        <div v-if="active == 0">
          <el-form-item label="手机号" prop="telnum">
            <el-input v-model.number="ruleForm.telnum"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item style="text-align: center">
            <el-button @click="gotologin()" style="margin-right: 90px;">返回登录</el-button>
            <el-button type="primary" @click="next" style="margin-right: 90px;">下一步</el-button>
          </el-form-item>
        </div>
        <!--表单2-->
        <div v-if="active==1">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="真实姓名" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="ruleForm.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="你的出生日期" required>
              <el-col :span="11">
                <el-form-item prop="date">
                  <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1"
                                  style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
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

            <el-form-item label="现居住地" prop="location">
              <el-input v-model="ruleForm.location"></el-input>
            </el-form-item>

            <el-form-item label="你的职业" prop="profession">
              <el-input v-model="ruleForm.profession"></el-input>
            </el-form-item>
            <el-form-item label="你的微信号" prop="wechatnum">
              <el-input v-model="ruleForm.wechatnum"></el-input>
            </el-form-item>
            <el-form-item label="一句话介绍" prop="introduce">
              <el-input v-model="ruleForm.introduce" maxlength="20" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="个人简介" prop="profile">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="ruleForm.profile" maxlength="150"
                        show-word-limit></el-input>
            </el-form-item>

            <el-form-item style="text-align: center">
              <el-button @click="pre()" style="margin-right: 100px;">上一步</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')" style="margin-right: 100px;">注册</el-button>
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
        pass: '',
        checkPass: '',
        name: '',
        sex: '',
        date: '',
        subject: '',
        start_year: '',
        class: '',
        location: '',
        profession: '',
        wechatnum: '',
        introduce: '',
        profile: '',
      },
      rules: {
        telnum: [
          {required: true, validator: validatePass3, trigger: 'blur'}
        ],

        pass: [
          {required: true, validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {required: true, validator: validatePass2, trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请选择性别', trigger: 'change'}
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
          {type: 'date', required: true, message: '请选择出生日期', trigger: 'change'}
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      if (this.ruleForm.sex != "" && this.ruleForm.subject != "" && this.ruleForm.start_year != "" && this.ruleForm.class != "")
        console.log(this.ruleForm)
      else {
        alert("必填项还没填哦！")
      }
    },
    gotologin() {
      this.$router.push('/login')
    },
    next() {
      if (this.ruleForm.telnum != "" && this.ruleForm.username != "" && this.ruleForm.pass != "" && this.ruleForm.checkPass != "")
        this.active++
      else {
        alert("必填项还没填哦！")
      }
    },
    pre() {
      this.active--;
    }
  }
}
</script>

<style>
.box-card {
  width: 600px;
  border-radius: 5px;
  margin: 100px auto;
}

</style>
