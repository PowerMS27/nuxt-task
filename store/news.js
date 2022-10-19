// import RSSParser from "rss-parser";
export const state = () => ({
  newsList: [],
  newsForShow: [],
  visiblePostsCount: 4,
  currentPage: "",
  newsDisplayType: "grid",
  newsFilter: "",
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
    state.newsDisplayType = type;
  },
  visiblePostsCount(state, count) {
    state.visiblePostsCount = count;
  },
  setNewsFilter(state, source) {
    state.newsFilter = source;
  },
  setNewsSearch(state, search) {
    state.newsSearch = search;
  },
};

// export const actions = {
//   async fetchNews({ commit, state }) {
//     let parser = new RSSParser();
//     const dataMos = await parser.parseURL("https://www.mos.ru/rss");
//     const dataLenta = await parser.parseURL("https://lenta.ru/rss/news");
//     let fullData = dataMos.items.concat(dataLenta.items);

//     fullData = fullData.sort((a, b) => {
//       if (new Date(`${a.pubDate}`) > new Date(`${b.pubDate}`)) {
//         return -1;
//       }
//       if (new Date(`${a.pubDate}`) < new Date(`${b.pubDate}`)) {
//         return 1;
//       }
//     });
//     commit("setNewsList", fullData);
//   },

// };

export const getters = {
  news: (state) => state.newsList,
  currentPage: (state) => state.currentPage,
  newsDisplayType: (state) => state.newsDisplayType,
  newsFilter: (state) => state.newsFilter,
  newsSearch: (state) => state.newsSearch,
};
