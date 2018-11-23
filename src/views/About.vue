<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Ha :msg="message"></Ha>
  </div>
</template>
<script>
import Ha from '@/components/Ha.vue';
export default{
  data () {
    return {
      message:"来自About的数据"
    }
  },
  components:{
    Ha
  }
}
</script>
<style>

</style>

