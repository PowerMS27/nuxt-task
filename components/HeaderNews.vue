<template>
  <div class="row">
    <div class="refresh">
      <h1>Список новостей</h1>
      <button class="refresh-button" @click="$emit('refresh')">
        <refresh-svg class="refresh-button__svg" />
      </button>
    </div>
    <div class="search">
      <Search @search="$emit('search', $event)" />
    </div>
  </div>
</template>

<script>
import RefreshSvg from "./icons/refreshSvg.vue";
import Search from "./Search.vue";
export default {
  components: { Search, RefreshSvg },
};
</script>

<style scoped>
.refresh {
  display: flex;
  align-items: center;
}
.refresh h1 {
  font-weight: 700;
  font-size: 36px;
  line-height: 41px;
  color: #000000;
}
.refresh-button {
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05), 0px 1px 4px rgba(0, 0, 0, 0.05);
  margin: 0 0 5px 25px;
}
.refresh-button__svg {
  transition: all 0.5s ease;
}
.refresh-button:hover .refresh-button__svg {
  transform: rotate(180deg);
}

</style>
