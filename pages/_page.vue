<template>
  <div class="">
    <input type="text" v-model="search" />
    <button @click="pushSearch">Поиск</button>
    {{ $route.params.page }}
    <news :newsForShow="newsForShow" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import News from "../components/News.vue";
export default {
  components: { News },
  name: "IndexPage",
  data() {
    return {
      users: {},
      search: "",
    };
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
      newsForShow: (state) => state.news.newsForShow,
    }),
    ...mapGetters({
      newsForShow: "news/newsForShow",
      currentPage: "news/currentPage",
    }),
  },
  methods: {
    pushSearch() {
      this.$router.push({
        path: "?filter=" + this.search + "/page=" + currentPage,
      });
    },
  },

};
</script>

<style scoped>
@import url("../static/nullstyle");
</style>
