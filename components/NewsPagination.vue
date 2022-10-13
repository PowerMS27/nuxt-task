<template>
  <div class="pagination">
    <ul class="pagination-ul">
      <li>
        <nuxt-link
          :to="{ params: { page: '1' } }"
          :key="1"
          class="pagination-page"
        >
          1
        </nuxt-link>
      </li>
      <span v-if="this.currentPage > 3">...</span>
      <li v-for="p in this.visiblePages.length" :key="p">
        <nuxt-link
          :to="{ params: { page: `${visiblePages[p - 1]}` } }"
          :key="`${visiblePages[p - 1]}`"
          class="pagination-page"
        >
          {{ visiblePages[p - 1] }}
        </nuxt-link>
      </li>
      <span v-if="this.currentPage < 20 - 2">...</span>
      <li>
        <nuxt-link
          :to="{ params: { page: '20' } }"
          :key="20"
          class="pagination-page"
        >
          20
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
    };
  },
  created() {
    this.$store.commit("news/setCurrentPage", this.$route.params.page)
  },
  computed: {
    ...mapGetters({
      currentPage: "news/currentPage",
    }),
    visiblePages() {
      let visiblePages = [];

      if (this.currentPage < 4) {
        visiblePages.push(2, 3, 4);
      }
      if (this.currentPage > 3 && this.currentPage < 20 - 1) {
        visiblePages.push(
          +this.currentPage - 1,
          +this.currentPage,
          +this.currentPage + 1
        );
      }
      if (this.currentPage > 20 - 2 && this.currentPage < 20) {
        visiblePages.push(
          +this.currentPage - 2,
          +this.currentPage - 1,
          +this.currentPage
        );
      }
      if (this.currentPage == 20) {
        visiblePages.push(
          +this.currentPage - 3,
          +this.currentPage - 2,
          +this.currentPage - 1
        );
      }

      return visiblePages;
    },
  },
  methods: {
    ...mapMutations({
      setCurrentPage: "news/setCurrentPage",
    }),
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin: 50px 0 0 0;
}
.pagination-ul {
  display: flex;
}
.pagination-page,
.pagination-ul span {
  padding: 0 8px;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  /* identical to box height */

  color: #000;
}
.pagination-page {
  padding: 8px;
}
/* a.nuxt-link-active {
  color: red
} */
a.nuxt-link-exact-active {
  color: #0029FF;
}
</style>
