import RSSParser from "rss-parser";

let parser = new RSSParser();


const getNews = async () => {
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
   
   return fullData
 };

 export default getNews;