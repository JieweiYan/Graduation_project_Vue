<template>
  <div style="margin-left: 80px">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
             label-width="120px" class="demo-ruleForm" style="width: 600px">
      <div>
        <el-form-item label="你的真实姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item aria-colspan="11" label="你的专业" prop="subject" style="text-align: left;">
          <el-select v-model="ruleForm.subject" placeholder="请选择专业">
            <el-option label="计算机科学与技术" value="计算机科学与技术"></el-option>
            <el-option label="软件工程" value="软件工程"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="入学年份" prop="start_year" style="text-align: left;">
          <el-select v-model="ruleForm.start_year" placeholder="请选择年份">
            <el-option label="2017" value="2017"></el-option>
            <el-option label="2016" value="2016"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="你的班级" prop="class" style="text-align: left;">
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
          <el-input type="textarea"  :autosize="{ minRows: 2, maxRows: 6}" v-model="ruleForm.profile" maxlength="150" show-word-limit></el-input>
        </el-form-item>

        <el-form-item style="text-align: center">
          <el-button type="primary" @click="submitForm('ruleForm')" style="margin-right: 100px;">确认修改</el-button>
        </el-form-item>
      </div>
    </el-form>

  </div>
</template>
<script>
export default {
  data() {

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
        name: '',
        subject: '',
        start_year: '',
        class: '',
        location:'',
        date: '',
        profession: '',
        wechatnum: '',
        introduce:'',
        profile: '',
      },
      rules: {
        telnum: [
          {required: true, validator: validatePass3, trigger: 'blur'}
        ],
        username: [
          {required: true, message: '用户名不能为空', trigger: 'blur'}
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
      console.log(this.ruleForm)
    },
    gotologin() {
      this.$router.push('/login')
    },
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    pre() {
      this.active--;
    }
  }
}
</script>
