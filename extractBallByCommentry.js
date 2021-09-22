const request = require('request');
const cheerio = require('cheerio');

const url = "https://www.espncricinfo.com/series/india-women-in-australia-2021-22-1263613/australia-women-vs-india-women-1st-odi-1263617/ball-by-ball-commentary";

request(url, (err, res, body) => {
    if(err){
        console.log(err);
    }else{
        extractHtml(body);
    }
})

const extractHtml = (html) => {
    let selectorTool = cheerio.load(html);
    let commentry = selectorTool('.match-comment-wrapper .match-comment-long-text');
    // console.log(typeof commentry);
    // console.log(selectorTool(commentry));
    for(let i=0;i<commentry.length;i++){
        console.log(selectorTool(commentry[i]).text());
    }
}