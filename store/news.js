import RSSParser from "rss-parser";
export const state = () => ({
  newsList: [],
  newsForShow: [],
  countOfPostsToShow: 4,
  currentPage: 1,
});

export const mutations = {
  setNewsList(state, news) {
    state.newsList = news;
  },
  setCurrentPage(state, page) {
    state.currentPage = page;
  },
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
  newsForShow: (state) => {
    let newsForShow = state.newsList.slice(
      state.currentPage * state.countOfPostsToShow -
        (state.countOfPostsToShow - 1),
      state.currentPage * state.countOfPostsToShow + 1
    );
    return newsForShow;
  },
};
