import RSSParser from "rss-parser";
export const state = () => ({
  newsList: [],
});

export const mutations = {
  setNewsList(state, news) {
    state.newsList = news;
  },
};

export const actions = {
  async fetchNews({ commit }) {
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
  newsListt: (state) => state.newsList,
};
