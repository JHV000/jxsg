<template>
  <div>
<mt-field
      label="起始时间"
      v-model="starttime"
      placeholder="请输入起始时间"
      type="date"
    ></mt-field>
    <mt-field
      label="结束时间"
      v-model="endtime"
      placeholder="请输入结束时间"
      type="date"
    ></mt-field>
    <mt-button
      class="salary-btn"
      size="large"
      type="danger"
      @click.native="showSalary"
      >开始统计</mt-button
    >
<div class="card" v-for="(item,index) in detail" v-bind:key="index">
      <mt-cell title="序号"><span>{{ index + 1 }}</span> </mt-cell>
      <mt-cell title="星级"><span>{{ item.star }}</span></mt-cell>
      <mt-cell title="班次">{{ item.grade }}</mt-cell>
      <mt-cell title="工资">{{ item.money }}</mt-cell>
      <mt-cell title="打卡时间">{{ item.created_at }}</mt-cell>
      <mt-cell title="备注">{{ item.remarks }}</mt-cell>
    </div>
  </div>
</template>
<script>
import { Toast,Field } from "mint-ui";
export default {
  name: "recordPage",
  data() {
    return {
     starttime: "",
      endtime: "",
      detail: [
        
      ],
    };
  },
  methods: {
    getData() {
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle",
      });
      const id = this.$route.query.userid;
      const starttime = this.$route.query.stime;
      const endtime = this.$route.query.etime;
      const token = window.sessionStorage.getItem("cat_token");
      this.$axios
        .get("api/statistic", {
          params: { userid: id, stime: starttime, etime: endtime },
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          Indicator.close();
          this.detail = res.data
          console.log(res);
        })
        .catch((err) => {
          // console.log(id);
          Indicator.close();
          this.showToast("加载失败，请重试");
          console.log(err);
        });
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