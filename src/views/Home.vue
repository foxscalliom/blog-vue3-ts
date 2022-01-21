<template>
  <div class="home">
    首页
    <a-button type="primary" @click="info">Display normal message</a-button>
  </div>
</template>

<script lang="ts">
import { message } from 'ant-design-vue';
import { defineComponent } from 'vue';
import {getData} from '@/api'
export default defineComponent({
  name: 'Home',
  components: {

  },
  setup() {
    const info = () => {
      message.info('This is a normal message');
    };
    return {
      info,
    };
},
  created(){
    getData().then(function(res){
      let data = res.data
      console.log(data)
    })
  }
});
</script>
