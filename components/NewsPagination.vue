<template>
  <div class="pagination" v-if="this.totalPages > 1">
    <!-- <ul class="pagination-ul">
      <li>
        <nuxt-link
          :to="{ params: { page: '1' }, query: {filter: routerFilter} }"
          :key="1"
          class="pagination-page"
        >
          1
        </nuxt-link>
      </li>
      <span v-if="this.currentPage > 3">...</span>
      <li v-for="p in this.visiblePages.length" :key="p">
        <nuxt-link
          :to="{ params: { page: `${visiblePages[p - 1]}` }, query: {filter: routerFilter} }"
          :key="`${visiblePages[p - 1]}`"
          class="pagination-page"
        >
          {{ visiblePages[p - 1] }}
        </nuxt-link>
      </li>
      <span v-if="this.currentPage < totalPages - 2">...</span>
      <li>
        <nuxt-link
          :to="{ params: { page: `${totalPages}` }, query: {filter: routerFilter} }"
          :key="`${totalPages}`"
          class="pagination-page"
        >
          {{totalPages}}
        </nuxt-link>
      </li>
    </ul> -->
    <ul class="pagination-ul">
      <li v-for="p in this.visiblePages.length" :key="p">
        <span v-if="currentPage > 3 && p == 2 && totalPages > 5">...</span>
        <nuxt-link
          :to="{
            params: { page: `${visiblePages[p - 1]}` },
            query: link,
          }"
          :key="`${visiblePages[p - 1]}`"
          class="pagination-page"
        >
          {{ visiblePages[p - 1] }}
        </nuxt-link>
        <!-- <a
          @click.prevent="changePage(p)"
          :key="`${visiblePages[p - 1]}`"
          class="pagination-page"
          
        >
          {{ visiblePages[p - 1] }}
        </a> -->
        <span v-if="currentPage < totalPages - 2 && p == 4 && totalPages > 5"
          >...</span
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  props: {
    totalPages: {
      type: Number,
      require: true,
    },
    newsFilter: {
      type: String,
      require: true,
    },
    newsSearch: {
      type: String,
      require: true,
    },
  },
  data() {
    return {};
  },
  created() {
    // this.$store.commit("news/setCurrentPage", this.$route.params.page);
  },
  computed: {
    ...mapGetters({
      currentPage: "news/currentPage",
    }),
    routerFilter() {
      return this.$route.query.filter;
    },
    visiblePages() {
      let visiblePages = [];
      if (this.totalPages < 6) {
        return (visiblePages = [...Array(this.totalPages).keys()]
          .slice(0, this.totalPages)
          .map((x) => ++x));
      }
      if (this.currentPage < 4) {
        visiblePages.push(1, 2, 3, 4, this.totalPages);
      }
      if (this.currentPage > 3 && this.currentPage < this.totalPages - 1) {
        visiblePages.push(
          1,
          +this.currentPage - 1,
          +this.currentPage,
          +this.currentPage + 1,
          this.totalPages
        );
      }
      if (
        this.currentPage > this.totalPages - 2 &&
        this.currentPage < this.totalPages
      ) {
        visiblePages.push(
          1,
          +this.currentPage - 2,
          +this.currentPage - 1,
          +this.currentPage,
          this.totalPages
        );
      }
      if (this.currentPage == this.totalPages) {
        visiblePages.push(
          1,
          +this.currentPage - 3,
          +this.currentPage - 2,
          +this.currentPage - 1,
          this.totalPages
        );
      }

      return visiblePages;
    },
    link() {
      let query = { filter: this.newsFilter };
      this.newsSearch !== "" ? (query.search = this.newsSearch) : null;
      return query
    }
  },
  methods: {
    ...mapMutations({
      setCurrentPage: "news/setCurrentPage",
    }),
    changePage(page) {
      const query = { filter: this.newsFilter };
      this.newsSearch !== "" ? (query.search = this.newsSearch) : null;
      const queryParams = {
        path: `${this.visiblePages[page - 1]}`,
        params: { page: this.currentPage },
        query,
      };
      this.$router.push(queryParams);
    },
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
a.nuxt-link-active {
  color: #0029ff;
}
a.nuxt-link-exact-active {
  color: #0029ff;
}
</style>
