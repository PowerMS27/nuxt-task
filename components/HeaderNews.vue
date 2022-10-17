<template>
  <div class="row">
    <div class="refresh">
      <h1>Список новостей</h1>
      <button>Обновить</button>
    </div>
    <div class="search">
      <Search @search="$emit('search', $event)" />
    </div>
  </div>
</template>

<script>
import Search from "./Search.vue";
export default {
  components: { Search },
};
</script>

<style scoped>
.refresh {
  display: flex;
}
.refresh h1 {
  font-weight: 700;
  font-size: 36px;
  line-height: 41px;
  color: #000000;
}
</style>
