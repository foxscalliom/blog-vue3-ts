<template>
  <div class="home">
    <!--    头部-->
    <div class="head">
      <div class="left">百里の博客</div>
      <div class="right">
        <a-menu v-model:selectedKeys="current" mode="horizontal" @select="selectMenu">
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
    <div class="content">
      <div class="card">
        {{articleList}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {message} from 'ant-design-vue';
import {defineComponent, onMounted, reactive, ref, toRefs} from 'vue';
import {getData} from '@/api'
import {Article} from '@/types'
export default defineComponent({
  name: 'Home',
  components: {
  },
  setup: function () {
    const current = ref<string[]>(['article']);
    const selectMenu = function (item: any) {
      // console.log('i100',item);
    };
    const state = reactive<{articleList:Article[]}>({
      articleList: []
    })
    const getArticle = () => {
      getData().then(res => {
        console.log('i100', res);
        if(res.status) {
          state.articleList =  res.data;
        }
      })
    }
    onMounted(() => {
      getArticle();
    })
    return {
      selectMenu,
      current,
      ...toRefs(state)
    };
  },
});
</script>
<style lang="less" scoped>
.home {
  //background: #f4f5f5;
  .head {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid #eee;
    .left {
      font-size: 16px;
      color:#448ef7;
    }
  }
  .content {
    margin-top: 50px;
    padding: 10px;
    .card {
      background: #fff;
    }
  }
}
</style>
