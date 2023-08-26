<template>
    <div class="custom-tree-container">
      home Page
      <div>
          <button @click="changeImg('lucky')">夏天</button>  
          <button @click="changeImg('guoyuan')">秋天</button>
          <!-- <el-button type= 'primary'>点击</el-button>   -->
      </div>
      <div class="showImg" 
      :style="{backgroundImage: `url(${path})`}"
      >
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import _ from 'lodash';
  import { ref } from 'vue';
  let path = ref('')
  function changeImg(e:string){
    const url = new URL(`../assets/${e}.jpg`,import.meta.url)
    path.value = url.toString()
  }
  </script>
  
  <style lang="less" scoped>
  .showImg{
    width: 300px;
    height: 300px;
    background-image: url('../assets//小助手幸运.jpg');
    background-size: contain;
  }


  </style>
  