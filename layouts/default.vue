<template>
  <main class="main">
    <div class="container">
      <div>
        <h1>Список новостей</h1>
        <button>*обновить*</button>
      </div>
      <input type="text" />
      <button>Поиск</button>
      {{ $route.params.page }}
      <Nuxt />
    </div>
  </main>
</template>
<script>
import { mapState, mapGetters, mapMutations, Store } from "vuex";
export default {
  // async fetch({ store }) {
  //   if (store.getters["news/news"].length === 0) {
  //     await store.dispatch("news/fetchNews");
  //   };
  // },

  computed: {
    // updateActiveRoute() {
    //   return this.$route.params.page;
    // },
  },
  methods: {
    ...mapMutations({
      setCurrentPage: "news/setCurrentPage",
    }),
    // async refresh() {
    //   await this.$store.dispatch("news/fetchNews")
      
    // },
  },
  watch: {
    $route(to, from) {
      this.$store.commit("news/setCurrentPage", to.params.page);
    },
  },
};
</script>
<style>
.main {
  padding: 35px 0;
  height: calc(100vh - 70px);
  background: #fbfbfb;
}
.container {
  margin: 0 auto;
  max-width: 1060px;
}
</style>
