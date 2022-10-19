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

      <div class="news-card__bottom-row">
        <a
          :href="newsItem.link"
          target="_blank"
          class="news-card__show-more"
          :class="{ none: newsDisplayType == 'column' }"
          >Подробнее</a
        >
        <a :href="urlToMainPage" target="_blank" class="news-card__url">
          {{ formatedSource }}
        </a>
        <div class="news-card__date">
          {{ formatedDate }}
          <!-- {{ newsItem.pubDate }} -->
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
  padding: 25px 25px 15px 25px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05), 0px 1px 4px rgba(0, 0, 0, 0.05);
  border-radius: 3px;
  height: 216px;
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
.news-card::after {
  position: absolute;
  content: "";
  width: 100%;
  height: 30px;
  bottom: 0;
  left: 0;
  background: #fcfcfc;
  border-radius: 0px 0px 3px 3px;
  z-index: 0;
  display: none;
}
.news-card.column::after {
  display: block;
}
.news-card__show-more.none {
  display: none;
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
  margin: 10px 0 15px 0;
}
.news-card__text-content {
  display: block;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* количество строк */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 10px 0 20px 0;
}
.news-card.column .news-card__text-content {
  -webkit-line-clamp: 2;
}
.news-card__text-content p {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
}
.news-card__show-more {
  position: absolute;
  top: -35px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-decoration-line: underline;
  color: #0029ff;
}
.news-card__bottom-row {
  position: relative;
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
@media (max-width: 840px) {
  .news-card__text-content {
    -webkit-line-clamp: 2;
  }
  .news-card {
    padding: 15px 15px 5px 15px;
  }
  .rowWhenColumn {
    grid-template-columns: 1fr;
  }
  .news-card.column {
    height: 400px;
    padding: 10px 18px 5px 18px;
  }
  .news-card::after {
    display: block;
  }
  .news-card__show-more.none {
    display: block;
    margin: 0px 0 10px 0;
  }
  .image {
    height: 160px;
  }
  .news-card.column .news-card__text-content {
    -webkit-line-clamp: 3;
  }
  .news-card.column .news-card__title {
    -webkit-line-clamp: 3;
  }
  .news-card__title h2 {
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: #0029ff;
    margin: 15px 0 5px 0;
  }
}
</style>
