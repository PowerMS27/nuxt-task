<template>
  <div class="">
    <div class="news-grid" :class="{ column: newsDisplayType == 'column' }">
      <news-item
        v-for="newsItem in newsForShow"
        :key="newsItem.link"
        :newsItem="newsItem"
        :newsDisplayType="newsDisplayType"
      >
      </news-item>
    </div>
    <news-pagination
      :totalPages="totalPages"
      :newsFilter="newsFilter"
      :newsSearch="newsSearch"
    ></news-pagination>
  </div>
</template>
<script>
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
    newsDisplayType: {
      type: String,
      require: true,
    },
    totalPages: {
      type: Number,
      require: true,
    },
    newsFilter: {
      type: String,
      require: true,
    },
    newsSearch: {
      type: String,
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
.news-grid.column {
  grid-template-columns: 1fr;
}
@media (max-width: 840px) {
  .news-grid {
    grid-template-columns: 1fr;
  }
}
</style>
