<template>
  <div>
<mt-field label="起始时间" v-model="starttime" placeholder="请输入起始时间" type="date"></mt-field>
<mt-field label="结束时间" v-model="endtime" placeholder="请输入结束时间" type="date"></mt-field>
<mt-button size="large" type="danger" @click.native="showSalary">开始统计</mt-button>
  </div>
</template>
<script>
import { Toast,Field } from "mint-ui";
export default {
  name: "salary",
  data() {
    return {
     pickerVisible:false,
     starttime:'',
     endtime:'',
    };
  },
  methods: {
   showSalary(){
     console.log(this.starttime +"  "+ this.endtime);
   },
    showToast(mes) {
      this.toastInstanse = Toast({
        message: mes,
        position: "middle",
        duration: 1000,
      });
    },
  },
};
</script>
<style>

</style>