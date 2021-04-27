<template>
  <div style="line-height: 20px; width: 850px;margin: 0px auto 0px auto; background: #ffffff; min-height: 800px">
    <!--    <p style="font-weight: bold; font-size: 18px;">{{activity.activityname}}</p>-->
    <!--    <el-card class="box-card" shadow="never">-->
    <!--      <el-row style="align-content: center; margin: 10px">-->
    <!--        <el-col :span="2">-->
    <!--          <div>-->
    <!--            <el-avatar :size="45" shape="square"-->
    <!--                       v-bind:src="activity.useravatar"></el-avatar>-->
    <!--            <p style="font-size: 12px; margin: 5px ">{{activity.username}}</p>-->
    <!--          </div>-->
    <!--        </el-col>-->
    <!--        <el-col :span="22" style="text-align: left">-->
    <!--          <div style="margin: 0px 10px 10px 10px">-->
    <!--            <p style="font-size: 15px" v-html="activity.content"></p>-->
    <!--          </div>-->
    <!--        </el-col>-->
    <!--      </el-row>-->
    <!--      <el-row style="align-content: center; margin: 1px">-->
    <!--        <el-col style="text-align: right">-->
    <!--          <p style="font-size: 12px; color: #838589"> {{activity.participantednum}}/{{activity.participantsnum}}</p>-->
    <!--        </el-col>-->
    <!--      </el-row>-->
    <!--    </el-card>-->

    <div style="text-align: left; padding: 30px">
      <div style="text-align: center">
        <p style="font-weight: bold; font-size: 20px;">{{ activity.activityname }}</p>
      </div>
      <!--      <span style="">活动名称：{{activity.activityname}}</span>-->
      <!--      <el-divider></el-divider>-->
      <span>发起人：{{ activity.username }}</span>
      <el-divider></el-divider>
      <span>活动时间：{{ activity.starttime }}</span>
      <el-divider></el-divider>
      <span>报名截止时间：{{ activity.deadline }}</span>
      <el-divider></el-divider>
      <span>已报名人数：{{ activity.participantednum }}</span>
      <el-divider></el-divider>
      <span>活动总人数：{{ activity.participantsnum }}</span>
      <el-divider></el-divider>
      <span>活动内容：</span>
      <span v-html="activity.content"></span>
      <el-divider></el-divider>
      <div v-if="activity.userid != userid">
        <div style="text-align: center" v-if="activitystatu===0">
          <el-button type="primary" @click="joins">参加活动</el-button>
        </div>
        <div style="text-align: center" v-if="activitystatu === 1">
          <p style="font-weight: bold; font-size: 18px;">您已参加活动</p>
          <el-button type="danger" @click="exit">退出活动</el-button>
        </div>
        <div style="text-align: center" v-if="activitystatu === 2"><p style="font-weight: bold; font-size: 18px;">
          参加人数已满</p></div>
        <div style="text-align: center" v-if="activitystatu === 3"><p style="font-weight: bold; font-size: 18px;">
          报名已截止</p></div>
        <div style="text-align: center" v-if="activitystatu === 4"><p style="font-weight: bold; font-size: 18px;">
          活动已结束</p></div>
      </div>
      <div style="text-align: center" v-if="userid == activity.userid">
        <el-button type="success" @click="exportexcel">导出参与人员信息</el-button>
      </div>
    </div>


  </div>
</template>

<script>


export default {
  name: "viewactivity",
  data() {
    return {
      activitystatu: 0,
      userid: '',
      activity: {
        id: '',
        userid: '',
        useravatar: '',
        username: '',
        activityname: '',
        content: '',
        participantsnum: '',
        participantednum: '',
        starttime: '',
        deadline: '',
      },
    }
  },
  created() {
    var activityid = this.$route.query.activityid
    this.userid = window.localStorage.getItem("id")
    var this1 = this
    axios.get('http://localhost:8100/activity/findactivitybyid/' + activityid).then(function (resp) {

      this1.activity = resp.data

      var date = new Date();
      var deadlinedate = new Date(this1.activity.deadline)
      var starttimedate = new Date(this1.activity.starttime)
      if (starttimedate < date) {
        this1.activitystatu = 4
      } else if (deadlinedate < date) {
        this1.activitystatu = 3
      } else {
        var this2 = this1
        var userid = window.localStorage.getItem("id")
        axios.get('http://localhost:8100/activity/finduserstatu/' + activityid + '/' + userid).then(function (resp) {
          if (resp.data == 1) {
            if (this1.activity.participantsnum === this1.activity.participantednum) {
              this1.activitystatu = 2
            } else {
              this2.activitystatu = 1
            }
          } else {
            this2.activitystatu = resp.data
          }
          this2.activitystatu = resp.data
        })
      }
      var deadlinedate = new Date(this1.activity.deadline)
      var starttimedate = new Date(this1.activity.starttime)
      this1.activity.deadline = deadlinedate.getMonth() + '-' + deadlinedate.getDate() + ' ' + deadlinedate.getHours() + ':' + (deadlinedate.getMinutes() == '0' ? '00' : deadlinedate.getMinutes())
      this1.activity.starttime = starttimedate.getMonth() + '-' + starttimedate.getDate() + ' ' + starttimedate.getHours() + ':' + (starttimedate.getMinutes() == '0' ? '00' : starttimedate.getMinutes())
      console.log(this1.userid)
      console.log(this1.activity.userid)
    })

  },
  methods: {
    joins() {
      var this1 = this
      axios.post('http://localhost:8100/activity/joinactivity/' + this.activity.id + '/' + this.userid).then(function (resp) {
        if (resp.data != null) {
          this1.$message.success("参加成功！")
          this1.$router.go(0)
        }
      })
    },
    exit() {
      var this1 = this
      axios.post('http://localhost:8100/activity/exitactivity/' + this.activity.id + '/' + this.userid).then(function (resp) {
        if (resp.data != null) {
          this1.$message.success("退出成功！")
          this1.$router.go(0)
        }
      })
    },
    exportexcel(){

      axios.get('http://localhost:8100/activity/exportexcel/' + this.activity.id ).then(function (resp) {
        if (resp.data != null) {
          this1.$message.success("导出成功！")
          this1.$router.go(0)
        }
      })
    }
  },


}

</script>

<style scoped>

</style>
