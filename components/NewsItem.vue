<template>
  <div class="news-card">
    <a :href="newsItem.link" target="_blank" class="news-card__title">
      <h2>{{ newsItem.title }}</h2>
    </a>
    <div class="news-card__text-content">
      <p>{{ newsItem.content }}</p>
    </div>

    <a :href="newsItem.link" target="_blank" class="news-card__show-more">Подробнее</a>
    <div class="news-card__bottom-row">
      <a :href="urlToMainPage" target="_blank" class="news-card__url">
        {{ formatedSource }}
      </a>
      <div class="news-card__date">
        {{ formatedDate }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      urlToMainPage: "",
    };
  },
  props: {
    newsItem: {
      type: Object,
      require: true,
    },
  },
  computed: {
    formatedSource() {
      if (this.newsItem.link.toUpperCase().includes("MOS")) {
        this.urlToMainPage = "https://www.mos.ru/";
        return "www.mos.ru";
      } else if (this.newsItem.link.toUpperCase().includes("LENTA")) {
        this.urlToMainPage = "https://lenta.ru/";
        return "www.lenta.ru";
      }
    },
    formatedDate() {
      return new Date(this.newsItem.pubDate).toLocaleDateString()
    }
  },
};
</script>

<style scoped>
.news-card {
  background: #ffffff;
  padding: 30px;
  margin: 20px 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05), 0px 1px 4px rgba(0, 0, 0, 0.05);
  border-radius: 3px;
}
.news-card__title {
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: #0029ff;
}
.news-card__text-content {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
}
.news-card__show-more {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-decoration-line: underline;
  color: #0029ff;
}
.news-card__bottom-row {
  display: flex;
  justify-content: space-between;
}
.news-card__url {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-decoration-line: underline;
  color: #dcdcdc;
}
</style>