<template>
  <div>
    <div class="star">
      <p class="pickername">星级:</p>
      <input type="text" @click="showSheet(0)" v-model="starValue" />
      <mt-actionsheet
        :actions="starpicker"
        v-model="starVisible"
      ></mt-actionsheet>
    </div>
    <p class="date">当前时间为：{{ date }}</p>
    <div class="time">
      <p class="pickername">班次:</p>
      <input type="text" v-model="timeValue" />
    </div>
    <mt-button
      class="s-btn"
      v-bind:disabled="disabled"
      size="large"
      @click="confirm"
      type="danger"
      >打卡</mt-button
    >
  </div>
</template>
<script>
import { Toast, MessageBox, Button, Indicator } from "mint-ui";

export default {
  name: "signPage",
  // props: ["token"],
  data() {
    return {
      starpicker: [
        {
          price: 10,
          name: "2.5",
          method: this.getPrice,
        },
        {
          price: 8,
          name: "3",
          method: this.getPrice,
        },
        {
          price: 10,
          name: "4",
          method: this.getPrice,
        },
      ],
      timepicker: [
        {
          name: "A",
          time: "10：00 —— 13：00",
          starttime: 600,
          endtime: 780,
          method: this.getTimeGrade,
        },
        {
          name: "B",
          time: "13：00 —— 16：00",
          starttime: 780,
          endtime: 960,
          method: this.getTimeGrade,
        },
        {
          name: "C",
          time: "16：00 —— 19：00",
          starttime: 960,
          endtime: 1140,
          method: this.getTimeGrade,
        },
        {
          name: "D",
          time: "19：00 —— 21：30",
          starttime: 1140,
          endtime: 1290,
          method: this.getTimeGrade,
        },
        {
          name: "F",
          time: "7：30 —— 10：00",
          starttime: 450,
          endtime: 600,
          method: this.getTimeGrade,
        },
      ],
      starVisible: false,
      timeVisible: false,
      starValue: "2.5",
      timeValue: "",
      timeflag: 0,
      disabled: false,
      date: new Date(),
    };
  },
  methods: {
    showSheet(id) {
      if (id == 0) {
        this.starVisible = !this.starVisible;
      } else {
        this.timeVisible = !this.timeVisible;
      }
    },
    confirm() {
      MessageBox({
        title: "提示",
        message:
          "确定在" +
          "<br/>" +
          "<b>" +
          this.date +
          "</b>" +
          "<br/>" +
          "以星级" +
          "<b>" +
          this.starValue +
          "</b>" +
          "<br/>" +
          "打卡" +
          "<b>" +
          this.timeValue +
          "</b>" +
          "班吗？",
        showCancelButton: true,
      }).then(() => {
        Indicator.open({
          text: "打卡中...",
          spinnerType: "fading-circle",
        });
        // console.log(this.token);
        const token = window.sessionStorage.getItem("cat_token");
        this.$axios
          .post(
            "api/sigrec",
            {
              star: this.starValue,
              money: 10,
              grade: this.timeValue,
              remarks: null,
            },
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          )
          .then((res) => {
            Indicator.close();
            this.showToast("打卡成功！");
            console.log(res);
          })
          .catch((err) => {
            Indicator.close();
            this.showToast("打卡失败，请重试");
            console.log(err);
          });
      });
    },
    getPrice(res) {
      this.starValue = res.name;
      // console.log(res.price);
      // return res.price
    },
    getTimeGrade(res) {
      this.timeValue = res.name;
    },
    showToast(mes) {
      this.toastInstanse = Toast({
        message: mes,
        position: "middle",
        duration: 1000,
      });
    },
  },
  mounted() {
    let that = this;
    this.timer = setInterval(function () {
      that.date = new Date().toLocaleString("chinese", { hour12: false });
    });
    var flag = (this.timeflag =
      this.date.getHours() * 60 + this.date.getMinutes());
    var time = this.timepicker;
    var count = 0;
    for (var i = 0; i < time.length; i++) {
      if (flag > time[i].starttime && flag <= time[i].endtime) {
        this.timeValue = time[i].name;
        count++;
        break;
      }
    }
    if (count == 0) {
      this.disabled = true;
      this.showToast("现在不在上班时间内，无法打卡");
    }

    // console.log(this.timeflag)
  },
  beforeDestroy: function () {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  onload() {},
};
</script>
<style>
.picker {
  width: 70%;
  height: 40px;
  border-radius: 50px;
}
.pickername {
  font-size: 20px;
  font-weight: 400;
}
.star,
.time {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
input {
  width: 70%;
  height: 40px;
  border-radius: 50px;
  text-align: center;
  font-size: 20px;
  font-weight: 400;
}
.date {
  text-align: center;
  padding: 20px 0px;
}
.s-btn {
  margin-top: 20px;
}
</style>