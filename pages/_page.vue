<template>
  <div class="">
    <header-news @search="search" />
    <div class="row">
      <news-filter
        :newsFilter="newsFilter"
        @changeSource="changeSource"
        v-if="this.loaded"
      />
      <change-display
        v-if="this.loaded"
        :newsDisplayType="newsDisplayType"
        @changeDisplay="changeDisplay"
      />
    </div>
    <empty-state v-if="this.newsForShow.length == 0 && this.loaded == true" />
    <news
      v-if="this.loaded"
      :newsForShow="newsForShow"
      :newsDisplayType="newsDisplayType"
      :totalPages="totalPages"
      :newsFilter="newsFilter"
      :newsSearch="newsSearch"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import News from "../components/News.vue";
import ChangeDisplay from "~/components/ChangeDisplay.vue";
import NewsFilter from "~/components/NewsFilter.vue";
import HeaderNews from "../components/HeaderNews.vue";
import EmptyState from "../components/EmptyState.vue";
export default {
  components: { News, ChangeDisplay, NewsFilter, HeaderNews, EmptyState },
  name: "IndexPage",
  data() {
    return {
      loaded: false,
      clicked: false,
    };
  },
  async fetch({ store }) {
    if (store.getters["news/news"].length === 0) {
      await store.dispatch("news/fetchNews");
    }
  },

  mounted() {
    this.$store.commit("news/setCurrentPage", this.$route.params.page);
    this.$store.commit("news/setNewsFilter", this.$route.query.filter);
    if (this.$route.query.search) {
      this.$store.commit("news/setNewsSearch", this.$route.query.search);
    }
    this.$store.commit("news/setNewsDisplayType", localStorage.newsDisplayType);
    this.loaded = true;
  },
  computed: {
    ...mapState({
      newsList: (state) => state.news.newsList,
      currentPage: (state) => state.news.currentPage,
      newsDisplayType: (state) => state.news.newsDisplayType,
      countOfPostsToShow: (state) => state.news.countOfPostsToShow,
    }),
    ...mapGetters({
      currentPage: "news/currentPage",
      newsFilter: "news/newsFilter",
      news: "news/news",
      newsSearch: "news/newsSearch",
    }),
    filteredNews() {
      if (this.newsFilter == "all") {
        return this.news;
      } else
        return this.news.filter((post) =>
          post.link.toUpperCase().includes(this.newsFilter.toUpperCase())
        );
    },
    searchedAndFilteredNews() {
      return this.filteredNews.filter(
        (post) =>
          post.content?.toUpperCase().includes(this.newsSearch.toUpperCase()) ||
          post.title.toUpperCase().includes(this.newsSearch.toUpperCase())
      );
    },
    newsForShow() {
      let newsForShow = this.searchedAndFilteredNews.slice(
        this.currentPage * this.countOfPostsToShow -
          (this.countOfPostsToShow - 1) -
          1,
        this.currentPage * this.countOfPostsToShow
      );
      return newsForShow;
    },
    totalPages() {
      return Math.ceil(
        this.searchedAndFilteredNews.length / this.countOfPostsToShow
      );
    },
  },

  methods: {
    changeSource(newVal) {
      const query = { filter: newVal };
      this.newsSearch !== "" ? (query.search = this.newsSearch) : null;
      const queryParams = {
        path: "/1",
        params: { page: this.currentPage },
        query,
      };
      this.$router.push(queryParams);
    },
    changeDisplay(newVal) {
      this.clicked = true;
      this.$store.commit("news/setNewsDisplayType", newVal);
    },
    search(value) {
      console.log(value);
      this.$store.commit("news/setNewsSearch", value);
      this.$router.push({
        path: `${this.currentPage}`,
        params: { page: this.currentPage },
        query: { filter: this.newsFilter, search: value },
      });
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
    newsFilter() {
      this.$router.push({
        path: `${this.$route.params.page}`,
        params: { page: this.currentPage },
        query: { filter: this.newsFilter, search: this.newsSearch },
      });
    },
    countOfPostsToShow(newVal, oldVal) {
      if (this.clicked) {
        let newPage;
        if (oldVal) {
          newPage = Math.round((this.currentPage * oldVal) / newVal);
          if (newPage >= this.totalPages) {
            newPage = this.totalPages;
          }
        } else {
          newPage = oldVal;
        }

        const query = { filter: this.newsFilter };
        this.newsSearch !== "" ? (query.search = this.newsSearch) : null;
        console.log(this.newsSearch);
        const queryParams = {
          path: `${newPage}`,
          params: { page: this.currentPage },
          query,
        };
        this.$router.push(queryParams);
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
