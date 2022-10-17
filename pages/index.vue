<template>
  <div class="">
    
    <!-- <news :newsForShow="newsForShow" /> -->
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
    const query =  { filter: "all" };
    this.newsSearch !== '' ? query.search = this.newsSearch : null;
    const queryParams =  {path: "/1", params: { page: this.currentPage }, query};
    this.$router.push(queryParams);
  },
  async fetch({ store }) {
    if (store.getters["news/news"].length === 0) {
      await store.dispatch("news/fetchNews");
    }
  },
  computed: {
    ...mapState({
      newsList: (state) => state.news.newsList,
      currentPage: (state) => state.news.currentPage,
    }),
    ...mapGetters({
      currentPage: "news/currentPage",
      newsSearch: "news/newsSearch",
    }),

  },
};
</script>
<style scoped>

</style>