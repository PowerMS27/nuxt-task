<template>
  <div class="">
    <label class="filter-button" :class="{ active: newsFilter === 'all' }">
      <input
        type="radio"
        class="radiobutton"
        name="source"
        value="all"
        @click="getFilter($event.target.value)"
      />
      Все
    </label>
    <label
      class="filter-button"
      :class="{ active: newsFilter.includes('lenta') }"
    >
      <input
        type="radio"
        class="radiobutton"
        name="source"
        value="lenta"
        @click="getFilter($event.target.value)"
      />
      Lenta.ru
    </label>
    <label
      class="filter-button"
      :class="{ active: newsFilter.includes('mos') }"
    >
      <input
        type="radio"
        class="radiobutton"
        name="source"
        value="mos"
        @click="getFilter($event.target.value)"
      />
      Mos.ru
    </label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filters: this.newsFilter.split(" "),
    };
  },
  props: {
    newsFilter: {
      type: String,
      require: true,
    },
  },

  methods: {
    getFilter(value) {
      if (this.filters.length <= 1 && value !== "all") {
        this.filters.push(value);
      } else if (this.filters.length == 2 && this.filters.includes(value)) {
        this.filters = this.filters.filter((item) => item !== value);
      }
      if (value !== "all" && this.filters.includes("all")) {
        this.filters = [value];
      }
      if (value == "all" || this.filters.length == 0) {
        this.filters = ["all"];
      }
      if (this.filters.join("") == `${value}${value}`) {
        this.filters = ["all"];
      }
      this.$emit("changeFilter", this.filters.join(" "));
    },
  },
  watch: {
    newsFilter() {
      this.filters = this.newsFilter.split(" ");
    },
  },
};
</script>

<style scoped>
.radiobutton {
  display: none;
}
.filter-button {
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  transition: all 0.4s ease;
  color: #000000;
  margin: 0 10px 0 0;
  padding: 5px 0;
}
.filter-button.active {
  color: #0029ff;
}
</style>
