<template>
  <main class="main">
    <div class="container">
      <Nuxt />
    </div>
  </main>
</template>
<script>
import { mapState, mapGetters, mapMutations, Store } from "vuex";
export default {
  layout: "layout",
  
  computed: {
    updateActiveRoute() {
      return this.$route.params.page;
    },
    
  },
  methods: {
    ...mapMutations({
      setCurrentPage: "news/setCurrentPage",
    }),
  },
  watch: {
    $route(to, from) {
      this.$store.commit("news/setCurrentPage", to.params.page)
    },
  },
};
</script>
<style>
@import url("../static/nullstyle.css");
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
