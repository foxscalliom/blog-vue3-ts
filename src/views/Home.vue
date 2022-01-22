<template>
  <div class="home">
    <!--    头部-->
    <div class="head">
      <div class="left">百里の博客</div>
      <div class="right">
        <a-menu v-model:selectedKeys="current" mode="horizontal" @select="selectMenu">
          <a-menu-item key="article"> 文章列表 </a-menu-item>
          <a-menu-item key="sort"> 归档分类 </a-menu-item>
          <a-menu-item key="my"> 个人中心 </a-menu-item>
        </a-menu>
      </div>
    </div>
    <div class="content">
      <div class="card" v-for="item in articleList" :key="item.id">
        <h3>{{ item.title }}</h3>
        <div class="tags">
          <div class="typeName">{{ item.typeName }}</div>
          <div class="time">{{ item.created }}</div>
        </div>
        <div class="detail">{{ item.introduce }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import { getData } from "../api";
import { Article } from "../types";
import dayjs from 'dayjs'
export default defineComponent({
  name: "Home",
  components: {},
  setup: function () {
    const current = ref<string[]>(["article"]);
    const selectMenu = function (item: any) {
      // console.log('i100',item);
    };
    const state = reactive<{ articleList: Article[] }>({
      articleList: [],
    });
    const getArticle = () => {
      getData().then((res) => {
        // console.log('i100', res);
        if (res.status) {
          res.data.map(item=> {
            item.created = dayjs().format('YYYY-MM-DD');
          })
          state.articleList = res.data;
        }
      });
    };
    onMounted(() => {
      getArticle();
    });
    return {
      selectMenu,
      current,
      ...toRefs(state),
    };
  },
});
</script>
<style lang="less" scoped>
.home {
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
      color: #448ef7;
    }
  }
  .content {
    margin-top: 40px;
    padding: 10px;
    .card {
      background: #fff;
      box-shadow: 0 1px 1px 1px #ddd;
      border-radius: initial;
      padding: 20px;
      margin: 10px;
      .tags {
        display: flex;
        justify-content: flex-start;
        padding-bottom: 10px;
        .time {
          font-size: 14px;
          color: #999;
        }
        .typeName {
          margin-right: 10px;
          border-radius: 5px;
          color: #1890ff;
          background-color: #e6f7ff;
          border: 1px solid #91d5ff;
          font-size: 12px;
          line-height: 24px;
          padding: 0 5px;
        }
      }
      .detail {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
