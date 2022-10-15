<template>
  
  <div class="news-card" :class="{ column: isColumn }">
    <div class="news-card__column">
      
      <div :class="{ rowWhenColumn: isColumn }">
        <a :href="newsItem.link" target="_blank" v-if="isColumn" class="image">
          <img :src="`${newsItem.enclosure?.url}`" alt="" />
        </a>
        <div>
          <a :href="newsItem.link" target="_blank" class="news-card__title">
            <h2>{{ newsItem.title }}</h2>
          </a>

          <div class="news-card__info">
            <div class="news-card__text-content">
              <p>{{ newsItem.content }}</p>
            </div>
          </div>
        </div>
      </div>
      <a
        v-if="newsDisplayType !== 'column'"
        :href="newsItem.link"
        target="_blank"
        class="news-card__show-more"
        >Подробнее</a
      >
      <div class="news-card__bottom-row">
        <a :href="urlToMainPage" target="_blank" class="news-card__url">
          {{ formatedSource }}
        </a>
        <div class="news-card__date">
          <!-- {{ formatedDate }} -->
          {{ newsItem.pubDate }}
        </div>
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
    newsDisplayType: {
      type: String,
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
      return new Date(this.newsItem.pubDate).toLocaleDateString();
    },
    isColumn() {
      return this.newsDisplayType == "column";
    },
  },
};
</script>

<style scoped>
.news-card {
  position: relative;
  background: #ffffff;
  padding: 25px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05), 0px 1px 4px rgba(0, 0, 0, 0.05);
  border-radius: 3px;
  height: 200px;
}
.news-card.column {
  padding: 18px 30px 5px 30px;
  height: 170px;
}
.news-card__date {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #dcdcdc;
}
.news-card.column::after {
  position: absolute;
  content: "";
  width: 100%;
  height: 30px;
  bottom: 0;
  left: 0;
  background: #fcfcfc;
  border-radius: 0px 0px 3px 3px;
  z-index: 0;
}
.news-card__column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.image {
  width: 100%;
  height: 110px;
  margin: 10px 0 0 0;
}
.image img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.rowWhenColumn {
  /* display: flex; */
  /* align-items: center; */
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 0 30px;
  align-items: flex-start;
}
.news-card__title {
  display: block;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* количество строк */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.news-card__title h2 {
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: #0029ff;
  margin: 10px 0 25px 0;
}
.news-card__text-content {
  display: block;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* количество строк */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 0 20px 0;
}
.news-card__text-content p {
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
  margin: 20px 0 0 0;
  display: flex;
  justify-content: space-between;
  z-index: 5;
}
.news-card.column .news-card__bottom-row {
  margin: 0;
}
.news-card__url {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-decoration-line: underline;
  color: #dcdcdc;
}
</style>
