<template>
  <div class="">
    <div class="row">
      <news-filter :newsSource="newsSource" @changeSource="changeSource" />
      <change-display
        :newsDisplayType="newsDisplayType"
        @changeDisplay="changeDisplay"
      />
    </div>

    <news :newsForShow="newsForShow" :newsDisplayType="newsDisplayType" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import News from "../components/News.vue";
import ChangeDisplay from "~/components/ChangeDisplay.vue";
import NewsFilter from "~/components/NewsFilter.vue";
export default {
  components: { News, ChangeDisplay, NewsFilter },
  name: "IndexPage",
  data() {
    return {};
  },
  async fetch({ store }) {
    if (store.getters["news/news"].length === 0) {
      await store.dispatch("news/fetchNews");
    }
  },

  mounted() {
    if (this.newsDisplayType == "column") {
      this.$store.commit("news/countOfPostsToShow", 3);
    }

    this.$store.commit("news/setNewsDisplayType", localStorage.newsDisplayType);
  },
  computed: {
    ...mapState({
      newsList: (state) => state.news.newsList,
      currentPage: (state) => state.news.currentPage,
      newsForShow: (state) => state.news.newsForShow,
      newsDisplayType: (state) => state.news.newsDisplayType,
      countOfPostsToShow: (state) => state.news.countOfPostsToShow,
    }),
    ...mapGetters({
      newsForShow: "news/newsForShow",
      currentPage: "news/currentPage",
      newsSource: "news/newsSource",
    }),
  },

  methods: {
    changeSource(newVal) {
      this.$store.commit("news/setNewsSource", newVal);
      this.$router.push({ path: "/" + this.$route.params.page,  query: { filter: newVal } });
      // this.$router.push({ path: "/1", params: { page: this.currentPage }, query: {filter: "all"}});
      console.log(this.$route.query);
    },
    changeDisplay(newVal) {
      this.$store.commit("news/setNewsDisplayType", newVal);
    },
  },
  watch: {
    newsDisplayType(newVal) {
      localStorage.newsDisplayType = newVal;
      if (newVal == "column") {
        this.$store.commit("news/countOfPostsToShow", 3);
      } else {
        this.$store.commit("news/countOfPostsToShow", 4);
      }
    },
  },
};
</script>

<style scoped>
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0;
}
</style>
