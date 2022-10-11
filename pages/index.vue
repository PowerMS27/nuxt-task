<template>
  <div class="">
    <div class="news">
      Всего: {{newsList.length}}
      <div class="newsItem" v-for="newsItem in newsList" :key="newsItem.link" >
        <news-item :newsItem="newsItem"></news-item>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import NewsItem from '~/components/NewsItem.vue';
export default {
  components: { NewsItem },
  name: "IndexPage",
  data() {
    return {
      users: {},
    };
  },
  async fetch({ store }) {
    if (store.getters["news/newsListt"].length === 0) {
      await store.dispatch("news/fetchNews");
    }
  },
  computed: {
    ...mapState({
      newsList: (state) => state.news.newsList,
    }),
    ...mapGetters({
      // getPost: "posts/getPost",
      news: "news/newsListt",
    }),
    //  news() {
    //     return this.$store.getters["news/newsList"];
    //   },
  },
};
</script>
<style scoped>
 @import url('../static/nullstyle');
</style>