<template>
  <div class="">
    <div class="news-grid">
      <news-item
        v-for="newsItem in newsForShow"
        :key="newsItem.link"
        :newsItem="newsItem"
      >
      </news-item>
    </div>
    <news-pagination></news-pagination>
  </div>
</template>
<script>
// import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import NewsItem from "./NewsItem.vue";
import NewsPagination from "./NewsPagination.vue";
export default {
  components: {
    NewsItem,
    NewsPagination,
  },
  props: {
    newsForShow: {
      type: Array,
      require: true,
    },
  },
};
</script>
<style scoped>
.news-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
</style>
