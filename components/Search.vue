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
import SearchSvg from "./icons/searchSvg.vue";
export default {
  data() {
    return {
      input: this.$route.query.search ? this.$route.query.search : "",
    };
  },
  components: { SearchSvg },
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
  
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05), 0px 1px 4px rgba(0, 0, 0, 0.05);
  border-radius: 3px;
  padding: 10px;
  font-size: 16px;
  width: 300px !important;
}
.search-input__input:focus {
  border: none;
  outline: none;
}
.search-input__btn {
  position: absolute;
  right: 13px;
  top: 9px;
}
</style>
