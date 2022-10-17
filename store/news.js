import RSSParser from "rss-parser";
export const state = () => ({
  newsList: [],
  newsForShow: [],
  countOfPostsToShow: 4,
  currentPage: "",
  newsDisplayType: "grid",
  newsFilter: "all",
  newsSearch: "",
});

export const mutations = {
  setNewsList(state, news) {
    state.newsList = news;
  },
  setCurrentPage(state, page) {
    state.currentPage = page;
  },
  setNewsDisplayType(state, type) {
    state.newsDisplayType = type
  },
  countOfPostsToShow(state, count) {
    state.countOfPostsToShow = count
  },
  setNewsFilter(state, source) {
    state.newsFilter = source
  },
  setNewsSearch(state, search) {
    state.newsSearch = search
  }
};

export const actions = {
  async fetchNews({ commit, state }) {
    let parser = new RSSParser();
    const dataMos = await parser.parseURL("https://www.mos.ru/rss");
    const dataLenta = await parser.parseURL("https://lenta.ru/rss/news");
    let fullData = dataMos.items.concat(dataLenta.items);

    fullData = fullData.sort((a, b) => {
      if (new Date(`${a.pubDate}`) > new Date(`${b.pubDate}`)) {
        return -1;
      }
      if (new Date(`${a.pubDate}`) < new Date(`${b.pubDate}`)) {
        return 1;
      }
    });
    commit("setNewsList", fullData);
  },

};

export const getters = {
  news: (state) => state.newsList,
  currentPage: (state) => state.currentPage,
  newsDisplayType: (state) => state.newsDisplayType,
  // filteredNews: (state, $route) => {
  //   return state.newsList.filter((post) => {
  //     post.link.toUpperCase().includes($route.query.filter.toUpperCase())
  //   })
  // },
  // newsForShow: (state, getters) => {
  //   let newsForShow = getters.filteredNews.slice(
  //     state.currentPage * state.countOfPostsToShow -
  //       (state.countOfPostsToShow - 1),
  //     state.currentPage * state.countOfPostsToShow + 1
  //   );
  //   return newsForShow;
  // },
  newsFilter: (state) => state.newsFilter,
  newsSearch: (state) => state.newsSearch,
};
