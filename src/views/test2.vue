<template>
  <div>
    <div v-for="i in item">
      <input v-model="i.address"></input>
      <input v-model="i.name"></input>
    </div>


  </div>
</template>

<style>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  methods: {
    submit(){
      axios.post('http://localhost:8100/test/insert', this.item).then(function (resp) {
        console.log(resp)
      })
    },
  },

  created() {
    const this1 = this
    axios.get('http://localhost:8100/test/getall', this.form).then(function (resp){
      console.log(resp)
      this1.item = resp.data
    })
  },
  data() {
    return {
      item:[
          {address:'南昌大学', name: '王小虎',}
          ],
    }
  }
};
</script>
