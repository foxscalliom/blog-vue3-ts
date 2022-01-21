<template>
  <div class="home">
    <!--    头部-->
    <div class="head">
      头部
    </div>
  </div>
</template>

<script lang="ts">
import {message} from 'ant-design-vue';
import {defineComponent} from 'vue';
import {getData} from '@/api'

export default defineComponent({
  name: 'Home',
  components: {},
  setup() {
    const info = () => {
      message.info('This is a normal message');
      getData().then(function (res) {
        let data = res.data
        console.log(data)
      })
    };
    return {
      info,
    };
  },
});
</script>
<style lang="less" scoped>
.home {
  .head {
    color: aquamarine;
  }
}
</style>
