<template>
  <form class="search-input" @submit.prevent="$emit('search', input)">
    <input
      type="text"
      class="search-input__input"
      name="search"
      v-model.trim="input"
    />
    <button class="search-input__btn">
      <SearchSvg />
    </button>
  </form>
</template>

<script>
import { mapGetters } from "vuex";
import SearchSvg from "./icons/searchSvg.vue";
export default {
  data() {
    return {
      input: this.$route.query.search ? this.$route.query.search : "",
    };
  },
  components: { SearchSvg },
  computed: {
    ...mapGetters({
      newsSearch: "news/newsSearch",
    }),
  },
  watch: {
    newsSearch() {
      if (this.newsSearch == "") {
        this.input = "";
      }
    },
  },
};
</script>

<style scoped>
.search-input {
  position: relative;
  display: flex;
  align-items: center;
}
.search-input__btn svg {
  fill: #dcdcdc;
  transition: all 0.4s ease;
}
.search-input__btn:hover svg {
  fill: #0029ff;
}
.search-input__input {
  position: relative;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05), 0px 1px 4px rgba(0, 0, 0, 0.05);
  border-radius: 3px;
  padding: 11px;
  font-size: 16px;
  width: 297px;
}
.search-input__input:focus {
  border: none;
  outline: none;
}
.search-input__btn {
  position: absolute;
  right: 13px;
  top: 10px;
}
@media (max-width: 840px) {
  .search-input__input {
    width: 100%;
  }
  .search-input {
    margin: 20px 0 0 0;
  }
}
</style>
