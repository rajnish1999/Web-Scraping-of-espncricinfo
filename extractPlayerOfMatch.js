const request = require('request');
const cheerio = require('cheerio');

request('https://www.espncricinfo.com/series/india-women-in-australia-2021-22-1263613/australia-women-vs-india-women-1st-odi-1263617/full-scorecard',
(error, res, body) => {
    extractHtml(body);
})

const extractHtml = (html) => {
    let selectorTool = cheerio.load(html);
    let name = selectorTool('.playerofthematch-name').text()
    console.log(name);
}