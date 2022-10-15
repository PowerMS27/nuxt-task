<template>
  <div class="">
    
    <news :newsForShow="newsForShow" />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import News from "../components/News.vue";
export default {
  components: { News },
  name: "IndexPage",
  data() {
    return {
      users: {},
    };
  },
  created() {
    this.$router.push({ path: "/1", params: { page: this.currentPage }, query: {filter: "all"}});
  },
  // async asyncData({store}) {
  //   if (store.getters["news/news"].length === 0) { 
  //     await store.dispatch("news/fetchNews");
  //   }
  // },
  async fetch({ store }) {
    if (store.getters["news/news"].length === 0) {
      await store.dispatch("news/fetchNews");
    }
  },
  computed: {
    ...mapState({
      newsList: (state) => state.news.newsList,
      currentPage: (state) => state.news.currentPage,
      // newsForShow: (state) => state.news.newsForShow,
    }),
    ...mapGetters({
      newsForShow: "news/newsForShow"
    }),

  },
};
</script>
<style scoped>

</style>