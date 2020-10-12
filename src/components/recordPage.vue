<template>
  <div>
    <div class="part">
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
        @click.native="getData()"
        >开始统计</mt-button
      >
    </div>
    <div class="card" v-for="(item, index) in detail" v-bind:key="index">
      <mt-cell title="序号"
        ><span>{{ index + 1 }}</span>
      </mt-cell>
      <mt-cell title="星级"
        ><span>{{ item.star }}</span></mt-cell
      >
      <mt-cell title="班次">{{ item.grade }}</mt-cell>
      <mt-cell title="打卡时间">{{ item.created_at }}</mt-cell>
      <mt-cell title="备注">
        <mt-button
          size="small"
          @click.native="update(item.id)"
          type="danger"
          icon="back"
          >添加</mt-button
        >
      </mt-cell>
      <mt-cell title="备注内容">{{ item.remarks }}</mt-cell>
    </div>
  </div>
</template>
<script>
import { Toast, Field, Indicator, MessageBox } from "mint-ui";
export default {
  name: "recordPage",
  data() {
    return {
      starttime: "",
      endtime: "",
      detail: [],
    };
  },
  methods: {
    getData() {
      if (this.starttime == "" || this.endtime == "") {
        this.showToast("请选择时间段！");
      } else {
        Indicator.open({
          text: "加载中...",
          spinnerType: "fading-circle",
        });
        const token = window.sessionStorage.getItem("cat_token");
        this.$axios
          .get("api/searchper", {
            params: { stime: this.starttime, etime: this.endtime },
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            Indicator.close();
            this.detail = res.data;
            if (res.result.code == 0) {
              this.showToast("该时间段没有打卡记录");
            }
            // console.log(res);
          })
          .catch((err) => {
            // console.log(id);
            Indicator.close();
            this.showToast("加载失败，请重试");
            // console.log(err);
          });
      }
    },
    update(id) {
      MessageBox.prompt("请输入备注")
        .then(({ value, action }) => {
          console.log(value);
          const token = window.sessionStorage.getItem("cat_token");
          this.$axios
            .patch(
              "api/uprec",
              {
                id: id,
                remarks: value,
              },
              {
                headers: {
                  Authorization: "Bearer " + token,
                },
              }
            )
            .then((res) => {
              if (res.result.code == 1) {
                this.showToast("上报成功！");
              }
            });
        })
        .catch((err) => {
          this.showToast("上报失败，稍后再试");
          // console.log(err);
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
.card {
  margin: 10px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}
</style>