<template>
  <div class="">
    <header-news @search="search" @refresh="refresh" />
    <div class="row">
      <news-filter
        :newsFilter="newsFilter"
        @changeFilter="changeFilter"
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
import { mapState, mapGetters } from "vuex";
import News from "../components/News.vue";
import ChangeDisplay from "~/components/ChangeDisplay.vue";
import NewsFilter from "~/components/NewsFilter.vue";
import HeaderNews from "../components/HeaderNews.vue";
import EmptyState from "../components/EmptyState.vue";

export default {
  components: { News, ChangeDisplay, NewsFilter, HeaderNews, EmptyState },
  name: "IndexPage",
  middleware: "route",
  data() {
    return {
      loaded: false,
      clicked: false,
    };
  },
  // async asyncData({app, store}) {
  //   // if (store.getters["news/news"].length === 0) {
  //     let news = await app.$axios.$get('https://127.0.0.1:80/api/getPosts/getPosts');
  //     store.commit("news/setNewsList", news);
  //   // }
  // },

  async mounted() {
    if (this.news.length === 0) {
      let news = await this.$axios.$get("api/getPosts/getPosts");
      this.$store.commit("news/setNewsList", news);
    }

    this.$store.commit("news/setCurrentPage", this.$route.params.page);
    this.$store.commit("news/setNewsFilter", this.$route.query.filter);
    if (this.$route.query.search) {
      this.$store.commit("news/setNewsSearch", this.$route.query.search);
    }
    this.$store.commit(
      "news/setNewsDisplayType",
      localStorage.newsDisplayType ? localStorage.newsDisplayType : "grid"
    );
    this.loaded = true;
  },
  computed: {
    ...mapState({
      newsList: (state) => state.news.newsList,
      currentPage: (state) => state.news.currentPage,
      newsDisplayType: (state) => state.news.newsDisplayType,
      visiblePostsCount: (state) => state.news.visiblePostsCount,
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
      } else {
        let filterArray = this.newsFilter.split(" ");
        return this.news.filter(
          (post) =>
            post.link
              .replace("https://", "")
              .replace("http://", "")
              .split("/")[0]
              .toUpperCase()
              .includes(filterArray[0].toUpperCase()) ||
            post.link
              .replace("https://", "")
              .replace("http://", "")
              .split("/")[0]
              .toUpperCase()
              .includes(filterArray[1]?.toUpperCase())
        );
      }
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
        this.currentPage * this.visiblePostsCount -
          (this.visiblePostsCount - 1) -
          1,
        this.currentPage * this.visiblePostsCount
      );
      return newsForShow;
    },
    totalPages() {
      return Math.ceil(
        this.searchedAndFilteredNews.length / this.visiblePostsCount
      );
    },
  },

  methods: {
    changeFilter(newVal) {
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
      this.$store.commit("news/setNewsSearch", value);
      this.$router.push({
        path: "/1",
        params: { page: 1 },
        query: { filter: this.newsFilter, search: value },
      });
    },
    async refresh() {
      let news = await this.$axios.$get("api/getPosts/getPosts");
      this.$store.commit("news/setNewsList", news);
      this.$store.commit("news/setNewsSearch", "");
      this.$router.push({
        path: "/1",
        params: { page: 1 },
        query: { filter: "all" },
      });
    },
  },
  watch: {
    $route(to, from) {
      this.$store.commit("news/setCurrentPage", to.params.page);
    },
    "$route.query.filter"(to, from) {
      this.$store.commit("news/setNewsFilter", to);
    },
    newsDisplayType(newVal) {
      localStorage.newsDisplayType = newVal;

      if (newVal == "column") {
        this.$store.commit("news/visiblePostsCount", 3);
      } else {
        this.$store.commit("news/visiblePostsCount", 4);
      }
    },
    newsFilter() {
      const query = { filter: this.newsFilter };
      this.newsSearch !== "" ? (query.search = this.newsSearch) : null;
      const queryParams = {
        path: `${this.currentPage}`,
        params: { page: this.currentPage },
        query,
      };
      this.$router.push(queryParams);
    },
    visiblePostsCount(newVal, oldVal) {
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
@media (max-width: 840px) {
  .row {
    margin: 20px 0 15px 0;
  }
}
</style>
