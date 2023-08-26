<template>
    <div class="root">
      <!-- <header>网站头部</header> -->
      <div class="main">
        <router-view></router-view>
      </div>
      
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue" 

</script>


<style lang="less" scoped>
 .root{
  width: 100vw;
  max-width: 1100px;
  min-width: 300px;
    // header{
    //   width: 100vw;
    //   height: 2rem;
    //   background-color: pink;
    // }
    .main{
      margin: 0px 1.5rem;
      background-color: skyblue;
    }
 }

</style>