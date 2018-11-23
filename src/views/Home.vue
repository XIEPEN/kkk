<template>
  <div class="home">
    <p>首页</p>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  data(){
    return{
      massage:"about数据"
      
    }
  },
  components: {
    HelloWorld
  }
}
</script>
<style>

</style>

