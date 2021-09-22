const request = require('request');
const cheerio = require('cheerio');

const url = 'https://www.espncricinfo.com/series/india-women-in-australia-2021-22-1263613/australia-women-vs-india-women-1st-odi-1263617/full-scorecard';

request(url, (err, res, body) => {
    if(err){
        console.log(err);
    }else{
        extractHtml(body);
    }
})

const extractHtml = (html) => {
    const selectorTool = cheerio.load(html);
    const bowlerTableArr = selectorTool('.table.bowler');
    
    let maxWicketTaker = '', maxWicket = 0;
    for(let i=0;i<bowlerTableArr.length;i++){
        const bowlerTableHtml = selectorTool(bowlerTableArr[i]).html();
        const bowlersArr = selectorTool(bowlerTableHtml).find('tbody>tr');
        // console.log(bowlersArr.length);
        // console.log(bowlersArr);
        for(let j=0;j<bowlersArr.length;j++){
            const colOfEachPlayerArr = selectorTool(bowlersArr[j]).find('td');
            // console.log(colOfEachPlayerArr.length);
            if(colOfEachPlayerArr.length <= 1){
                continue;
            }
            const playerName = selectorTool(colOfEachPlayerArr[0]).text();
            const noOfWickets = selectorTool(colOfEachPlayerArr[4]).text();
            // console.log(playerName);
            // console.log(noOfWickets);
            if(noOfWickets > maxWicket){
                maxWicket = noOfWickets;
                maxWicketTaker = playerName;
            }
        }
    }

    console.log("Most wicket is taken by : "+ maxWicketTaker + "("+maxWicket+")");

}