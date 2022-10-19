<template>
  <div class="header-row">
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
.header-row {
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 20px 0 35px 0;
}
.header-row::after {
  position: absolute;
  content: "";
  width: 100%;
  height: 1px;
  background: #e5e5e5;
  bottom: 0;
}
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
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05), 0px 1px 4px rgba(0, 0, 0, 0.05);
  margin: 0 0 2px 30px;
}
.refresh-button__svg {
  transition: all 0.5s ease;
}
.refresh-button:hover .refresh-button__svg {
  transform: rotate(180deg);
}
@media (max-width: 840px) {
  .header-row {
    flex-direction: column;
    justify-content: flex-start;
  }
  .refresh h1 {
    font-size: 24px;
    line-height: 28px;
  }
  .refresh {
    justify-content: space-between;
  }
  .refresh-button {
    margin: 0 -3px 2px 0px;
  }
}
</style>
