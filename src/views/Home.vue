<template>
  <div class="home">
    <!--    头部-->
    <div class="head">
      <div class="left">left</div>
      <div class="right">
        <a-menu v-model:selectedKeys="current" mode="horizontal">
          <a-menu-item key="article">
            文章列表
          </a-menu-item>
          <a-menu-item key="sort">
            归档分类
          </a-menu-item>
          <a-menu-item key="my">
            个人中心
          </a-menu-item>
        </a-menu>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {message} from 'ant-design-vue';
import {defineComponent, ref} from 'vue';
import {getData} from '@/api'

export default defineComponent({
  name: 'Home',
  components: {
  },
  setup() {
    const current = ref<string[]>(['mail']);
    const info = () => {
      message.info('This is a normal message');
      getData().then(function (res) {
        let data = res.data
        console.log(data)
      })
    };
    return {
      info,
      current
    };
  },
});
</script>
<style lang="less" scoped>
.home {
  .head {
    display: flex;
    justify-content: space-between;
    background: #fff;
    border-bottom: 1px solid #eee;
  }
}
</style>
