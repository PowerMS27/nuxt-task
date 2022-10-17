<template>
  <div class="">
    <label class="filter-button" :class="{ active: newsFilter === 'all' }">
      <input
        type="radio"
        class="radiobutton"
        name="source"
        value="all"
        @change="$emit('changeSource', $event.target.value)"
      />
      Все
    </label>
    <label class="filter-button" :class="{ active: newsFilter === 'lenta' }">
      <input
        type="radio"
        class="radiobutton"
        name="source"
        value="lenta"
        @change="$emit('changeSource', $event.target.value)"
      />
      Lenta.ru
    </label>
    <label class="filter-button" :class="{ active: newsFilter === 'mos' }">
      <input
        type="radio"
        class="radiobutton"
        name="source"
        value="mos"
        @change="$emit('changeSource', $event.target.value)"
      />
      Mos.ru
    </label>
  </div>
</template>

<script>
export default {
  props: {
    newsFilter: {
      type: String,
      require: true,
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
