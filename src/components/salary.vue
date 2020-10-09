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
    <div class="table-box">
      <div v-for="(item, index) in userList" v-bind:key="index">
        <mt-cell
          :title="item.user_name"
          @click.native="getDetail(item.user_id)"
          is-link
        >
          <span style="color: green">{{ item.user_money }}</span>
        </mt-cell>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast, Field,Indicator } from "mint-ui";
export default {
  name: "salary",
  data() {
    return {
      pickerVisible: false,
      starttime: "",
      endtime: "",
      userList: [
        
      ],
    };
  },
  methods: {
    showSalary() {
      Indicator.open({
        text: "统计中...",
        spinnerType: "fading-circle",
      });
      const token = window.sessionStorage.getItem("cat_token");
      this.$axios
        .get("api/admin/userlist", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          Indicator.close()
          this.userList = res.data;
          // console.log(this.employ);
        });
    },
    getDetail(userid) {
      console.log(userid);
      this.$router.push({
        path: "/about",
        query: {
          userid: userid,
          stime: this.starttime,
          etime: this.endtime,
        },
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
.salary-btn {
  margin-top: 10px;
}
</style>