<template>
  <div class="change-display">
    <label class="filter-button">
      <input
        type="radio"
        class="radiobutton"
        name="display"
        value="column"
        @change="$emit('changeDisplay', $event.target.value)"
      />
      <ColumnSvg
        class="change-display__button"
        :class="{ active: newsDisplayType == 'column' }"
      />
    </label>
    <label class="filter-button">
      <input
        type="radio"
        class="radiobutton"
        name="display"
        value="grid"
        @change="$emit('changeDisplay', $event.target.value)"
      />
      <GridSvg
        class="change-display__button"
        :class="{ active: newsDisplayType == 'grid' }"
      />
    </label>
  </div>
</template>

<script>
import ColumnSvg from "./icons/columnSvg.vue";
import GridSvg from "./icons/gridSvg.vue";
export default {
  components: { ColumnSvg, GridSvg },
  props: {
    newsDisplayType: {
      type: String,
      require: true,
    },
  },
};
</script>

<style scoped>
.change-display {
  display: flex;
}
.change-display__button {
  cursor: pointer;
  fill: #c4c4c4;
  transition: all 0.4s ease;
  margin: 0 0 0 10px;
}
.active {
  fill: #0029ff;
}
.radiobutton {
  display: none;
}
</style>
