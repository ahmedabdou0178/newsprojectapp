const _ = require("lodash");
const fetch = require("node-fetch");

module.exports = function NewsFromSources(sourcesArr, API_KEY) {
  concatedSources = _.chunk(sourcesArr, 20).map((a) => a.join(","));
  const requests = concatedSources.map((url) =>
    fetch(
      `https://newsapi.org/v2/everything?sources=${url}&apiKey=${API_KEY}`,
      { method: "GET" }
    ).then((response) => response.json())
  );

  // return Promise.all(requests)
  //   .then((responses) =>
  //     _.concat(...responses.map((r) => r.articles)).sort(
  //       (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)
  //     ) .map((article, index) => {
  //       return { ...article, id: index + 1 }
  //     })
  //   )
  //   .catch((error) => {
  //     throw new Error({ message: error });
  //   });
  /* Enhanced Code */
  return Promise.allSettled(requests)
  .then((responses) => {
    let articles = [];
    responses.forEach((response) => {
      if (response.status === 'fulfilled') {
        articles = articles.concat(response.value.articles);
      }
    });
    return articles;
  });

};
