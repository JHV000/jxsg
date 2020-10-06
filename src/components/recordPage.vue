<template>
  <div>

  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  name: "recordPage",
  data() {
    return {
     pickerVisible:false,
     starttime:'',
     endtime:'',
    };
  },
  methods: {
   showPicker(){
     this.pickerVisible = !this.pickerVisible
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